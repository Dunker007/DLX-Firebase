
"use client"

import * as React from "react"
import { 
  Play, 
  Plus, 
  Database, 
  Sparkles, 
  Zap, 
  MessageSquare, 
  Music, 
  ShieldCheck, 
  Settings2,
  Maximize2,
  Minus,
  Move
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const nodes = [
  { id: 'start', label: 'START: SONG IDEA', icon: Zap, color: 'bg-indigo-950/40 border-indigo-500/50 text-indigo-400', pos: { x: '50%', y: '10%' }, type: 'trigger' },
  { id: 'lyricist', label: 'Lyricist Agent', icon: MessageSquare, color: 'bg-slate-900/60 border-white/5 text-orange-400', pos: { x: '35%', y: '30%' }, type: 'agent' },
  { id: 'composer', label: 'Composer Agent', icon: Music, color: 'bg-slate-900/60 border-white/5 text-purple-400', pos: { x: '65%', y: '30%' }, type: 'agent' },
  { id: 'critic', label: 'Critic Agent', icon: ShieldCheck, color: 'bg-yellow-950/20 border-yellow-500/20 text-yellow-500', pos: { x: '50%', y: '50%' }, type: 'agent' },
  { id: 'producer', label: 'Producer Agent', icon: Settings2, color: 'bg-slate-900/60 border-white/5 text-slate-300', pos: { x: '50%', y: '70%' }, type: 'agent' },
  { id: 'final', label: 'FINAL SONG', icon: Sparkles, color: 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400', pos: { x: '50%', y: '90%' }, type: 'output' },
]

export default function AgentFlowPage() {
  return (
    <div className="h-[calc(100vh-140px)] -m-6 bg-[#020203] relative overflow-hidden flex flex-col">
      {/* Background Grid/Stars effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
      
      {/* Page Header */}
      <header className="p-8 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline text-4xl font-black tracking-tight text-white flex items-center gap-3">
              AGENT FLOW
            </h1>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mt-1">Visual Workflow Orchestration</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-white/40 hover:text-white border border-white/5 bg-white/5 px-4 h-9 rounded-full">
              <Plus className="w-3.5 h-3.5 mr-2" /> New Node
            </Button>
            <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-white/40 hover:text-white border border-white/5 bg-white/5 px-4 h-9 rounded-full">
              <Database className="w-3.5 h-3.5 mr-2" /> Cache Matrix
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-[10px] font-black uppercase h-9 rounded-full px-6 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
              <Play className="w-3.5 h-3.5 mr-2 fill-current" /> Initiate
            </Button>
          </div>
        </div>
      </header>

      {/* Floating UI: Neural Templates */}
      <aside className="absolute top-32 left-8 w-56 z-20">
        <Card className="bg-[#0c0c0e]/80 backdrop-blur-md border-white/5 p-4 rounded-xl">
          <h3 className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-4 px-1">Neural Templates</h3>
          <ul className="space-y-2">
            {[
              { label: 'Lyricist', icon: MessageSquare, color: 'text-orange-400' },
              { label: 'Composer', icon: Music, color: 'text-purple-400' },
              { label: 'Critic', icon: ShieldCheck, color: 'text-yellow-500' },
              { label: 'Producer', icon: Settings2, color: 'text-slate-400' },
            ].map(item => (
              <li key={item.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                <span className="text-[10px] font-bold uppercase text-white/60 group-hover:text-white">{item.label}</span>
              </li>
            ))}
          </ul>
        </Card>
      </aside>

      {/* Floating UI: Matrix Status */}
      <aside className="absolute top-32 right-8 w-56 z-20">
        <Card className="bg-[#0c0c0e]/80 backdrop-blur-md border-white/5 p-5 rounded-xl">
          <h3 className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 mb-6 px-1">Matrix Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-muted-foreground uppercase">Nodes</span>
              <span className="text-xs font-black text-indigo-500">6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-muted-foreground uppercase">Vector Trace</span>
              <span className="text-xs font-black text-cyan-400">6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-black text-muted-foreground uppercase">Lifecycle</span>
              <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black px-2 h-4">SIGNAL_OK</Badge>
            </div>
          </div>
        </Card>
      </aside>

      {/* Canvas Area */}
      <div className="flex-1 relative cursor-grab active:cursor-grabbing">
        {/* SVG Connections Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.2)" />
              <stop offset="50%" stopColor="rgba(99, 102, 241, 0.4)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.2)" />
            </linearGradient>
          </defs>
          
          {/* Connection Lines (Represented as paths based on node hierarchy) */}
          <path d="M 50% 18% L 35% 28%" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-10" />
          <path d="M 50% 18% L 65% 28%" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-10" />
          <path d="M 35% 38% L 50% 48%" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-10" />
          <path d="M 65% 38% L 50% 48%" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-10" />
          <path d="M 50% 58% L 50% 68%" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-10" />
          <path d="M 50% 78% L 50% 88%" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="opacity-10" />
        </svg>

        {/* Nodes Layer */}
        {nodes.map(node => (
          <div 
            key={node.id} 
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: node.pos.x, top: node.pos.y }}
          >
            <div className={`
              px-8 py-3 rounded-2xl border flex items-center gap-3 transition-all duration-300
              hover:scale-105 hover:shadow-[0_0_30px_-5px_currentColor] cursor-pointer
              ${node.color}
            `}>
              <node.icon className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-tight">{node.label}</span>
            </div>
            
            {/* Port Dots */}
            {node.type !== 'output' && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20 border border-white/20" />}
            {node.type !== 'trigger' && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20 border border-white/20" />}
          </div>
        ))}
      </div>

      {/* Canvas Controls (Bottom Left) */}
      <div className="absolute bottom-8 left-8 flex flex-col gap-2 z-20">
        <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg bg-white/5 border-white/5 text-muted-foreground hover:text-white">
          <Plus className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg bg-white/5 border-white/5 text-muted-foreground hover:text-white">
          <Minus className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg bg-white/5 border-white/5 text-muted-foreground hover:text-white">
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Mini-map (Bottom Right) */}
      <div className="absolute bottom-8 right-8 w-32 h-20 bg-white/5 border border-white/5 rounded-xl overflow-hidden z-20">
        <div className="absolute inset-4 bg-white/10 rounded-lg animate-pulse" />
      </div>

      <style jsx>{`
        svg path {
          transition: opacity 0.3s ease;
        }
        .group:hover + svg path {
          opacity: 0.5;
        }
      `}</style>
    </div>
  )
}
