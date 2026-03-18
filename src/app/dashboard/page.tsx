
"use client"

import * as React from "react"
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Music, 
  FileText, 
  Zap, 
  ChevronRight, 
  Video, 
  BarChart3, 
  Activity,
  Globe
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const featuredStudios = [
  {
    id: 'video-studio',
    title: 'Vids Production',
    description: 'Enterprise AI video editor for professional storyboarding and multi-scene creation.',
    icon: Video,
    status: 'Live',
    image: 'https://picsum.photos/seed/vids-editor/600/400',
    href: '/studios/video',
    color: 'hsl(217 91% 60%)'
  },
  {
    id: 'smart-folio',
    title: 'SmartFolio v3.0',
    description: 'AI-driven investment insights and enterprise portfolio risk analysis.',
    icon: BarChart3,
    status: 'Live',
    image: PlaceHolderImages.find(img => img.id === 'studio-smartfolio')?.imageUrl,
    href: '/smart-folio',
    color: 'hsl(var(--primary))'
  }
];

const neuralLogs = [
  { time: "14:42:01", type: "STUDIO", msg: "VisionaryAI: New branding asset synthesized (4K PNG)", color: "text-orange-500" },
  { time: "14:38:15", type: "TACTICAL", msg: "SmartFolio: Risk alert triggered on RENDER volatility", color: "text-blue-500" },
  { time: "14:30:00", type: "SYSTEM", msg: "Nexus: Neural bridge latency stabilized at 12ms", color: "text-emerald-500" },
  { time: "14:12:44", type: "MEETING", msg: "Meeting Studio: AI Participant 'Lux' generated Q2 Brief", color: "text-rose-500" },
];

export default function DashboardPage() {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Beta Status Banner */}
      <section className="relative overflow-hidden p-6 rounded-[2rem] bg-gradient-to-r from-primary/20 to-accent/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-primary/10 transition-colors duration-500" />
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="font-headline text-2xl font-black uppercase tracking-tight">Beta v0.1.0 Online</h2>
            <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-1 opacity-60">Nexus Neural OS • Enterprise Tier Active</p>
          </div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5 font-black uppercase text-[10px] tracking-widest px-4 h-8">System Nominal</Badge>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Matrix Sync: 100%</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-12">
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="font-headline text-4xl font-black mb-2 tracking-tight uppercase">Featured Studios</h2>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed">Specialized intelligence environments optimized for high-performance workflows.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredStudios.map((studio) => (
                <Card key={studio.id} className="group overflow-hidden border-white/5 bg-[#0a0a0c] hover:bg-card/60 transition-all duration-500 relative rounded-3xl">
                  <div className="aspect-video relative overflow-hidden">
                    <Image 
                      src={studio.image || ''} 
                      alt={studio.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />
                    <Badge className="absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-black tracking-widest bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                      {studio.status}
                    </Badge>
                  </div>
                  <CardHeader className="relative -mt-12 pt-0 pb-2">
                    <div className="w-14 h-14 rounded-2xl bg-[#0a0a0c] border border-white/10 flex items-center justify-center mb-4 shadow-2xl group-hover:border-primary/40 transition-colors">
                      <studio.icon className="w-7 h-7" style={{ color: studio.color }} />
                    </div>
                    <CardTitle className="font-headline text-2xl font-black tracking-tight uppercase">{studio.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed">{studio.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild variant="default" className="w-full group/btn rounded-xl h-12 bg-white/5 hover:bg-primary border border-white/10 transition-all duration-300">
                      <Link href={studio.href} className="flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest">
                        Enter Environment
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-[#0a0a0c] border border-white/5 p-12 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Active Collaboration</span>
                </div>
                <h3 className="font-headline text-4xl font-black tracking-tighter uppercase leading-tight">Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Meetings.</span></h3>
                <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-xl">
                  Our specialized agents don't just chat—they join your calls, draft live reports, and handle enterprise tasks in real-time.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" asChild className="rounded-2xl bg-primary hover:bg-primary/90 h-14 px-8 font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
                    <Link href="/dashboard/meeting">Enter Meeting Room</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
           <Card className="bg-[#0a0a0c] border-white/5 p-6 rounded-3xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest">Neural Activity</h3>
                 </div>
                 <Badge variant="outline" className="border-white/5 text-[8px] font-black opacity-40">REAL-TIME</Badge>
              </div>
              
              <div className="flex-1 space-y-6">
                 {neuralLogs.map((log, i) => (
                   <div key={i} className="space-y-2 group cursor-pointer">
                      <div className="flex items-center justify-between">
                         <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">{log.time}</span>
                         <span className={`text-[8px] font-black uppercase ${log.color}`}>{log.type}</span>
                      </div>
                      <p className="text-[10px] font-medium text-white/70 group-hover:text-white transition-colors leading-relaxed">
                        {log.msg}
                      </p>
                   </div>
                 ))}
              </div>

              <div className="pt-8 mt-8 border-t border-white/5">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                       <Globe className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black uppercase tracking-tight leading-none">Global Sync</h4>
                       <p className="text-[8px] text-muted-foreground font-black uppercase mt-1">Matrix v4.2.0</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" size="sm" className="h-8 border-white/5 bg-white/5 text-[8px] font-black uppercase">
                      <Link href="/dashboard/drive">Archive</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="h-8 border-white/5 bg-white/5 text-[8px] font-black uppercase">
                      <Link href="/dashboard/settings">Settings</Link>
                    </Button>
                 </div>
              </div>
           </Card>
        </aside>
      </div>
    </div>
  );
}
