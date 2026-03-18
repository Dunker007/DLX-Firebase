"use client"

import * as React from "react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Bot, 
  Sparkles, 
  Settings2, 
  Mic2, 
  Radio, 
  LayoutGrid, 
  TrendingUp, 
  BarChart3, 
  Zap,
  Search,
  MessageSquare,
  Activity,
  ArrowRight,
  Plus
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

const dlxRoster = [
  {
    name: "Newsician",
    role: "POLITICAL MUSICIAN",
    desc: "Edgy, intense, and politically charged. Specializes in Country Trap and protest anthems.",
    status: "ONLINE",
    statusColor: "bg-red-500",
    icon: Mic2,
    iconBg: "bg-red-950/40 text-red-500",
    accent: "border-red-500/30",
    glow: "shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]",
    bottomBar: "bg-red-500/10 text-red-500",
    capabilities: ["Suno V5 Formatting", "Political Analysis", "Coded Lyricism"],
    link: "/chat?persona=Newsician"
  },
  {
    name: "QPL",
    role: "MELLOW POLITICAL",
    desc: "Quiet Part Loud. Introspective, acoustic-focused political commentary and narrative storytelling.",
    status: "ONLINE",
    statusColor: "bg-blue-500",
    icon: Radio,
    iconBg: "bg-blue-950/40 text-blue-500",
    accent: "border-blue-500/30",
    glow: "shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]",
    bottomBar: "bg-blue-500/10 text-blue-500",
    capabilities: ["Cinematic Storytelling", "Dual-Voice Composition", "Vibe Curation"],
    link: "/chat?persona=QPL"
  },
  {
    name: "Mic",
    role: "STUDIO MANAGER",
    desc: "Protects sustainable momentum. Manages distribution, CapCut/Google Vids workflows, and release cadence.",
    status: "ONLINE",
    statusColor: "bg-purple-500",
    icon: LayoutGrid,
    iconBg: "bg-purple-950/40 text-purple-500",
    accent: "border-purple-500/30",
    glow: "shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)]",
    bottomBar: "bg-purple-500/10 text-purple-500",
    capabilities: ["Video Coaching", "File Organization", "Release Strategy"],
    link: "/chat?persona=Mic"
  },
  {
    name: "Alto",
    role: "IRA ADVISOR",
    desc: "Dedicated financial parsing agent for Alto Crypto and Alternative Assets IRA accounts.",
    status: "ISOLATED",
    statusColor: "bg-yellow-500",
    icon: TrendingUp,
    iconBg: "bg-yellow-950/40 text-yellow-500",
    accent: "border-yellow-500/30",
    glow: "shadow-[0_0_15px_-5px_rgba(234,179,8,0.3)]",
    bottomBar: "bg-yellow-500/10 text-yellow-500",
    capabilities: ["Portfolio Parsing", "Alternative Assets", "Cross-Account View"],
    link: "/chat?persona=Alto"
  },
  {
    name: "Schwab",
    role: "PORTFOLIO ADVISOR",
    desc: "Personal Schwab portfolio advisor and financial analyst. Monitors crypto-heavy ETF holdings.",
    status: "ISOLATED",
    statusColor: "bg-blue-600",
    icon: BarChart3,
    iconBg: "bg-blue-900/40 text-blue-400",
    accent: "border-blue-400/30",
    glow: "shadow-[0_0_15px_-5px_rgba(37,99,235,0.3)]",
    bottomBar: "bg-blue-600/10 text-blue-400",
    capabilities: ["Cost Basis Tracking", "Market Context", "Statement Interpretation"],
    link: "/chat?persona=Schwab"
  },
  {
    name: "Lux",
    role: "RIGHT-HAND AI",
    desc: "Main thinking partner. Orchestrates the entire DLX operation without forcing rigid productivity.",
    status: "CORE",
    statusColor: "bg-cyan-500",
    icon: Zap,
    iconBg: "bg-cyan-950/40 text-cyan-500",
    accent: "border-cyan-500/30",
    glow: "shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)]",
    bottomBar: "bg-cyan-500/10 text-cyan-500",
    capabilities: ["Stream-of-Consciousness", "System Building", "Device Triage"],
    link: "/chat?persona=Lux"
  }
]

export default function AgentsHubPage() {
  const router = useRouter()

  return (
    <div className="max-w-[1400px] mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_-2px_rgba(6,182,212,0.3)]">
            <Bot className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h1 className="font-headline text-4xl font-black tracking-tight flex items-center gap-3 uppercase">
              DLX <span className="text-cyan-500">Roster</span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mt-1">Specialized Intelligence & Thinking Partners</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dlxRoster.map((agent, i) => (
          <Card 
            key={i} 
            className={cn(
              "border-white/5 bg-[#0a0a0c] overflow-hidden group relative transition-all duration-500 flex flex-col hover:-translate-y-1",
              agent.accent,
              agent.glow
            )}
          >
            {/* Status indicator in top right */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", agent.statusColor)} />
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{agent.status}</span>
            </div>

            <CardContent className="p-6 flex flex-col flex-1">
              <header className="flex items-center gap-4 mb-6">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 shadow-xl", agent.iconBg)}>
                  <agent.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-black tracking-tight uppercase leading-none">{agent.name}</h3>
                  <p className={cn("text-[9px] font-black uppercase tracking-widest mt-1.5", agent.bottomBar.split(' ')[1])}>
                    {agent.role}
                  </p>
                </div>
              </header>

              <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed mb-6 flex-1">
                {agent.desc}
              </p>

              <div className="mb-6">
                <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest mb-3">Capabilities</p>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap) => (
                    <span key={cap} className="text-[9px] font-bold text-white/60 border border-white/10 bg-white/5 px-2.5 py-1 rounded-md">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom bar - Direct Chat Link */}
              <Button 
                onClick={() => router.push(agent.link)}
                className={cn(
                  "w-full h-12 rounded-xl flex items-center justify-center gap-3 transition-all hover:brightness-125 border border-white/5 mt-auto font-black uppercase tracking-[0.2em] text-[10px]",
                  agent.bottomBar
                )}
              >
                <MessageSquare className="w-4 h-4" />
                Initiate Link
                <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
              </Button>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center p-12 text-center hover:bg-white/5 transition-colors cursor-pointer group rounded-3xl min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl">
             <Plus className="w-6 h-6 text-muted-foreground/50" />
          </div>
          <h3 className="font-headline text-xl font-black text-muted-foreground mb-2 uppercase tracking-tight">Deploy New Agent</h3>
          <p className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest">Construct capabilities & persona</p>
        </Card>
      </div>
    </div>
  )
}
