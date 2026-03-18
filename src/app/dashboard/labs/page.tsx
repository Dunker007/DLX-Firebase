
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FlaskConical, Github, Microscope, GitPullRequest } from 'lucide-react';

const projects = [
  {
    name: "Neural Vision Studio",
    status: "Active Research",
    progress: 75,
    description: "Low-latency diffusion model for real-time UI design generation and iteration.",
    tag: "Vision"
  },
  {
    name: "Voice Persona Synthesis",
    status: "Concept",
    progress: 20,
    description: "Developing custom vocal signatures for Agent Personas like Lux and Architect.",
    tag: "Audio"
  },
  {
    name: "Autonomous Portfolio Agent",
    status: "Early Access",
    progress: 90,
    description: "Expanding SmartFolio into an agent that can execute rebalancing trades automatically.",
    tag: "Finance"
  }
];

export default function LabsPage() {
  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <FlaskConical className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-black tracking-tight">Labs Hub</h1>
          <p className="text-muted-foreground font-medium">Experimental projects and future platform roadmaps.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <Card key={i} className="border-white/5 bg-card/40 flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <Badge variant="outline" className="border-purple-500/30 text-purple-500 uppercase tracking-widest text-[10px] font-black">{project.tag}</Badge>
                <Microscope className="w-5 h-5 text-muted-foreground/30" />
              </div>
              <CardTitle className="font-headline text-xl">{project.name}</CardTitle>
              <CardDescription className="font-medium">{project.status}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-6">{project.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Development Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-1.5" />
              </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto border-t border-white/5 flex gap-4">
              <button className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                <Github className="w-3 h-3" /> Source
              </button>
              <button className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
                <GitPullRequest className="w-3 h-3" /> Collaborate
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16 glass-panel p-10 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent">
        <h2 className="font-headline text-2xl font-black mb-4">The 2024 Roadmap</h2>
        <div className="space-y-6">
          {[
            { q: "Q2", goal: "Public API Release for Studio Integration" },
            { q: "Q3", goal: "Mobile App (iOS & Android) Launch" },
            { q: "Q4", goal: "On-Premise Deployment for Enterprises" }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 items-center">
              <span className="font-headline text-4xl font-black text-white/10 shrink-0">{item.q}</span>
              <div className="h-px bg-white/5 flex-1" />
              <span className="font-bold text-muted-foreground">{item.goal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
