
"use client"

import * as React from "react"
import DashboardLayout from "../../dashboard/layout"
import { 
  Music, 
  Sparkles, 
  Radio, 
  Mic2, 
  ArrowRight, 
  Play, 
  Settings2, 
  Youtube, 
  ExternalLink,
  ChevronRight,
  Plus,
  Zap,
  Library,
  Video
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const modes = [
  { id: 'studio', name: 'Studio Mode', desc: 'Manual composition control', icon: Music, active: true },
  { id: 'newscian', name: 'Newscian', desc: 'Political Rap / Truth-to-Power', icon: Radio },
  { id: 'sentinel', name: 'Midwest Sentinel', desc: 'Faith, Family, Boom Bap', icon: Mic2 },
  { id: 'neon', name: 'Neon Icon', desc: 'Viral Pop & Trends', icon: Zap },
  { id: 'mic', name: 'Mic (Manager)', desc: 'Strategy & Orchestration', icon: Settings2 },
]

const pipeline = [
  { name: 'Suno AI', icon: Music },
  { name: 'Google Vids', icon: Video },
  { name: 'DaVinci Resolve', icon: Settings2 },
  { name: 'YouTube', icon: Youtube },
]

export default function MusicStudioPage() {
  const [selectedMode, setSelectedMode] = React.useState('studio')

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto py-6 space-y-6">
        {/* Top Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/20">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-headline text-3xl font-black uppercase tracking-tight">MusicStudio</h1>
                <Badge variant="outline" className="border-rose-500/30 text-rose-500 text-[10px] font-black tracking-widest bg-rose-500/5">
                  BRIDGE OFFLINE
                </Badge>
                <Badge variant="outline" className="border-green-500/30 text-green-500 text-[10px] font-black tracking-widest bg-green-500/5">
                  3 AGENTS
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">Suno → Google Vids → DaVinci → YouTube</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-1 bg-white/5 rounded-xl border border-white/5">
             <Button variant="ghost" size="sm" className="h-9 text-[10px] font-black uppercase rounded-lg gap-2">
               <Plus className="w-3 h-3" /> Create
             </Button>
             <Button variant="ghost" size="sm" className="h-9 text-[10px] font-black uppercase rounded-lg gap-2">
               <Library className="w-3 h-3" /> Library
             </Button>
             <Button variant="default" className="h-9 bg-purple-600 hover:bg-purple-700 text-[10px] font-black uppercase rounded-lg shadow-lg shadow-purple-600/20">
               Studio Mode
             </Button>
          </div>
        </header>

        {/* Status Alert */}
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <p className="text-xs font-bold text-rose-500 uppercase tracking-widest">Bridge Offline - using fallback agents</p>
          </div>
          <Button variant="outline" size="sm" className="h-7 border-rose-500/30 text-[10px] font-black uppercase hover:bg-rose-500/10">Retry Connection</Button>
        </div>

        {/* Main Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel: Modes & Source */}
          <div className="lg:col-span-3 space-y-6">
             <section className="space-y-3">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest px-2">Mode</p>
                <div className="space-y-1">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group",
                        selectedMode === mode.id 
                          ? "bg-purple-600/10 border-purple-600/40 ring-1 ring-purple-600/40" 
                          : "bg-white/5 border-transparent hover:bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                        selectedMode === mode.id ? "bg-purple-600 text-white" : "bg-white/5 text-muted-foreground group-hover:text-white"
                      )}>
                        <mode.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase">{mode.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-medium">{mode.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
             </section>

             <Card className="bg-white/5 border-white/5 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Source Material</h3>
                  <Library className="w-4 h-4 text-muted-foreground/30" />
                </div>
                <div className="h-32 flex flex-col items-center justify-center text-center">
                  <p className="text-[10px] text-muted-foreground font-medium max-w-[160px]">No news loaded. Check bridge connection.</p>
                </div>
             </Card>
          </div>

          {/* Center Panel: Preview & Console */}
          <div className="lg:col-span-6 space-y-6">
             <Card className="aspect-video bg-[#0c0c0e] border-white/5 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent)]" />
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Music className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="font-headline text-3xl font-black mb-2 uppercase tracking-tighter">Studio Ready</h2>
                <p className="text-xs text-muted-foreground font-medium max-w-[300px] text-center leading-relaxed">
                  Enter a theme, select genre and mood, then generate your next hit.
                </p>
             </Card>

             <Card className="bg-white/5 border-white/5 p-8 rounded-3xl">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Configuration</h3>
                </div>
                <div className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Topic / Theme</label>
                     <Textarea 
                       placeholder="e.g. Neon city nights, rain on glass, digital dreams..." 
                       className="bg-black/40 border-white/5 h-24 rounded-xl focus:ring-purple-600/50"
                     />
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Genre</label>
                        <div className="flex flex-wrap gap-2">
                          {['Pop', 'EDM', 'Lo-Fi', 'Synthwave', 'Ambient'].map(g => (
                            <Badge key={g} variant="outline" className="cursor-pointer hover:bg-white/5 h-7 px-3 rounded-lg text-[10px] font-black uppercase">
                              {g}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mood</label>
                        <div className="flex flex-wrap gap-2">
                          {['Uplifting', 'Chill', 'Dark', 'Emotional'].map(m => (
                            <Badge key={m} variant="outline" className="cursor-pointer hover:bg-white/5 h-7 px-3 rounded-lg text-[10px] font-black uppercase">
                              {m}
                            </Badge>
                          ))}
                        </div>
                      </div>
                   </div>
                   <Button className="w-full h-12 bg-purple-600 hover:bg-purple-700 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-purple-600/20">
                      Generate Track <ChevronRight className="w-4 h-4 ml-2" />
                   </Button>
                </div>
             </Card>
          </div>

          {/* Right Panel: Pipeline & Publishing */}
          <div className="lg:col-span-3 space-y-6">
             <Card className="bg-white/5 border-white/5 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Production Pipeline</h3>
                  <Settings2 className="w-4 h-4 text-muted-foreground/30" />
                </div>
                <div className="space-y-8 relative">
                   <div className="absolute left-5 top-0 bottom-0 w-px bg-white/5" />
                   {pipeline.map((step, i) => (
                     <div key={step.name} className="flex items-center gap-4 relative">
                        <div className={cn(
                          "w-10 h-10 rounded-xl bg-background border flex items-center justify-center shrink-0 z-10",
                          i === 0 ? "border-purple-600/50" : "border-white/5"
                        )}>
                          <step.icon className={cn("w-5 h-5", i === 0 ? "text-purple-600" : "text-muted-foreground")} />
                        </div>
                        <div className="flex-1">
                           <p className="text-[10px] font-black uppercase">{step.name}</p>
                           {i === 0 && <p className="text-[8px] font-bold text-purple-600 uppercase">Awaiting Input</p>}
                        </div>
                        <ChevronRight className="w-3 h-3 text-muted-foreground/20" />
                     </div>
                   ))}
                </div>
             </Card>

             <div className="space-y-3">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest px-2">Publishing Hub</p>
                <div className="grid gap-2">
                   {[
                     { name: 'YouTube', icon: Youtube, color: 'text-red-500' },
                     { name: 'TikTok', icon: Music, color: 'text-cyan-400' },
                     { name: 'DistroKid', icon: Library, color: 'text-blue-500' }
                   ].map(p => (
                     <button key={p.name} className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                           <p.icon className={cn("w-4 h-4", p.color)} />
                           <span className="text-xs font-bold">{p.name}</span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground/30" />
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
