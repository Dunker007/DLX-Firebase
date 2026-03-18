
"use client"

import * as React from "react"
import { 
  HardDrive, 
  Search, 
  FileText, 
  ImageIcon, 
  Video, 
  Music, 
  MoreVertical, 
  Download,
  Trash2,
  Share2,
  FolderOpen
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const files = [
  { name: "Brand_Guidelines_v2.png", size: "4.2 MB", type: "IMAGE", date: "2 mins ago", icon: ImageIcon, color: "text-orange-500" },
  { name: "Investor_Brief_Q2.pdf", size: "1.2 MB", type: "DOC", date: "1 hour ago", icon: FileText, color: "text-blue-500" },
  { name: "Social_Promo_Final.mp4", size: "48.5 MB", type: "VIDEO", date: "Yesterday", icon: Video, color: "text-rose-500" },
  { name: "Podcast_Voiceover.wav", size: "12.8 MB", type: "AUDIO", date: "2 days ago", icon: Music, color: "text-purple-500" },
]

export default function DrivePage() {
  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <HardDrive className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <h1 className="font-headline text-3xl font-black uppercase tracking-tight">Neural Drive</h1>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Unified Multi-Studio Asset Storage</p>
          </div>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="Search assets..." className="pl-9 h-10 bg-white/5 border-white/10 text-xs rounded-xl" />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-[#0a0a0c] border-white/5 overflow-hidden rounded-3xl">
           <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest">Recent Synthesis</span>
              <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase">View All</Button>
           </div>
           <div className="divide-y divide-white/5">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group">
                   <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 ${file.color}`}>
                      <file.icon className="w-5 h-5" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{file.size} • {file.date}</p>
                   </div>
                   <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Download className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><Share2 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-rose-500"><Trash2 className="w-4 h-4" /></Button>
                   </div>
                </div>
              ))}
           </div>
        </Card>

        <Card className="bg-[#0a0a0c] border-white/5 p-6 rounded-3xl space-y-6">
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Storage Matrix</p>
              <div className="flex flex-col items-center justify-center py-8">
                 <div className="w-32 h-32 rounded-full border-8 border-cyan-500/20 border-t-cyan-500 flex items-center justify-center relative">
                    <div className="text-center">
                       <p className="text-2xl font-black">42%</p>
                       <p className="text-[8px] font-black uppercase text-muted-foreground">Utilized</p>
                    </div>
                 </div>
              </div>
           </div>
           <div className="space-y-3">
              {[
                { label: "Images", size: "12.4 GB", color: "bg-orange-500" },
                { label: "Video", size: "8.2 GB", color: "bg-rose-500" },
                { label: "Models", size: "2.1 GB", color: "bg-cyan-500" },
              ].map(item => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-tight">
                    <span>{item.label}</span>
                    <span className="text-muted-foreground">{item.size}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: '40%' }} />
                  </div>
                </div>
              ))}
           </div>
           <Button className="w-full h-12 bg-cyan-600 hover:bg-cyan-700 text-[10px] font-black uppercase tracking-widest rounded-xl">Upgrade Drive</Button>
        </Card>
      </div>
    </div>
  )
}
