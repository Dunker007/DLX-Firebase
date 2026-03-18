"use client"

import * as React from "react"
import { 
  Network, 
  GitMerge, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles,
  Bot,
  Zap
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const phases = [
  {
    id: "phase-1",
    title: "Phase 1: Foundation & Identity",
    status: "in-progress",
    description: "Establish the secure base and core personas of the Neural OS.",
    tasks: [
      { name: "Define core DLX Roster (Lux, QPL, Newsician, Mic, Schwab)", status: "done" },
      { name: "Configure App Hosting & Cloud Run environment", status: "done" },
      { name: "Implement Firebase Authentication (User Sessions)", status: "done" },
      { name: "Set up Firestore schema (Users, Chats, Drive, Pipeline)", status: "pending" },
    ]
  },
  {
    id: "phase-2",
    title: "Phase 2: The DLX Chat & Communication Layer",
    status: "in-progress",
    description: "Bring the agents online via Genkit and connect the chat interface.",
    tasks: [
      { name: "Inject detailed system prompts into Genkit flows", status: "done" },
      { name: "Wire Chat UI to streaming Genkit backend", status: "done" },
      { name: "Implement chat history persistence in Firestore", status: "done" },
      { name: "Build context-switching logic between personas", status: "done" },
    ]
  },
  {
    id: "phase-3",
    title: "Phase 3: Studio Synthesis & Automation",
    status: "pending",
    description: "Connect the UI shells to real generative APIs for content creation.",
    tasks: [
      { name: "Music Studio: Connect to audio generation API (e.g., Suno/custom)", status: "pending" },
      { name: "Video Studio: Implement basic CapCut/Google Vids integration steps", status: "pending" },
      { name: "Neural Drive: Wire UI to Firebase Cloud Storage", status: "pending" },
      { name: "Establish Mic's automated 'Release Pipeline' trigger", status: "pending" },
    ]
  },
  {
    id: "phase-4",
    title: "Phase 4: Sector Isolation & SmartFolio",
    status: "pending",
    description: "Build out the isolated financial parsing tools for Schwab/Alto.",
    tasks: [
      { name: "Create secure data ingestion flow for portfolios", status: "pending" },
      { name: "Build specialized Genkit flow for financial risk/reporting", status: "pending" },
      { name: "Wire SmartFolio UI to live analysis endpoints", status: "pending" },
      { name: "Ensure strict data isolation from creative/studio sectors", status: "pending" },
    ]
  }
]

export default function BlueprintPage() {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      <header className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_-2px_rgba(var(--primary),0.3)]">
          <Network className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-headline text-4xl font-black uppercase tracking-tight flex items-center gap-3">
            Neural OS <span className="text-primary">Blueprint</span>
          </h1>
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mt-1">Living Master Plan & Execution Tracker</p>
        </div>
      </header>

      <div className="grid gap-6">
        {phases.map((phase, index) => (
          <Card key={phase.id} className={"border-white/5 bg-[#0a0a0c] relative overflow-hidden " + (phase.status === 'in-progress' ? 'ring-1 ring-primary/30' : '')}>
            {phase.status === 'in-progress' && (
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
            )}
            <CardHeader className="flex flex-row items-start justify-between pb-4 border-b border-white/5">
              <div>
                <CardTitle className="font-headline text-xl font-black tracking-tight uppercase mb-2">
                  {phase.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground font-medium">{phase.description}</p>
              </div>
              <Badge variant="outline" className={
                "uppercase text-[9px] font-black tracking-widest px-3 py-1 " +
                (phase.status === 'done' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' : 
                  phase.status === 'in-progress' ? 'border-primary/30 text-primary bg-primary/10 animate-pulse' : 
                  'border-white/10 text-muted-foreground')
              }>
                {phase.status.replace('-', ' ')}
              </Badge>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {phase.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    {task.status === 'done' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    ) : phase.status === 'in-progress' && i === 2 ? (
                      <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0 animate-pulse" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground/30 mt-0.5 shrink-0 group-hover:text-white/50 transition-colors" />
                    )}
                    <span className={"text-sm font-medium " + (task.status === 'done' ? 'text-white/50 line-through' : 'text-white/90')}>
                      {task.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
