
"use client"

import * as React from "react"
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Settings2, 
  MessageSquare, 
  Users, 
  Sparkles, 
  MoreVertical,
  PhoneOff,
  LayoutGrid,
  Zap,
  Activity,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const participants = [
  { name: "Jane Doe (You)", role: "Architect", active: true, image: "https://picsum.photos/seed/user/100/100" },
  { name: "Lux AI", role: "Primary Intelligence", active: true, isAgent: true, image: "https://picsum.photos/seed/lux/100/100" },
  { name: "Architect AI", role: "Systems Design", active: false, isAgent: true, image: "https://picsum.photos/seed/architect/100/100" },
  { name: "Dev AI", role: "Code Implementation", active: true, isAgent: true, image: "https://picsum.photos/seed/dev/100/100" },
]

export default function MeetingStudioPage() {
  const [isMuted, setIsMuted] = React.useState(false)
  const [isVideoOff, setIsVideoOff] = React.useState(false)

  return (
    <div className="h-[calc(100vh-140px)] -m-6 flex flex-col overflow-hidden bg-[#050507]">
      {/* Meeting Header */}
      <header className="h-16 border-b border-white/5 bg-[#0a0a0c] flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/20">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline text-lg font-black uppercase tracking-tight">Meeting Studio</h1>
              <Badge variant="outline" className="border-rose-500/30 text-rose-500 text-[8px] font-black h-4 px-1.5 bg-rose-500/5 uppercase">
                Neural Sync Active
              </Badge>
            </div>
            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest leading-none mt-0.5">Topic: Q2 Infrastructure Scaling Brief</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">Recording Encrypted</span>
           </div>
           <Button variant="ghost" size="sm" className="h-9 text-[10px] font-black uppercase gap-2 hover:bg-white/5">
              <Users className="w-3.5 h-3.5" /> 4 Participants
           </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Grid: Video Feeds */}
        <main className="flex-1 p-6 overflow-hidden">
           <div className="grid grid-cols-2 h-full gap-4">
              {participants.map((p, i) => (
                <Card key={i} className="relative overflow-hidden bg-[#0a0a0c] border-white/5 group rounded-2xl">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.03),transparent)] pointer-events-none" />
                   
                   {/* Mock Video Feed */}
                   <div className="w-full h-full flex items-center justify-center">
                      {p.name.includes("You") && isVideoOff ? (
                        <div className="flex flex-col items-center gap-4">
                           <Avatar className="w-24 h-24 border-2 border-white/10">
                             <AvatarImage src={`/.netlify/images?url=${encodeURIComponent(p.image)}&w=100&fm=avif&q=80`} />
                             <AvatarFallback>JD</AvatarFallback>
                           </Avatar>
                           <p className="text-[10px] font-black uppercase text-muted-foreground">Camera Off</p>
                        </div>
                      ) : (
                        <img 
                          src={`/.netlify/images?url=https://picsum.photos/seed/meeting-${i}/1280/720&w=1280&fm=avif&q=80`}
                          srcSet={`/.netlify/images?url=https://picsum.photos/seed/meeting-${i}/1280/720&w=400&fm=avif&q=80 400w, /.netlify/images?url=https://picsum.photos/seed/meeting-${i}/1280/720&w=800&fm=avif&q=80 800w, /.netlify/images?url=https://picsum.photos/seed/meeting-${i}/1280/720&w=1200&fm=avif&q=80 1200w`}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          alt={p.name}
                          loading={i === 0 ? "eager" : "lazy"}
                          fetchpriority={i === 0 ? "high" : "auto"}
                          width={1280}
                          height={720}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                        />
                      )}
                   </div>

                   {/* Overlay Info */}
                   <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg flex items-center gap-2">
                         {p.isAgent && <Sparkles className="w-3 h-3 text-rose-500" />}
                         <span className="text-[10px] font-black uppercase text-white tracking-tight">{p.name}</span>
                         <span className="text-[8px] font-bold text-muted-foreground uppercase opacity-60">| {p.role}</span>
                      </div>
                   </div>

                   {/* Activity Status */}
                   {p.active && (
                     <div className="absolute top-4 right-4 h-6 w-6 rounded-full bg-rose-600/20 flex items-center justify-center border border-rose-600/30">
                        <Activity className="w-3 h-3 text-rose-600 animate-pulse" />
                     </div>
                   )}
                </Card>
              ))}
           </div>
        </main>

        {/* Sidebar: AI Notes & Chat */}
        <aside className="w-96 border-l border-white/5 bg-[#0a0a0c] flex flex-col shrink-0">
           <div className="h-12 border-b border-white/5 flex items-center justify-between px-6">
              <span className="text-[10px] font-black uppercase tracking-widest">Neural Briefing</span>
              <Badge variant="outline" className="text-[8px] font-black uppercase bg-rose-500/10 text-rose-500 border-none">Live Draft</Badge>
           </div>
           
           <ScrollArea className="flex-1 p-6">
              <div className="space-y-8">
                 <section className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-500">
                       <Zap className="w-4 h-4" />
                       <h3 className="text-[10px] font-black uppercase tracking-widest">Real-time Insights</h3>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                       <p className="text-[10px] font-medium leading-relaxed text-white/80">
                         <span className="font-black text-rose-500">Lux:</span> Mention of infrastructure scaling detected. Analyzing current server overhead for Q2 projection.
                       </p>
                       <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-600 w-1/3 animate-pulse" />
                       </div>
                    </div>
                 </section>

                 <section className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                       <FileText className="w-4 h-4" />
                       <h3 className="text-[10px] font-black uppercase tracking-widest">Key Takeaways</h3>
                    </div>
                    <div className="space-y-2">
                       {[
                         "Infrastructure bottleneck identified in Region-3",
                         "Architect AI proposing multi-cluster redundancy",
                         "Budget allocation for Nexus v2 approved"
                       ].map((note, i) => (
                         <div key={i} className="flex gap-3 p-3 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1" />
                            <p className="text-[10px] font-bold text-muted-foreground leading-tight uppercase tracking-tight">{note}</p>
                         </div>
                       ))}
                    </div>
                 </section>

                 <Card className="p-4 bg-rose-600/5 border-rose-500/20 border-dashed rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                       <Sparkles className="w-4 h-4 text-rose-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">AI Task Generation</span>
                    </div>
                    <p className="text-[9px] text-muted-foreground font-medium mb-4">Would you like me to create a Jira ticket for the infrastructure redundancy plan?</p>
                    <Button size="sm" className="w-full h-8 bg-rose-600 hover:bg-rose-700 text-[9px] font-black uppercase tracking-widest">Execute Creation</Button>
                 </Card>
              </div>
           </ScrollArea>

           {/* Call Controls */}
           <div className="p-6 border-t border-white/5 bg-[#0e0e11] flex items-center justify-center gap-4">
              <Button 
                onClick={() => setIsMuted(!isMuted)}
                variant="outline" 
                size="icon" 
                className={`h-12 w-12 rounded-full border-white/10 transition-all ${isMuted ? "bg-rose-600/20 text-rose-500 border-rose-500/30" : "bg-white/5 hover:bg-white/10"}`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                variant="outline" 
                size="icon" 
                className={`h-12 w-12 rounded-full border-white/10 transition-all ${isVideoOff ? "bg-rose-600/20 text-rose-500 border-rose-500/30" : "bg-white/5 hover:bg-white/10"}`}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-white/10 bg-white/5 hover:bg-white/10">
                <Settings2 className="w-5 h-5" />
              </Button>
              <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full shadow-lg shadow-rose-600/20">
                <PhoneOff className="w-5 h-5" />
              </Button>
           </div>
        </aside>
      </div>
    </div>
  )
}
