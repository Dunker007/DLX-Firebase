
"use client"

import * as React from "react"
import DashboardLayout from "../../dashboard/layout"
import { 
  Video, 
  Sparkles, 
  Play, 
  Download, 
  Trash2, 
  RefreshCcw, 
  ChevronRight,
  Monitor,
  Layout,
  Clock,
  Settings2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function VideoStudioPage() {
  const [isGenerating, setIsGenerating] = React.useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 3000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto py-6 space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-headline text-3xl font-black uppercase tracking-tight">VideoStudio</h1>
                <Badge variant="outline" className="border-blue-500/30 text-blue-500 text-[10px] font-black tracking-widest bg-blue-500/5">
                  GOOGLE VEO POWERED
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">High-Fidelity Cinematic Generation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Badge variant="secondary" className="h-9 px-4 rounded-xl text-[10px] font-black uppercase bg-white/5 border-white/5">
               Credits: 1,420
             </Badge>
             <Button className="h-9 bg-blue-600 hover:bg-blue-700 rounded-xl font-black uppercase text-[10px]">
               Upgrade Plan
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Controls */}
          <div className="lg:col-span-4 space-y-6">
             <Card className="bg-white/5 border-white/5 p-8 rounded-3xl space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Creative Prompt</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground">Scene Description</label>
                    <Textarea 
                      placeholder="A cinematic shot of a futuristic metropolis under a violet sky, high-speed vehicles leave trails of light..." 
                      className="bg-black/40 border-white/5 h-32 rounded-xl focus:ring-blue-600/50"
                    />
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                       <label className="text-[10px] font-black uppercase text-muted-foreground">Aspect Ratio</label>
                       <span className="text-[10px] font-bold">16:9</span>
                     </div>
                     <div className="grid grid-cols-3 gap-2">
                        {['16:9', '9:16', '1:1'].map(ratio => (
                          <button key={ratio} className="h-10 rounded-lg border border-white/5 bg-white/5 text-[10px] font-black hover:border-blue-500/30 transition-all">
                            {ratio}
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4 pt-2">
                     <div className="flex items-center justify-between">
                       <label className="text-[10px] font-black uppercase text-muted-foreground">Duration</label>
                       <span className="text-[10px] font-bold">5 Seconds</span>
                     </div>
                     <Slider defaultValue={[5]} max={8} min={5} step={1} />
                  </div>

                  <div className="space-y-4 pt-2">
                     <label className="text-[10px] font-black uppercase text-muted-foreground">Visual Style</label>
                     <Select defaultValue="cinematic">
                        <SelectTrigger className="bg-black/40 border-white/5 h-12 rounded-xl">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1e] border-white/10">
                          <SelectItem value="cinematic">Cinematic 4K</SelectItem>
                          <SelectItem value="anime">Studio Ghibli Style</SelectItem>
                          <SelectItem value="realistic">Hyper-Realistic</SelectItem>
                          <SelectItem value="abstract">Surreal / Abstract</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-600/20 mt-4"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <RefreshCcw className="w-4 h-4 animate-spin" /> Synthesizing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Generate Video <Play className="w-4 h-4 ml-1" />
                    </span>
                  )}
                </Button>
             </Card>
          </div>

          {/* Preview & Library */}
          <div className="lg:col-span-8 space-y-6">
             <Card className="aspect-video bg-[#0c0c0e] border-white/5 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group border-dashed">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent)]" />
                {isGenerating ? (
                  <div className="text-center space-y-4 z-10">
                     <div className="w-16 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-blue-600 animate-[progress_2s_ease-in-out_infinite]" />
                     </div>
                     <p className="text-xs text-muted-foreground font-black uppercase tracking-widest animate-pulse">Rendering Video Stems...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                      <Monitor className="w-8 h-8 text-blue-600/50" />
                    </div>
                    <h2 className="font-headline text-2xl font-black mb-2 uppercase tracking-tight text-white/40">Preview Monitor</h2>
                    <p className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest">Awaiting synthesis</p>
                  </>
                )}
             </Card>

             <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                   <h3 className="text-[10px] font-black uppercase tracking-widest">Recent Generations</h3>
                   <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase">View All</Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                   {[1, 2, 3].map(i => (
                     <Card key={i} className="aspect-video bg-white/5 border-white/5 rounded-2xl overflow-hidden group relative cursor-pointer">
                        <img 
                          src={`https://picsum.photos/seed/vid${i}/400/225`} 
                          alt="Video Preview" 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                           <Play className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                           <Badge className="bg-black/60 text-[8px] font-black">0:0{i+4}</Badge>
                           <div className="flex gap-1">
                              <Button size="icon" variant="ghost" className="h-6 w-6 rounded-md bg-black/60 hover:bg-blue-600 transition-colors">
                                <Download className="w-3 h-3" />
                              </Button>
                              <Button size="icon" variant="ghost" className="h-6 w-6 rounded-md bg-black/60 hover:bg-rose-600 transition-colors">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                           </div>
                        </div>
                     </Card>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </DashboardLayout>
  )
}
