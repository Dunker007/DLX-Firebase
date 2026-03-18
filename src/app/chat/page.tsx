
"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Send, Bot, Sparkles, SendHorizontal, Loader2 } from "lucide-react"
import { chatWithAIAgentPersona } from "@/ai/flows/chat-ai-persona"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useFirestore, useUser, useCollection, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, serverTimestamp, limit } from "firebase/firestore"
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import Link from "next/link"

const personas = [
  { name: "Lux", role: "Hospitality & Guidance", desc: "Elegant and helpful assistant for platform queries.", icon: Sparkles, color: "text-primary" },
  { name: "Architect", role: "Design & Systems", desc: "Logical advisor for system design and architecture.", icon: Bot, color: "text-accent" },
  { name: "Dev", role: "Software Development", desc: "Direct and technical coding assistant.", icon: Bot, color: "text-green-500" },
] as const

function ChatContent() {
  const searchParams = useSearchParams()
  const { user } = useUser()
  const db = useFirestore()
  
  const [hasMounted, setHasMounted] = React.useState(false)
  const [selectedPersona, setSelectedPersona] = React.useState<typeof personas[number]["name"]>("Lux")
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setHasMounted(true)
    const personaParam = searchParams.get("persona") as typeof personas[number]["name"] | null
    if (personaParam && personas.some(p => p.name === personaParam)) {
      setSelectedPersona(personaParam)
    }
  }, [searchParams])

  const messagesQuery = useMemoFirebase(() => {
    if (!db || !user || !hasMounted) return null;
    return query(
      collection(db, 'users', user.uid, 'ai_conversations', selectedPersona, 'messages'),
      orderBy('timestamp', 'asc'),
      limit(50)
    );
  }, [db, user, selectedPersona, hasMounted]);

  const { data: messages } = useCollection(messagesQuery);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading || !user || !db) return

    const userMessage = {
      content: input,
      senderType: 'user',
      timestamp: serverTimestamp(),
      conversationId: selectedPersona
    }

    const messagesRef = collection(db, 'users', user.uid, 'ai_conversations', selectedPersona, 'messages');
    addDocumentNonBlocking(messagesRef, userMessage);
    
    const currentInput = input;
    setInput("")
    setIsLoading(true)

    try {
      const result = await chatWithAIAgentPersona({
        message: currentInput,
        personaName: selectedPersona,
      })

      const assistantMessage = {
        content: result.response,
        senderType: 'ai',
        timestamp: serverTimestamp(),
        conversationId: selectedPersona
      }

      addDocumentNonBlocking(messagesRef, assistantMessage);
    } catch (error) {
      console.error("Chat failed:", error);
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  if (!hasMounted) {
    return (
      <div className="flex h-[calc(100vh-140px)] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary/20" />
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 max-w-7xl mx-auto">
      <aside className="w-80 hidden lg:flex flex-col gap-4">
        <h2 className="font-headline text-2xl font-black mb-2 px-2 uppercase tracking-tight">Personas</h2>
        {personas.map((p) => (
          <Card
            key={p.name}
            onClick={() => setSelectedPersona(p.name)}
            className={`p-4 cursor-pointer border-white/5 transition-all duration-300 hover:bg-white/5 ${
              selectedPersona === p.name ? "bg-primary/10 border-primary/40 ring-1 ring-primary/40 shadow-lg" : "bg-card/40"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-white/5`}>
                <p.icon className={`w-5 h-5 ${p.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-tight">{p.name}</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{p.role}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">{p.desc}</p>
          </Card>
        ))}
      </aside>

      <main className="flex-1 flex flex-col glass-panel rounded-3xl border-white/5 overflow-hidden">
        <header className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-none uppercase tracking-tight">{selectedPersona} Agent</h3>
              <p className="text-xs text-muted-foreground font-medium mt-1">Grounded Signal Active</p>
            </div>
          </div>
          <Badge variant="outline" className="border-accent/30 text-accent font-black uppercase tracking-widest text-[9px]">NEXUS_SYNC</Badge>
        </header>

        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="space-y-6">
            {!user && (
              <div className="text-center p-12 space-y-4">
                <p className="text-sm text-muted-foreground font-black uppercase tracking-widest">You must establish a neural link to begin.</p>
                <Button asChild variant="outline" className="h-9 font-black uppercase tracking-widest text-[10px] rounded-full">
                  <Link href="/login">Establish Link</Link>
                </Button>
              </div>
            )}
            {user && messages?.map((m) => (
              <div key={m.id} className={`flex gap-4 ${m.senderType === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className={`w-10 h-10 border ${m.senderType === "user" ? "border-accent/20" : "border-primary/20"}`}>
                  <AvatarImage src={m.senderType === "user" ? user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100` : `https://picsum.photos/seed/${selectedPersona}/100/100`} />
                  <AvatarFallback className={m.senderType === "user" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}>
                    {m.senderType === "user" ? (user.displayName?.[0] || 'U') : selectedPersona?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col max-w-[80%] ${m.senderType === "user" ? "items-end" : ""}`}>
                  <div className={`p-4 rounded-2xl font-medium text-sm leading-relaxed shadow-sm ${
                    m.senderType === "user" 
                      ? "bg-accent text-white rounded-tr-none" 
                      : "bg-white/5 border border-white/5 rounded-tl-none"
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <footer className="p-6 border-t border-white/5 bg-white/5">
          <form onSubmit={handleSend} className="flex gap-4 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Communicate with ${selectedPersona}...`}
              disabled={!user || isLoading}
              className="h-14 rounded-2xl bg-background border-white/10 pr-16 focus-visible:ring-primary/50 transition-all font-medium"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 neon-glow"
              disabled={!input.trim() || isLoading || !user}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <SendHorizontal className="w-5 h-5" />}
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
