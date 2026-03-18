
"use client"

import * as React from "react"
import { 
  Radio, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Play,
  Layers,
  Activity,
  ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const pipelineSteps = [
  { id: 1, title: "Neural Drafting", status: "completed", progress: 100, agent: "CopyArchitect", type: "BLOG" },
  { id: 2, title: "Asset Synthesis", status: "active", progress: 65, agent: "VisionaryAI", type: "ART" },
  { id: 3, title: "Vocal Mastering", status: "pending", progress: 0, agent: "SonicGen", type: "AUDIO" },
  { id: 4, title: "Production Render", status: "pending", progress: 0, agent: "Vids Production", type: "VIDEO" },
]

export default function PipelinePage() {
  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Radio className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h1 className="font-headline text-3xl font-black uppercase tracking-tight">Content Pipeline</h1>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Cross-Studio Production Queue</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="h-9 border-white/5 bg-white/5 text-[10px] font-black uppercase">Archive Queue</Button>
           <Button size="sm" className="h-9 bg-primary hover:bg-primary/90 text-[10px] font-black uppercase shadow-lg shadow-primary/20">Sync All Stages</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Jobs", val: "12", icon: Activity, color: "text-blue-500" },
          { label: "Queue Load", val: "84%", icon: Layers, color: "text-orange-500" },
          { label: "Avg Synthesis", val: "12.4s", icon: Zap, color: "text-yellow-500" },
          { label: "Success Rate", val: "99.8%", icon: CheckCircle2, color: "text-emerald-500" },
        ].map((stat, i) => (
          <Card key={i} className="bg-[#0a0a0c] border-white/5 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <ArrowUpRight className="w-3 h-3 text-muted-foreground/30" />
            </div>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
            <p className="text-xl font-black">{stat.val}</p>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest px-2">Production Queue</h3>
        <div className="space-y-3">
          {pipelineSteps.map((step) => (
            <Card key={step.id} className="bg-[#0a0a0c] border-white/5 p-6 hover:bg-[#0e0e11] transition-all group rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-4 min-w-[240px]">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    step.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                    step.status === 'active' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500 animate-pulse' :
                    'bg-white/5 border-white/10 text-muted-foreground'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-tight">{step.title}</h4>
                    <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">{step.agent} Agent</p>
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-muted-foreground uppercase">{step.progress}% Optimized</span>
                    <Badge variant="outline" className="text-[8px] font-black uppercase border-white/10">{step.type}</Badge>
                  </div>
                  <Progress value={step.progress} className="h-1 bg-white/5" />
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white/5">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="h-9 border-white/5 bg-white/5 text-[9px] font-black uppercase rounded-lg px-4">Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
