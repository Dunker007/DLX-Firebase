
"use client"

import * as React from "react"
import DashboardLayout from "../../dashboard/layout"
import { 
  Video, 
  Sparkles, 
  Play, 
  Download, 
  Trash2, 
  Plus,
  Monitor,
  Layout,
  Clock,
  Settings2,
  Layers,
  Music,
  Type,
  Image as ImageIcon,
  Share2,
  ChevronRight,
  ChevronLeft,
  MoreVertical
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const scenes = [
  { id: 1, title: "Intro Scene", duration: "0:05", thumbnail: "https://picsum.photos/seed/scene1/200/120" },
  { id: 2, title: "Feature Breakdown", duration: "0:12", thumbnail: "https://picsum.photos/seed/scene2/200/120" },
  { id: 3, title: "Demo Walkthrough", duration: "0:45", thumbnail: "https://picsum.photos/seed/scene3/200/120" },
  { id: 4, title: "Outro / CTA", duration: "0:08", thumbnail: "https://picsum.photos/seed/scene4/200/120" },
]

export default function VideoProductionStudio() {
  const [activeScene, setActiveScene] = React.useState(1)
  const [isExporting, setIsExporting] = React.useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => setIsExporting(false), 3000)
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-140px)] -m-6 flex flex-col overflow-hidden bg-[#050507]">
        {/* Top Control Bar */}
        <header className="h-16 border-b border-white/5 bg-[#0a0a0c] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline text-lg font-black uppercase tracking-tight">Vids Production</h1>
                <Badge variant="outline" className="border-blue-500/30 text-blue-500 text-[8px] font-black h-4 px-1.5 bg-blue-500/5">
                  GOOGLE VIDS EDITOR
                </Badge>
              </div>
              <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest leading-none mt-0.5">Project: LuxAI Platform Demo v1.2</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="ghost" size="sm" className="h-9 text-[10px] font-black uppercase gap-2 hover:bg-white/5">
                <Share2 className="w-3.5 h-3.5" /> Share
             </Button>
             <Button 
               onClick={handleExport}
               disabled={isExporting}
               className="h-9 bg-blue-600 hover:bg-blue-700 rounded-lg font-black uppercase text-[10px] px-6 shadow-lg shadow-blue-600/20"
             >
               {isExporting ? "Exporting..." : "Publish Video"}
             </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left: Tools Sidebar */}
          <aside className="w-20 border-r border-white/5 bg-[#0a0a0c] flex flex-col items-center py-6 gap-6 shrink-0">
            {[
              { icon: Layout, label: "Template" },
              { icon: Layers, label: "Scenes" },
              { icon: Type, label: "Text" },
              { icon: ImageIcon, label: "Media" },
              { icon: Music, label: "Audio" },
              { icon: Sparkles, label: "AI Tools" },
              { icon: Settings2, label: "Settings" },
            ].map((tool, i) => (
              <button key={i} className="flex flex-col items-center gap-1.5 group transition-all">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors border border-transparent",
                  i === 1 ? "bg-blue-600/10 text-blue-500 border-blue-500/20" : "bg-white/5 text-muted-foreground group-hover:text-white group-hover:bg-white/10"
                )}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground group-hover:text-white">{tool.label}</span>
              </button>
            ))}
          </aside>

          {/* Center: Main Editor & Timeline */}
          <main className="flex-1 flex flex-col min-w-0 bg-[#050507]">
            {/* Canvas Area */}
            <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent)] pointer-events-none" />
              
              <Card className="aspect-video w-full max-w-4xl bg-black border-white/10 shadow-2xl rounded-lg overflow-hidden relative group">
                <img 
                  src={`https://picsum.photos/seed/scene${activeScene}/1280/720`} 
                  alt="Current Scene" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                {/* Scene Overlays (UI Simulation) */}
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                   <Badge className="bg-blue-600 text-[10px] font-black tracking-widest">SCENE {activeScene}</Badge>
                   <span className="text-[10px] text-white/50 font-black uppercase">00:0{activeScene}:12</span>
                </div>
              </Card>

              {/* Viewport Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#0a0a0c]/80 backdrop-blur-md border border-white/5 px-6 py-2.5 rounded-full">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white"><ChevronLeft className="w-4 h-4" /></Button>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase text-white">45%</span>
                  <div className="h-1 w-24 bg-white/10 rounded-full">
                    <div className="h-full bg-blue-600 w-[45%]" />
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white"><ChevronRight className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Timeline Area */}
            <div className="h-64 border-t border-white/5 bg-[#0a0a0c] flex flex-col shrink-0">
               <div className="h-10 border-b border-white/5 flex items-center justify-between px-6 bg-[#0e0e11]">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <Clock className="w-3.5 h-3.5 text-blue-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white">Timeline</span>
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground">0:00 / 1:10</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-7 text-[8px] font-black uppercase">Zoom Out</Button>
                    <div className="w-px h-3 bg-white/10" />
                    <Button variant="ghost" size="sm" className="h-7 text-[8px] font-black uppercase">Zoom In</Button>
                  </div>
               </div>

               <div className="flex-1 relative overflow-x-auto overflow-y-hidden">
                  <div className="flex h-full p-4 gap-1 min-w-max">
                     {scenes.map((scene) => (
                       <button 
                         key={scene.id}
                         onClick={() => setActiveScene(scene.id)}
                         className={cn(
                           "relative group h-full transition-all border-2 rounded-xl overflow-hidden flex flex-col",
                           activeScene === scene.id ? "border-blue-500 w-64" : "border-white/5 w-48 hover:border-white/20"
                         )}
                       >
                          <img src={scene.thumbnail} alt={scene.title} className="w-full h-24 object-cover" />
                          <div className="p-3 bg-[#0c0c0e] flex-1 flex flex-col justify-between">
                             <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black uppercase text-white truncate">{scene.title}</span>
                                <span className="text-[8px] font-bold text-muted-foreground">{scene.duration}</span>
                             </div>
                             <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-white"><Settings2 className="w-3 h-3" /></Button>
                                <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-rose-500"><Trash2 className="w-3 h-3" /></Button>
                             </div>
                          </div>
                          {activeScene === scene.id && (
                             <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                          )}
                       </button>
                     ))}
                     <button className="w-24 h-full border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/5 transition-all text-muted-foreground/40 hover:text-blue-500">
                        <Plus className="w-5 h-5" />
                        <span className="text-[8px] font-black uppercase">Add Scene</span>
                     </button>
                  </div>
                  
                  {/* Timeline Scrubber UI */}
                  <div className="absolute top-0 left-24 bottom-0 w-px bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] z-10 pointer-events-none">
                     <div className="w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 -mt-1.5" />
                  </div>
               </div>
            </div>
          </main>

          {/* Right: Asset/Property Panel */}
          <aside className="w-80 border-l border-white/5 bg-[#0a0a0c] flex flex-col shrink-0">
             <div className="h-12 border-b border-white/5 flex items-center px-6">
                <span className="text-[10px] font-black uppercase tracking-widest">Asset Properties</span>
             </div>
             <ScrollArea className="flex-1">
                <div className="p-6 space-y-8">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Scene Layout</p>
                      <div className="grid grid-cols-2 gap-2">
                         {[1, 2, 3, 4].map(i => (
                           <div key={i} className="aspect-video bg-white/5 border border-white/5 rounded-lg hover:border-blue-500/50 cursor-pointer p-2 flex items-center justify-center">
                              <Layout className="w-4 h-4 text-muted-foreground/30" />
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Transition</p>
                      <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-all">
                         <span className="text-xs font-bold">Cross Dissolve</span>
                         <MoreVertical className="w-3.5 h-3.5 text-muted-foreground/30" />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">AI Enhancements</p>
                      {[
                        { label: "Smart Background", active: true },
                        { label: "Voiceover Sync", active: false },
                        { label: "Auto Captions", active: true },
                      ].map((opt, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl">
                           <span className="text-xs font-bold">{opt.label}</span>
                           <div className={cn(
                             "w-8 h-4 rounded-full relative transition-colors",
                             opt.active ? "bg-blue-600" : "bg-white/10"
                           )}>
                              <div className={cn(
                                "w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all",
                                opt.active ? "right-0.5" : "left-0.5"
                              )} />
                           </div>
                        </div>
                      ))}
                   </div>

                   <Card className="bg-blue-600/5 border-blue-500/20 p-4 rounded-2xl border-dashed">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">AI Prompt Assist</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-medium leading-relaxed mb-4">
                        Generate a professional script for this scene based on your brand guidelines.
                      </p>
                      <Button variant="outline" className="w-full h-8 border-blue-500/30 text-blue-500 text-[10px] font-black uppercase rounded-lg hover:bg-blue-600/10">
                        Draft Script
                      </Button>
                   </Card>
                </div>
             </ScrollArea>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  )
}
