
"use client"

import * as React from "react"
import DashboardLayout from "../../dashboard/layout"
import { 
  Video, 
  Sparkles, 
  Play, 
  Trash2, 
  Plus,
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
  History,
  Monitor
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const scenes = [
  { id: 1, title: "Narrative Hook", duration: "0:08", thumbnail: "https://picsum.photos/seed/vids1/300/180" },
  { id: 2, title: "Technical Blueprint", duration: "0:15", thumbnail: "https://picsum.photos/seed/vids2/300/180" },
  { id: 3, title: "Market Visualization", duration: "0:42", thumbnail: "https://picsum.photos/seed/vids3/300/180" },
  { id: 4, title: "Strategic Call", duration: "0:10", thumbnail: "https://picsum.photos/seed/vids4/300/180" },
]

export default function VideoProductionStudio() {
  const [activeScene, setActiveScene] = React.useState(1)
  const [isExporting, setIsExporting] = React.useState(false)
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => setIsExporting(false), 3000)
  }

  if (!hasMounted) return null

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-140px)] -m-6 flex flex-col overflow-hidden bg-black">
        <header className="h-16 border-b border-white/5 bg-[#0a0a0c] flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline text-lg font-black uppercase tracking-tight">Vids Production</h1>
                <Badge variant="outline" className="border-primary/30 text-primary text-[8px] font-black h-4 px-1.5 bg-primary/5 uppercase">
                  ENTERPRISE EDITOR
                </Badge>
              </div>
              <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest leading-none mt-0.5">Project: Neural Intelligence Briefing v4</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="ghost" size="sm" className="h-9 text-[10px] font-black uppercase gap-2 hover:bg-white/5">
                <Share2 className="w-3.5 h-3.5" /> Stage Share
             </Button>
             <Button 
               onClick={handleExport}
               disabled={isExporting}
               className="h-9 bg-primary hover:bg-primary/90 rounded-lg font-black uppercase text-[10px] px-6 shadow-lg shadow-primary/20"
             >
               {isExporting ? "Processing Render..." : "Export Master"}
             </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <aside className="w-20 border-r border-white/5 bg-[#0a0a0c] flex flex-col items-center py-6 gap-6 shrink-0">
            {[
              { icon: Layout, label: "Layouts" },
              { icon: Layers, label: "Scenes" },
              { icon: Type, label: "Titles" },
              { icon: ImageIcon, label: "Assets" },
              { icon: Music, label: "Audio" },
              { icon: Sparkles, label: "AI Assist" },
              { icon: History, label: "History" },
            ].map((tool, i) => (
              <button key={i} className="flex flex-col items-center gap-1.5 group transition-all">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors border border-transparent",
                  i === 1 ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-muted-foreground group-hover:text-white"
                )}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground group-hover:text-white">{tool.label}</span>
              </button>
            ))}
          </aside>

          <main className="flex-1 flex flex-col min-w-0 bg-[#050507]">
            <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.02),transparent)]">
              <div className="w-full max-w-4xl space-y-4">
                <Card className="aspect-video w-full bg-black border-white/10 shadow-2xl rounded-2xl overflow-hidden relative group">
                  <img 
                    src={scenes[activeScene - 1].thumbnail} 
                    alt="Current Scene" 
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-sm">
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                     <Badge className="bg-black/60 border-white/10 text-[9px] font-black tracking-widest uppercase">Scene {activeScene}</Badge>
                     <Badge className="bg-primary text-white text-[9px] font-black uppercase">LIVE PREVIEW</Badge>
                  </div>
                </Card>
                
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-white" onClick={() => setActiveScene(Math.max(1, activeScene - 1))}><ChevronLeft className="w-5 h-5" /></Button>
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{scenes[activeScene - 1].title}</span>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-white" onClick={() => setActiveScene(Math.min(4, activeScene + 1))}><ChevronRight className="w-5 h-5" /></Button>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-full px-5 py-2 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-white tracking-widest">Neural Sync Active</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-72 border-t border-white/5 bg-[#0a0a0c] flex flex-col shrink-0">
               <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0e0e11]">
                  <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2 text-primary">
                       <Clock className="w-4 h-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Master Timeline</span>
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-black text-muted-foreground uppercase">
                      <span>0:00</span>
                      <div className="h-1 w-64 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary/40 w-[45%]" />
                      </div>
                      <span className="text-white">1:25</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="h-9 border-white/10 text-[9px] font-black uppercase rounded-xl px-6">Append Scene</Button>
                  </div>
               </div>

               <div className="flex-1 relative overflow-x-auto overflow-y-hidden no-scrollbar">
                  <div className="flex h-full p-6 gap-4 min-w-max">
                     {scenes.map((scene) => (
                       <button 
                         key={scene.id}
                         onClick={() => setActiveScene(scene.id)}
                         className={cn(
                           "relative group h-full transition-all border-2 rounded-2xl overflow-hidden flex flex-col bg-card",
                           activeScene === scene.id ? "border-primary w-80 shadow-2xl shadow-primary/10" : "border-white/5 w-60 hover:border-white/20"
                         )}
                       >
                          <img src={scene.thumbnail} alt={scene.title} className="w-full h-32 object-cover opacity-40 group-hover:opacity-100 transition-opacity" />
                          <div className="p-4 flex-1 flex flex-col justify-between">
                             <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black uppercase text-white truncate">{scene.title}</span>
                                <span className="text-[10px] font-bold text-primary">{scene.duration}</span>
                             </div>
                             <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all">
                                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg"><Settings2 className="w-4 h-4" /></Button>
                                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-lg hover:text-rose-500"><Trash2 className="w-4 h-4" /></Button>
                             </div>
                          </div>
                          {activeScene === scene.id && (
                             <div className="absolute top-0 left-0 w-1.5 h-full bg-primary shadow-xl shadow-primary/50" />
                          )}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </main>

          <aside className="w-80 border-l border-white/5 bg-[#0a0a0c] flex flex-col shrink-0">
             <div className="h-14 border-b border-white/5 flex items-center px-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Scene Inspector</span>
             </div>
             <ScrollArea className="flex-1">
                <div className="p-8 space-y-12">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Neural Layouts</p>
                      <div className="grid grid-cols-2 gap-4">
                         {[1, 2, 3, 4].map(i => (
                           <div key={i} className="aspect-video bg-white/5 border border-white/5 rounded-2xl hover:border-primary/50 cursor-pointer p-4 flex flex-col items-center justify-center gap-3 transition-all group">
                              <Layout className="w-6 h-6 text-muted-foreground/20 group-hover:text-primary/50" />
                              <span className="text-[9px] font-black text-muted-foreground/40 group-hover:text-primary/50 uppercase">Grid_V{i}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-4 pt-6 border-t border-white/5">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">AI Content Forge</p>
                      <Card className="bg-primary/5 border-primary/20 p-6 rounded-2xl border-dashed">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary">Script Synthesizer</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium leading-relaxed mb-8">
                          Draft high-impact technical narratives based on your neural project goals.
                        </p>
                        <Button variant="outline" className="w-full h-12 border-primary/30 text-primary text-[10px] font-black uppercase rounded-xl hover:bg-primary/10">
                          Forge Voiceover
                        </Button>
                      </Card>
                   </div>
                </div>
             </ScrollArea>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  )
}
