
"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Send, User, Bot, Sparkles, ChevronLeft, Info } from "lucide-react"
import { chatWithAIAgentPersona, type ChatAIPersonaInput } from "@/ai/flows/chat-ai-persona"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  persona?: string
}

const personas = [
  { name: "Lux", role: "Hospitality & Guidance", desc: "Elegant and helpful assistant for platform queries.", icon: Sparkles, color: "text-primary" },
  { name: "Architect", role: "Design & Systems", desc: "Logical advisor for system design and architecture.", icon: Bot, color: "text-accent" },
  { name: "Dev", role: "Software Development", desc: "Direct and technical coding assistant.", icon: Bot, color: "text-green-500" },
] as const

export default function ChatPage() {
  const searchParams = useSearchParams()
  const initialPersona = searchParams.get("persona") as typeof personas[number]["name"] | null
  
  const [selectedPersona, setSelectedPersona] = React.useState<typeof personas[number]["name"]>(
    initialPersona && personas.some(p => p.name === initialPersona) ? initialPersona : "Lux"
  )
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>([
    { 
      id: "1", 
      role: "assistant", 
      content: initialPersona === "Architect" 
        ? "Systems check complete. I am Architect. How can I help you structure your ideas today?" 
        : initialPersona === "Dev"
        ? "Dev here. Ready to debug or build. What's the mission?"
        : "Greetings. I am Lux. How can I assist you in the LuxAI environment today?", 
      persona: initialPersona && personas.some(p => p.name === initialPersona) ? initialPersona : "Lux" 
    }
  ])
  const [isLoading, setIsLoading] = React.useState(false)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  // Update initial message if selected persona changes via click
  React.useEffect(() => {
    if (messages.length === 1 && messages[0].role === "assistant") {
      const content = selectedPersona === "Architect" 
        ? "Systems check complete. I am Architect. How can I help you structure your ideas today?" 
        : selectedPersona === "Dev"
        ? "Dev here. Ready to debug or build. What's the mission?"
        : "Greetings. I am Lux. How can I assist you in the LuxAI environment today?"
      
      setMessages([{ id: "1", role: "assistant", content, persona: selectedPersona }])
    }
  }, [selectedPersona])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const result = await chatWithAIAgentPersona({
        message: input,
        personaName: selectedPersona,
      })

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.response,
        persona: selectedPersona,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 max-w-7xl mx-auto">
      {/* Sidebar - Persona Selection */}
      <aside className="w-80 hidden lg:flex flex-col gap-4">
        <h2 className="font-headline text-2xl font-black mb-2 px-2">Personas</h2>
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
                <h3 className="font-bold text-sm">{p.name}</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{p.role}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">{p.desc}</p>
          </Card>
        ))}
        
        <div className="mt-auto glass-panel p-4 rounded-xl border-accent/20">
          <div className="flex items-center gap-2 mb-2 text-accent">
            <Info className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Model Info</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">All agents are currently linked to Gemini Pro.</p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col glass-panel rounded-3xl border-white/5 overflow-hidden">
        <header className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-none">{selectedPersona} Agent</h3>
              <p className="text-xs text-muted-foreground font-medium mt-1">Active Now</p>
            </div>
          </div>
          <Badge variant="outline" className="border-accent/30 text-accent font-bold">GEMINI ENGINE</Badge>
        </header>

        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className={`w-10 h-10 border ${m.role === "user" ? "border-accent/20" : "border-primary/20"}`}>
                  <AvatarImage src={m.role === "user" ? "https://picsum.photos/seed/user/100/100" : `https://picsum.photos/seed/${m.persona}/100/100`} />
                  <AvatarFallback className={m.role === "user" ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}>
                    {m.role === "user" ? "JD" : m.persona?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex flex-col max-w-[80%] ${m.role === "user" ? "items-end" : ""}`}>
                  <div className={`p-4 rounded-2xl font-medium text-sm leading-relaxed shadow-sm ${
                    m.role === "user" 
                      ? "bg-accent text-white rounded-tr-none" 
                      : "bg-white/5 border border-white/5 rounded-tl-none"
                  }`}>
                    {m.content}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-2 uppercase font-bold tracking-widest">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border border-primary/20 animate-pulse">
                  <AvatarFallback className="bg-primary/10 text-primary">...</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-none">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <footer className="p-6 border-t border-white/5 bg-white/5">
          <form onSubmit={handleSend} className="flex gap-4 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${selectedPersona}...`}
              className="h-14 rounded-2xl bg-background border-white/10 pr-16 focus-visible:ring-primary/50 transition-all font-medium"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 neon-glow"
              disabled={!input.trim() || isLoading}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </footer>
      </main>
    </div>
  )
}
