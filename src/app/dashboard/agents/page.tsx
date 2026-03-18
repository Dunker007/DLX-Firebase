
"use client"

import * as React from "react"
import Link from 'next/link'
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
  Activity
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

const dlxRoster = [
  {
    name: "Newsician",
    role: "POLITICAL MUSICIAN",
    desc: "Edgy, intense, and politically charged. Specializes in industrial techno and protest anthems.",
    status: "ONLINE",
    statusColor: "bg-red-500",
    icon: Mic2,
    iconBg: "bg-red-950/40 text-red-500",
    accent: "border-red-500/30",
    glow: "shadow-[0_0_15px_-5px_rgba(239,68,68,0.3)]",
    bottomBar: "bg-red-500/10 text-red-500",
    capabilities: ["Lyric Generation", "Cover Art Design", "Political Analysis"]
  },
  {
    name: "QPL",
    role: "MELLOW POLITICAL",
    desc: "Quiet Part Loud. Introspective, acoustic-focused political commentary with a mellow vibe.",
    status: "ONLINE",
    statusColor: "bg-blue-500",
    icon: Radio,
    iconBg: "bg-blue-950/40 text-blue-500",
    accent: "border-blue-500/30",
    glow: "shadow-[0_0_15px_-5px_rgba(59,130,246,0.3)]",
    bottomBar: "bg-blue-500/10 text-blue-500",
    capabilities: ["Acoustic Composition", "Poetic Lyrics", "Vibe Curation"]
  },
  {
    name: "Mic",
    role: "STUDIO MANAGER",
    desc: "Protects sustainable momentum. Manages distribution, visuals, and release cadence for DLX and QPL.",
    status: "ACTIVE",
    statusColor: "bg-purple-500",
    icon: LayoutGrid,
    iconBg: "bg-purple-950/40 text-purple-500",
    accent: "border-purple-500/30",
    glow: "shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)]",
    bottomBar: "bg-purple-500/10 text-purple-500",
    capabilities: ["Distribution Management", "Visual Workflows", "Release Strategy"]
  },
  {
    name: "Alto",
    role: "IRA ADVISOR",
    desc: "Dedicated financial parsing agent for Alto Crypto and Alternative Assets IRA accounts.",
    status: "ACTIVE",
    statusColor: "bg-yellow-500",
    icon: TrendingUp,
    iconBg: "bg-yellow-950/40 text-yellow-500",
    accent: "border-yellow-500/30",
    glow: "shadow-[0_0_15px_-5px_rgba(234,179,8,0.3)]",
    bottomBar: "bg-yellow-500/10 text-yellow-500",
    capabilities: ["Portfolio Parsing", "Performance Analysis", "Cross-Account View"]
  },
  {
    name: "Schwab Advisor",
    role: "PORTFOLIO ADVISOR",
    desc: "Personal Schwab portfolio advisor and financial analyst. Monitors holdings, performance, and market context.",
    status: "ACTIVE",
    statusColor: "bg-blue-600",
    icon: BarChart3,
    iconBg: "bg-blue-900/40 text-blue-400",
    accent: "border-blue-400/30",
    glow: "shadow-[0_0_15px_-5px_rgba(37,99,235,0.3)]",
    bottomBar: "bg-blue-600/10 text-blue-400",
    capabilities: ["Portfolio Analysis", "Market Context", "Statement Interpretation"]
  },
  {
    name: "Lux",
    role: "RIGHT-HAND AI",
    desc: "Chris's main thinking partner. Orchestrates the entire DLX operation across all sectors.",
    status: "CORE",
    statusColor: "bg-cyan-500",
    icon: Zap,
    iconBg: "bg-cyan-950/40 text-cyan-500",
    accent: "border-cyan-500/30",
    glow: "shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)]",
    bottomBar: "bg-cyan-500/10 text-cyan-500",
    capabilities: ["Strategic Planning", "Automation", "Cross-Sector Integration"]
  }
]

export default function AgentsHubPage() {
  return (
    <div className="max-w-[1400px] mx-auto py-6">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
          <Bot className="w-6 h-6 text-cyan-500" />
        </div>
        <div>
          <h1 className="font-headline text-4xl font-black tracking-tight flex items-center gap-3">
            DLX<span className="text-cyan-500">ROSTER</span>
          </h1>
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">Meet your specialized AI agents and thinking partners</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dlxRoster.map((agent, i) => (
          <Card 
            key={i} 
            className={cn(
              "border-white/5 bg-[#0e0e11] overflow-hidden group relative transition-all duration-500",
              agent.accent,
              agent.glow
            )}
          >
            {/* Status indicator in top right */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", agent.statusColor)} />
              <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{agent.status}</span>
            </div>

            <CardContent className="p-6">
              <header className="flex items-center gap-4 mb-6">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", agent.iconBg)}>
                  <agent.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-black tracking-tight uppercase leading-none">{agent.name}</h3>
                  <p className={cn("text-[9px] font-black uppercase tracking-widest mt-1.5", agent.bottomBar.split(' ')[1])}>
                    {agent.role}
                  </p>
                </div>
              </header>

              <p className="text-xs text-muted-foreground/80 font-medium leading-relaxed mb-6 min-h-[40px]">
                {agent.desc}
              </p>

              <div className="mb-8">
                <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest mb-3">Capabilities</p>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.map((cap) => (
                    <span key={cap} className="text-[9px] font-bold text-white/40 border border-white/5 bg-white/5 px-2 py-0.5 rounded-full">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Functional Row: Chat and Grounded */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center bg-black/40 border border-white/5 rounded-full px-4 py-2 group/input hover:border-white/20 transition-all cursor-pointer">
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground/30 mr-2" />
                  <span className="text-[10px] font-black uppercase text-white/50">Chat</span>
                  <div className="flex-1" />
                  <div className="w-4 h-4 rounded bg-white/5 border border-white/10" />
                </div>
                <div className="flex items-center bg-black/40 border border-white/5 rounded-full px-4 py-2 group/input hover:border-white/20 transition-all cursor-pointer">
                  <Search className="w-3.5 h-3.5 text-muted-foreground/30 mr-2" />
                  <span className="text-[10px] font-black uppercase text-white/50">Grounded</span>
                  <div className="flex-1" />
                  <div className="w-4 h-4 rounded bg-white/5 border border-white/10" />
                </div>
              </div>

              {/* Bottom bar - Live Mode */}
              <button className={cn(
                "w-full h-10 rounded-xl flex items-center justify-center gap-3 transition-all hover:brightness-125 border border-white/5",
                agent.bottomBar
              )}>
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Mode</span>
                <Settings2 className="w-3.5 h-3.5 ml-auto opacity-30 mr-2" />
              </button>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center p-12 text-center hover:bg-white/5 transition-colors cursor-pointer group rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Bot className="w-6 h-6 text-muted-foreground/30" />
          </div>
          <h3 className="font-headline text-lg font-bold text-muted-foreground mb-1 uppercase tracking-tight">Deploy New Agent</h3>
          <p className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest">Construct capabilities & persona</p>
        </Card>
      </div>
    </div>
  )
}
