
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
  MoreVertical,
  History,
  FileVideo,
  ExternalLink,
  Square
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const scenes = [
  { id: 1, title: "Title Sequence", duration: "0:05", thumbnail: "https://picsum.photos/seed/scene1/200/120" },
  { id: 2, title: "Market Analysis", duration: "0:12", thumbnail: "https://picsum.photos/seed/scene2/200/120" },
  { id: 3, title: "Data Visualization", duration: "0:45", thumbnail: "https://picsum.photos/seed/scene3/200/120" },
  { id: 4, title: "Summary / CTA", duration: "0:08", thumbnail: "https://picsum.photos/seed/scene4/200/120" },
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
        <header className="h-16 border-b border-white/5 bg-[#0a0a0c] flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline text-lg font-black uppercase tracking-tight">Vids Production</h1>
                <Badge variant="outline" className="border-blue-500/30 text-blue-500 text-[8px] font-black h-4 px-1.5 bg-blue-500/5">
                  ENTERPRISE EDITOR
                </Badge>
              </div>
              <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest leading-none mt-0.5">Project: Strategic Intelligence Briefing v3</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center -space-x-2 mr-4">
               {[1,2,3].map(i => (
                 <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0c] bg-white/10 overflow-hidden">
                   <img src={`https://picsum.photos/seed/user${i}/24/24`} alt="Collaborator" />
                 </div>
               ))}
               <div className="w-6 h-6 rounded-full border-2 border-[#0a0a0c] bg-white/5 flex items-center justify-center text-[8px] font-black text-muted-foreground">+5</div>
             </div>
             <Button variant="ghost" size="sm" className="h-9 text-[10px] font-black uppercase gap-2 hover:bg-white/5">
                <Share2 className="w-3.5 h-3.5" /> Share
             </Button>
             <Button 
               onClick={handleExport}
               disabled={isExporting}
               className="h-9 bg-blue-600 hover:bg-blue-700 rounded-lg font-black uppercase text-[10px] px-6 shadow-lg shadow-blue-600/20"
             >
               {isExporting ? "Processing..." : "Export Master"}
             </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left: Tools Sidebar */}
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
            <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent)] pointer-events-none" />
              
              <div className="w-full max-w-4xl space-y-4">
                <Card className="aspect-video w-full bg-black border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden relative group">
                  <img 
                    src={`https://picsum.photos/seed/scene${activeScene}/1280/720`} 
                    alt="Current Scene" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                  </div>
                  {/* Overlay UI elements */}
                  <div className="absolute bottom-6 right-6 flex items-center gap-2">
                    <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-[10px] font-black">4K | 60FPS</Badge>
                  </div>
                </Card>
                
                {/* Secondary Viewport Controls */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white"><ChevronLeft className="w-4 h-4" /></Button>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Scene {activeScene} of 4</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white"><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-1.5 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-white tracking-widest">Real-time Preview</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Area */}
            <div className="h-72 border-t border-white/5 bg-[#0a0a0c] flex flex-col shrink-0">
               <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-[#0e0e11]">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                       <Clock className="w-3.5 h-3.5 text-blue-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white">Storyboard Timeline</span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase">
                      <span>0:00</span>
                      <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600/30 w-[30%]" />
                      </div>
                      <span className="text-white">1:10</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="h-8 text-[8px] font-black uppercase hover:bg-white/5">Sync Audio</Button>
                    <div className="w-px h-4 bg-white/10" />
                    <Button variant="outline" size="sm" className="h-8 border-white/10 text-[8px] font-black uppercase rounded-lg">New Scene</Button>
                  </div>
               </div>

               <div className="flex-1 relative overflow-x-auto overflow-y-hidden no-scrollbar">
                  <div className="flex h-full p-6 gap-3 min-w-max">
                     {scenes.map((scene) => (
                       <button 
                         key={scene.id}
                         onClick={() => setActiveScene(scene.id)}
                         className={cn(
                           "relative group h-full transition-all border-2 rounded-xl overflow-hidden flex flex-col bg-[#0c0c0e]",
                           activeScene === scene.id ? "border-blue-500 w-72" : "border-white/5 w-52 hover:border-white/20"
                         )}
                       >
                          <img src={scene.thumbnail} alt={scene.title} className="w-full h-32 object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                          <div className="p-4 flex-1 flex flex-col justify-between">
                             <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-white truncate">{scene.title}</span>
                                <span className="text-[9px] font-bold text-blue-500">{scene.duration}</span>
                             </div>
                             <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="secondary" className="h-7 w-7 rounded-lg"><Settings2 className="w-3.5 h-3.5" /></Button>
                                <Button size="icon" variant="secondary" className="h-7 w-7 rounded-lg hover:text-rose-500"><Trash2 className="w-3.5 h-3.5" /></Button>
                             </div>
                          </div>
                          {activeScene === scene.id && (
                             <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                          )}
                       </button>
                     ))}
                     <button className="w-24 h-full border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-all text-muted-foreground/30 hover:text-blue-500 hover:border-blue-500/50">
                        <Plus className="w-6 h-6" />
                        <span className="text-[8px] font-black uppercase tracking-widest">Append</span>
                     </button>
                  </div>
                  
                  {/* Global Scrubber Line */}
                  <div className="absolute top-0 left-[280px] bottom-0 w-[2px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] z-20 pointer-events-none">
                     <div className="w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 -mt-1.5 ring-4 ring-blue-500/20" />
                  </div>
               </div>
            </div>
          </main>

          {/* Right: Project Inspector */}
          <aside className="w-80 border-l border-white/5 bg-[#0a0a0c] flex flex-col shrink-0">
             <div className="h-12 border-b border-white/5 flex items-center px-6">
                <span className="text-[10px] font-black uppercase tracking-widest">Scene Inspector</span>
             </div>
             <ScrollArea className="flex-1">
                <div className="p-6 space-y-10">
                   <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Dynamic Layouts</p>
                      <div className="grid grid-cols-2 gap-3">
                         {[1, 2, 3, 4].map(i => (
                           <div key={i} className="aspect-video bg-white/5 border border-white/5 rounded-xl hover:border-blue-500/50 cursor-pointer p-3 flex flex-col items-center justify-center gap-2 transition-all group">
                              <Layout className="w-5 h-5 text-muted-foreground/30 group-hover:text-blue-500/50" />
                              <span className="text-[8px] font-black text-muted-foreground/50 group-hover:text-blue-500/50 uppercase">Grid V{i}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-4 pt-4 border-t border-white/5">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">AI Content Generation</p>
                      <Card className="bg-blue-600/5 border-blue-500/20 p-5 rounded-2xl border-dashed">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-blue-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Auto-Script Assist</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground font-medium leading-relaxed mb-6">
                          Our neural engine can draft high-impact scripts based on your project goals.
                        </p>
                        <Button variant="outline" className="w-full h-10 border-blue-500/30 text-blue-500 text-[10px] font-black uppercase rounded-xl hover:bg-blue-600/10">
                          Generate Voiceover
                        </Button>
                      </Card>
                   </div>

                   <div className="space-y-4 pt-4 border-t border-white/5">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Publishing Targets</p>
                      <div className="space-y-2">
                        {[
                          { name: 'Internal Review', status: 'Ready' },
                          { name: 'Social Media', status: 'Draft' },
                          { name: 'YouTube Channel', status: 'Linked' },
                        ].map((target, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors">
                            <span className="text-xs font-bold">{target.name}</span>
                            <Badge variant="outline" className="text-[8px] font-black border-none text-muted-foreground">{target.status}</Badge>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
             </ScrollArea>
             
             <div className="p-4 bg-[#0e0e11] border-t border-white/5">
                <Button className="w-full h-11 bg-white/5 hover:bg-white/10 text-white font-black uppercase text-[10px] tracking-widest border border-white/10 rounded-xl">
                   Open Project Assets
                </Button>
             </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  )
}
