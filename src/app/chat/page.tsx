"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Send, Bot, Sparkles, SendHorizontal, Loader2, Mic2, Radio, TrendingUp } from "lucide-react"
import { chatWithAIAgentPersona } from "@/ai/flows/chat-ai-persona"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, serverTimestamp, limit, addDoc } from "firebase/firestore"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'

const personas = [
  { name: "Lux", role: "Right-Hand AI", desc: "Your main thinking partner and systems orchestrator.", icon: Sparkles, color: "text-cyan-500", border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
  { name: "QPL", role: "Mellow Political", desc: "Narrative lyricist and storyteller.", icon: Radio, color: "text-blue-500", border: "border-blue-500/30", bg: "bg-blue-500/10" },
  { name: "Newsician", role: "Political Musician", desc: "Gritty, hard-hitting Country Trap lyricist.", icon: Mic2, color: "text-red-500", border: "border-red-500/30", bg: "bg-red-500/10" },
  { name: "Mic", role: "Studio Manager", desc: "Release pipeline and visual director.", icon: Bot, color: "text-purple-500", border: "border-purple-500/30", bg: "bg-purple-500/10" },
  { name: "Schwab", role: "Portfolio Advisor", desc: "Direct, data-driven financial analyst.", icon: TrendingUp, color: "text-blue-600", border: "border-blue-600/30", bg: "bg-blue-600/10" },
  { name: "Alto", role: "IRA Advisor", desc: "Alternative Assets IRA parser.", icon: TrendingUp, color: "text-yellow-500", border: "border-yellow-500/30", bg: "bg-yellow-500/10" },
] as const

export type PersonaName = typeof personas[number]["name"];

function ChatContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, isUserLoading } = useUser()
  const db = useFirestore()
  
  const [hasMounted, setHasMounted] = React.useState(false)
  const [selectedPersona, setSelectedPersona] = React.useState<PersonaName>("Lux")
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  // Wait for client mount to avoid hydration mismatch on search params
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  // Sync selected persona from URL
  React.useEffect(() => {
    if (hasMounted) {
      const personaParam = searchParams.get("persona") as PersonaName | null
      if (personaParam && personas.some(p => p.name === personaParam)) {
        setSelectedPersona(personaParam)
      }
    }
  }, [searchParams, hasMounted])

  const handlePersonaSelect = (name: PersonaName) => {
    setSelectedPersona(name)
    // Update URL without full page reload
    router.push(`/chat?persona=\${name}`, { scroll: false })
  }

  const messagesQuery = useMemoFirebase(() => {
    if (!db || !user || !hasMounted) return null;
    return query(
      collection(db, 'users', user.uid, 'ai_conversations', selectedPersona, 'messages'),
      orderBy('timestamp', 'asc'),
      limit(100)
    );
  }, [db, user, selectedPersona, hasMounted]);

  const { data: messages, isLoading: isMessagesLoading } = useCollection(messagesQuery);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading || !user || !db) return

    const currentInput = input;
    setInput("")
    setIsLoading(true)

    const messagesRef = collection(db, 'users', user.uid, 'ai_conversations', selectedPersona, 'messages');

    try {
      // 1. Save user message immediately
      await addDoc(messagesRef, {
        content: currentInput,
        senderType: 'user',
        timestamp: serverTimestamp(),
      });

      // 2. Call Genkit Flow
      const result = await chatWithAIAgentPersona({
        message: currentInput,
        personaName: selectedPersona,
      })

      // 3. Save AI response
      await addDoc(messagesRef, {
        content: result.response,
        senderType: 'ai',
        timestamp: serverTimestamp(),
      });

    } catch (error) {
      console.error("Chat failed:", error);
      // Optional: Add error toast here
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages, isLoading]);

  const activePersonaDetails = personas.find(p => p.name === selectedPersona) || personas[0];

  if (!hasMounted || isUserLoading) {
    return (
      <div className="flex h-[calc(100vh-140px)] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 max-w-[1600px] mx-auto p-6">
      <aside className="w-80 hidden lg:flex flex-col gap-4">
        <div className="px-2">
          <h2 className="font-headline text-2xl font-black mb-1 uppercase tracking-tight">DLX Roster</h2>
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Select persona to initiate link</p>
        </div>
        
        <ScrollArea className="flex-1 -mx-2 px-2">
          <div className="space-y-3 pb-6">
            {personas.map((p) => (
              <Card
                key={p.name}
                onClick={() => handlePersonaSelect(p.name)}
                className={\`p-4 cursor-pointer transition-all duration-300 \${
                  selectedPersona === p.name 
                    ? \`\${p.bg} \${p.border} ring-1 ring-current shadow-lg\` 
                    : "bg-[#0a0a0c] border-white/5 hover:bg-white/5"
                }\`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={\`w-10 h-10 rounded-xl flex items-center justify-center border \${selectedPersona === p.name ? p.border : 'border-white/5 bg-background'}\`}>
                    <p.icon className={\`w-5 h-5 \${selectedPersona === p.name ? p.color : 'text-muted-foreground'}\`} />
                  </div>
                  <div>
                    <h3 className={\`font-headline text-lg font-black uppercase tracking-tight leading-none \${selectedPersona === p.name ? p.color : ''}\`}>
                      {p.name}
                    </h3>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black mt-1">{p.role}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <main className="flex-1 flex flex-col bg-[#0a0a0c] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl relative">
        <header className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between backdrop-blur-xl absolute top-0 w-full z-10">
          <div className="flex items-center gap-4">
            <div className={\`w-12 h-12 rounded-2xl border \${activePersonaDetails.border} flex items-center justify-center \${activePersonaDetails.bg}\`}>
              <activePersonaDetails.icon className={\`w-6 h-6 \${activePersonaDetails.color}\`} />
            </div>
            <div>
              <h3 className="font-headline text-2xl font-black leading-none uppercase tracking-tight">{activePersonaDetails.name}</h3>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Live Connection</p>
            </div>
          </div>
          <Badge variant="outline" className={\`\${activePersonaDetails.border} \${activePersonaDetails.color} font-black uppercase tracking-[0.2em] text-[9px] px-4 py-1.5\`}>
            Secure Link
          </Badge>
        </header>

        <ScrollArea className="flex-1 px-6 pt-28 pb-6" ref={scrollAreaRef}>
          <div className="space-y-8 max-w-4xl mx-auto">
            {!user && (
              <div className="text-center p-12 space-y-6 bg-white/5 rounded-3xl border border-white/10 mt-20">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-black uppercase tracking-tight mb-2">Authentication Required</h3>
                  <p className="text-sm text-muted-foreground font-medium max-w-sm mx-auto">You must establish a neural link to communicate with the DLX Roster.</p>
                </div>
                <Button asChild className="h-12 px-8 font-black uppercase tracking-widest text-xs rounded-xl bg-primary hover:bg-primary/90">
                  <Link href="/login">Establish Link</Link>
                </Button>
              </div>
            )}
            
            {user && messages?.length === 0 && !isMessagesLoading && (
              <div className="text-center p-12 mt-20 opacity-50">
                <activePersonaDetails.icon className={\`w-12 h-12 mx-auto mb-6 \${activePersonaDetails.color}\`} />
                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Channel Open. Awaiting Input.</p>
              </div>
            )}

            {user && messages?.map((m: any) => (
              <div key={m.id} className={\`flex gap-4 \${m.senderType === "user" ? "flex-row-reverse" : ""}\`}>
                <Avatar className={\`w-10 h-10 border \${m.senderType === "user" ? "border-white/10" : activePersonaDetails.border} shrink-0 mt-1\`}>
                  {m.senderType === "user" ? (
                    <AvatarImage src={user.photoURL || undefined} />
                  ) : (
                    <div className={\`w-full h-full flex items-center justify-center \${activePersonaDetails.bg}\`}>
                       <activePersonaDetails.icon className={\`w-5 h-5 \${activePersonaDetails.color}\`} />
                    </div>
                  )}
                  <AvatarFallback className={m.senderType === "user" ? "bg-white/5 text-white" : activePersonaDetails.bg}>
                    {m.senderType === "user" ? (user.displayName?.[0] || 'U') : selectedPersona?.[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className={\`flex flex-col max-w-[85%] \${m.senderType === "user" ? "items-end" : "items-start"}\`}>
                  <div className="mb-1 px-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                      {m.senderType === "user" ? "You" : selectedPersona}
                    </span>
                  </div>
                  <div className={\`p-5 rounded-3xl text-sm leading-relaxed \${
                    m.senderType === "user" 
                      ? "bg-white/10 text-white rounded-tr-none border border-white/10" 
                      : "bg-[#111115] border border-white/5 rounded-tl-none shadow-xl prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 max-w-none"
                  }\`}>
                    {m.senderType === "user" ? (
                      m.content
                    ) : (
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4">
                <Avatar className={\`w-10 h-10 border \${activePersonaDetails.border} shrink-0 mt-1\`}>
                  <div className={\`w-full h-full flex items-center justify-center \${activePersonaDetails.bg}\`}>
                     <activePersonaDetails.icon className={\`w-5 h-5 \${activePersonaDetails.color}\`} />
                  </div>
                </Avatar>
                <div className="flex flex-col items-start">
                  <div className="mb-1 px-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{selectedPersona} is typing</span>
                  </div>
                  <div className="p-5 rounded-3xl bg-[#111115] border border-white/5 rounded-tl-none flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <footer className="p-6 border-t border-white/5 bg-white/[0.02] backdrop-blur-xl absolute bottom-0 w-full z-10">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? \`Awaiting response from \${selectedPersona}...\` : \`Message \${selectedPersona}...\`}
              disabled={!user || isLoading}
              className="h-16 rounded-2xl bg-[#111115] border-white/10 pl-6 pr-20 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20 transition-all font-medium text-base shadow-inner"
            />
            <Button 
              type="submit" 
              size="icon" 
              className={\`absolute right-2 top-2 h-12 w-12 rounded-xl transition-all duration-300 \${
                input.trim() && !isLoading && user
                  ? \`\${activePersonaDetails.bg} hover:brightness-125 \${activePersonaDetails.color}\`
                  : "bg-white/5 text-white/20"
              }\`}
              disabled={!input.trim() || isLoading || !user}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <SendHorizontal className="w-5 h-5" />}
            </Button>
          </form>
        </footer>
      </main>
    </div>
  )
}

export default function ChatPage() {
  return (
    <React.Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <ChatContent />
    </React.Suspense>
  )
}
