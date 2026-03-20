"use client"

import * as React from "react"
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  ChevronRight, 
  Video, 
  BarChart3, 
  Activity,
  Globe,
  Zap,
  LayoutGrid
} from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const featuredStudios = [
  {
    id: 'video-studio',
    title: 'Vids Production',
    description: 'Enterprise AI video production editor with scene storyboard integration.',
    icon: Video,
    status: 'Live',
    image: 'https://picsum.photos/seed/vids-editor/600/400',
    href: '/studios/video',
    color: 'hsl(217 91% 60%)'
  },
  {
    id: 'smart-folio',
    title: 'SmartFolio v3.0',
    description: 'Advanced financial parsing and aggressive growth tactical insights.',
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
    <div className="max-w-7xl mx-auto space-y-12 pb-12">
      <section className="relative overflow-hidden p-8 rounded-[2.5rem] bg-gradient-to-r from-primary/20 to-accent/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-primary/20 transition-all duration-1000" />
        <div className="flex items-center gap-8 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 ring-4 ring-white/5">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="font-headline text-3xl font-black uppercase tracking-tight">Beta v0.1.0 Hub</h2>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.4em] mt-1 opacity-60">Nexus Neural OS • Enterprise Access Established</p>
          </div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <Badge variant="outline" className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5 font-black uppercase text-[10px] tracking-widest px-6 h-10">Secure Sync: OK</Badge>
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
            <Activity className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Live Trace</span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-12">
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="font-headline text-4xl font-black mb-3 tracking-tighter uppercase">Featured Studios</h2>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-2xl">Specialized synthesis environments optimized for high-performance creative and financial workflows.</p>
              </div>
              <Button asChild variant="ghost" className="text-[10px] font-black uppercase tracking-widest gap-2">
                <Link href="/studios">View All <LayoutGrid className="w-4 h-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredStudios.map((studio) => (
                <Card key={studio.id} className="group overflow-hidden border-white/5 bg-[#0a0a0c] hover:bg-card/60 transition-all duration-500 relative rounded-[2rem]">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={`/.netlify/images?url=${encodeURIComponent(studio.image || '')}&w=800&fm=avif&q=80`}
                      srcSet={`/.netlify/images?url=${encodeURIComponent(studio.image || '')}&w=400&fm=avif&q=80 400w, /.netlify/images?url=${encodeURIComponent(studio.image || '')}&w=800&fm=avif&q=80 800w, /.netlify/images?url=${encodeURIComponent(studio.image || '')}&w=1200&fm=avif&q=80 1200w`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={studio.title}
                      loading="lazy"
                      width={800}
                      height={450}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent" />
                    <Badge className="absolute top-4 right-4 rounded-full px-4 py-1.5 text-[10px] font-black tracking-widest bg-primary shadow-2xl">
                      {studio.status}
                    </Badge>
                  </div>
                  <CardHeader className="relative -mt-16 pt-0 pb-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#0a0a0c] border border-white/10 flex items-center justify-center mb-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:border-primary/40 transition-colors">
                      <studio.icon className="w-8 h-8" style={{ color: studio.color }} />
                    </div>
                    <CardTitle className="font-headline text-2xl font-black tracking-tight uppercase leading-none">{studio.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed opacity-80">{studio.description}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild variant="default" className="w-full group/btn rounded-2xl h-14 bg-white/5 hover:bg-primary border border-white/10 transition-all duration-500">
                      <Link href={studio.href} className="flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-[0.2em]">
                        Establish Connection
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-[#0a0a0c] border border-white/10 p-12 rounded-[3rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none group-hover:bg-accent/10 transition-colors duration-1000" />
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-accent">Real-Time Synthesis</span>
                </div>
                <h3 className="font-headline text-5xl font-black tracking-tighter uppercase leading-[0.9]">Collaborative <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Intelligence.</span></h3>
                <p className="text-muted-foreground text-xl font-medium leading-relaxed max-w-xl">
                  Our grounded personas don't just chat—they integrate with your studios to generate live reports, mastered audio, and cinematic storyboards in real-time.
                </p>
                <div className="flex flex-wrap gap-6 pt-4">
                  <Button size="lg" asChild className="rounded-2xl bg-primary hover:bg-primary/90 h-16 px-10 font-black uppercase text-xs tracking-widest shadow-2xl shadow-primary/30">
                    <Link href="/dashboard/meeting" className="flex items-center gap-3">
                      Enter Meeting Studio <Zap className="w-4 h-4 fill-current" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
           <Card className="bg-[#0a0a0c] border-white/10 p-8 rounded-[2.5rem] h-full flex flex-col shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-primary" />
                    <h3 className="text-[11px] font-black uppercase tracking-widest">Neural Logs</h3>
                 </div>
                 <Badge variant="outline" className="border-white/5 text-[9px] font-black opacity-50 px-3 py-1">REAL-TIME</Badge>
              </div>
              
              <div className="flex-1 space-y-8">
                 {neuralLogs.map((log, i) => (
                   <div key={i} className="space-y-3 group cursor-pointer">
                      <div className="flex items-center justify-between">
                         <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{log.time}</span>
                         <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/5 ${log.color}`}>{log.type}</span>
                      </div>
                      <p className="text-xs font-medium text-white/70 group-hover:text-white transition-colors leading-relaxed border-l-2 border-transparent group-hover:border-primary pl-4">
                        {log.msg}
                      </p>
                   </div>
                 ))}
              </div>

              <div className="pt-10 mt-10 border-t border-white/5">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                       <Globe className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                       <h4 className="text-[11px] font-black uppercase tracking-tight leading-none">Global Network</h4>
                       <p className="text-[9px] text-muted-foreground font-black uppercase mt-1.5 opacity-60">Nexus Grid v4.2.0</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <Button asChild variant="outline" size="sm" className="h-10 border-white/10 bg-white/5 text-[10px] font-black uppercase rounded-xl hover:bg-white/10">
                      <Link href="/dashboard/drive">Drive</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="h-10 border-white/10 bg-white/5 text-[10px] font-black uppercase rounded-xl hover:bg-white/10">
                      <Link href="/dashboard/settings">Protocols</Link>
                    </Button>
                 </div>
              </div>
           </Card>
        </aside>
      </div>
    </div>
  );
}