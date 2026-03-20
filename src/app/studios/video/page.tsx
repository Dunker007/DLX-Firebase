
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
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { generateVideoClip } from "@/ai/flows/video-generation-flow"
import { cn } from "@/lib/utils"

const initialScenes = [
  { id: 1, title: "Narrative Hook", duration: "0:08", thumbnail: "https://picsum.photos/seed/vids1/300/180", videoUrl: "" },
  { id: 2, title: "Technical Blueprint", duration: "0:15", thumbnail: "https://picsum.photos/seed/vids2/300/180", videoUrl: "" },
]

export default function VideoProductionStudio() {
  const [activeSceneId, setActiveSceneId] = React.useState(1)
  const [scenes, setScenes] = React.useState(initialScenes)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [videoPrompt, setVideoPrompt] = React.useState("")
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const handleGenerateClip = async () => {
    if (!videoPrompt.trim()) return
    setIsGenerating(true)
    try {
      const result = await generateVideoClip({ prompt: videoPrompt })
      setScenes(prev => prev.map(s => 
        s.id === activeSceneId ? { ...s, videoUrl: result.videoUrl } : s
      ))
    } catch (error) {
      console.error("Clip generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const activeScene = scenes.find(s => s.id === activeSceneId) || scenes[0]

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
                  VEO 3 ENGINE
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="ghost" size="sm" className="h-9 text-[10px] font-black uppercase gap-2 hover:bg-white/5">
                <Share2 className="w-3.5 h-3.5" /> Stage Share
             </Button>
             <Button className="h-9 bg-primary hover:bg-primary/90 rounded-lg font-black uppercase text-[10px] px-6 shadow-lg shadow-primary/20">
               Export Master
             </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <aside className="w-20 border-r border-white/5 bg-[#0a0a0c] flex flex-col items-center py-6 gap-6 shrink-0">
            {[
              { icon: Layout, label: "Layouts" },
              { icon: Layers, label: "Scenes" },
              { icon: Sparkles, label: "Veo Clip" },
              { icon: History, label: "History" },
            ].map((tool, i) => (
              <button key={i} className="flex flex-col items-center gap-1.5 group transition-all">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors border border-transparent",
                  i === 2 ? "bg-primary/10 text-primary border-primary/20" : "bg-white/5 text-muted-foreground group-hover:text-white"
                )}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground group-hover:text-white">{tool.label}</span>
              </button>
            ))}
          </aside>

          <main className="flex-1 flex flex-col min-w-0 bg-[#050507]">
            <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden">
              <div className="w-full max-w-4xl space-y-4">
                <Card className="aspect-video w-full bg-black border-white/10 shadow-2xl rounded-2xl overflow-hidden relative group">
                  {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20 gap-4">
                      <Loader2 className="w-10 h-10 text-primary animate-spin" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Synthesizing Scene via Veo 3...</p>
                    </div>
                  ) : activeScene.videoUrl ? (
                    <video key={activeScene.videoUrl} autoPlay loop muted className="w-full h-full object-cover">
                      <source src={activeScene.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={`/.netlify/images?url=${encodeURIComponent(activeScene.thumbnail)}&w=1200&fm=avif&q=80`} 
                      srcSet={`/.netlify/images?url=${encodeURIComponent(activeScene.thumbnail)}&w=400&fm=avif&q=80 400w, /.netlify/images?url=${encodeURIComponent(activeScene.thumbnail)}&w=800&fm=avif&q=80 800w, /.netlify/images?url=${encodeURIComponent(activeScene.thumbnail)}&w=1200&fm=avif&q=80 1200w`}
                      sizes="(max-width: 1200px) 100vw, 1200px"
                      className="w-full h-full object-cover opacity-60" 
                      alt="Placeholder" 
                      loading="eager"
                      fetchpriority="high"
                      width={1200}
                      height={675}
                    />
                  )}
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                     <Badge className="bg-black/60 border-white/10 text-[9px] font-black tracking-widest uppercase">Scene {activeScene.id}</Badge>
                  </div>
                </Card>
                
                <div className="flex items-center gap-4 bg-[#0a0a0c] border border-white/5 p-4 rounded-2xl">
                   <div className="flex-1 relative">
                     <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
                     <Input 
                       value={videoPrompt}
                       onChange={(e) => setVideoPrompt(e.target.value)}
                       placeholder="Describe the cinematic clip to generate for this scene..."
                       className="pl-12 bg-black/40 border-white/10 h-12 text-xs"
                     />
                   </div>
                   <Button 
                    onClick={handleGenerateClip}
                    disabled={isGenerating || !videoPrompt.trim()}
                    className="h-12 bg-primary px-8 font-black uppercase text-[10px] rounded-xl"
                   >
                     {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                     Generate Clip
                   </Button>
                </div>
              </div>
            </div>

            <div className="h-48 border-t border-white/5 bg-[#0a0a0c] flex flex-col shrink-0">
               <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-[#0e0e11]">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Timeline</span>
               </div>
               <div className="flex-1 overflow-x-auto no-scrollbar">
                  <div className="flex h-full p-4 gap-4">
                     {scenes.map((scene) => (
                       <button 
                         key={scene.id}
                         onClick={() => setActiveSceneId(scene.id)}
                         className={cn(
                           "relative group h-full transition-all border-2 rounded-xl overflow-hidden flex flex-col bg-card w-48",
                           activeSceneId === scene.id ? "border-primary" : "border-white/5"
                         )}
                       >
                          <img 
                            src={`/.netlify/images?url=${encodeURIComponent(scene.thumbnail)}&w=400&fm=avif&q=80`} 
                            srcSet={`/.netlify/images?url=${encodeURIComponent(scene.thumbnail)}&w=200&fm=avif&q=80 200w, /.netlify/images?url=${encodeURIComponent(scene.thumbnail)}&w=400&fm=avif&q=80 400w`}
                            sizes="200px"
                            alt={scene.title} 
                            loading="lazy"
                            width={300}
                            height={180}
                            className="w-full h-20 object-cover opacity-60" 
                          />
                          <div className="p-2">
                             <span className="text-[9px] font-black uppercase text-white truncate block">{scene.title}</span>
                          </div>
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  )
}
