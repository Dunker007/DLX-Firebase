
"use client"

import * as React from "react"
import DashboardLayout from "../../dashboard/layout"
import { 
  Zap, 
  Sparkles, 
  Palette, 
  Download, 
  Trash2, 
  LayoutGrid, 
  Eye,
  Layers,
  Maximize2,
  ChevronRight,
  Monitor
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ArtStudioPage() {
  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto py-6 space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/20">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-headline text-3xl font-black uppercase tracking-tight">VisionaryAI</h1>
                <Badge variant="outline" className="border-orange-500/30 text-orange-500 text-[10px] font-black tracking-widest bg-orange-500/5">
                  IMAGEN 4.0 ACTIVE
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">Generative Image & Branding Asset Synthesis</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase font-black">Daily Usage</p>
                <p className="text-xs font-black">42 / 100 <span className="text-muted-foreground text-[10px]">renders</span></p>
             </div>
             <Button className="h-10 bg-orange-600 hover:bg-orange-700 font-black uppercase text-[10px] px-6 rounded-xl">
               Upgrade Studio
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-white/5 border-white/5 p-8 rounded-3xl space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Image Synthesis</h3>
                </div>
                <div className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-muted-foreground">Master Prompt</label>
                     <Textarea 
                       placeholder="A cyberpunk interior with bioluminescent plants, cinematic lighting, 8k resolution..." 
                       className="bg-black/40 border-white/5 h-32 rounded-xl focus:ring-orange-600/50"
                     />
                   </div>
                   
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black uppercase text-muted-foreground">Dimension Ratio</label>
                        <span className="text-[10px] font-bold">1024 x 1024</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {['1:1', '16:9', '4:5'].map(r => (
                          <button key={r} className="h-10 rounded-lg border border-white/5 bg-white/5 text-[10px] font-black hover:border-orange-500/30">
                            {r}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black uppercase text-muted-foreground">Guidance Scale</label>
                        <span className="text-[10px] font-bold text-orange-500">7.5</span>
                      </div>
                      <Slider defaultValue={[7.5]} max={20} min={1} step={0.5} />
                   </div>

                   <div className="space-y-4 pt-2">
                     <label className="text-[10px] font-black uppercase text-muted-foreground">Rendering Engine</label>
                     <Select defaultValue="photoreal">
                        <SelectTrigger className="bg-black/40 border-white/5 h-12 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1e] border-white/10">
                          <SelectItem value="photoreal">Photo-Realistic</SelectItem>
                          <SelectItem value="anime">Anime / Manga</SelectItem>
                          <SelectItem value="painting">Oil Painting</SelectItem>
                          <SelectItem value="3d">3D Render (Unreal)</SelectItem>
                        </SelectContent>
                     </Select>
                   </div>
                </div>
                <Button className="w-full h-14 bg-orange-600 hover:bg-orange-700 font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-600/20 mt-8">
                  Render Assets <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Viewport Panel */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="aspect-[16/10] bg-[#0c0c0e] border-white/5 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group border-dashed">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.05),transparent)]" />
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Monitor className="w-8 h-8 text-orange-600/50" />
              </div>
              <h2 className="font-headline text-2xl font-black mb-2 uppercase tracking-tight text-white/40">Visualizer Monitor</h2>
              <p className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-widest">Awaiting neural feedback</p>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-[10px] font-black uppercase tracking-widest">Recent Captures</h3>
                 <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase">Archive</Button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                 {[1, 2, 3, 4].map(i => (
                   <Card key={i} className="aspect-square bg-white/5 border-white/5 rounded-2xl overflow-hidden group relative cursor-pointer">
                      <img 
                        src={`https://picsum.photos/seed/art${i}/400/400`} 
                        alt="Art Preview" 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 gap-2">
                         <Button size="icon" className="h-8 w-8 bg-orange-600 rounded-lg"><Eye className="w-4 h-4" /></Button>
                         <Button size="icon" className="h-8 w-8 bg-white/10 rounded-lg"><Download className="w-4 h-4" /></Button>
                      </div>
                   </Card>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
