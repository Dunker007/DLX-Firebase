import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, PieChart, Music, FileText, Zap, ChevronRight, Video, BarChart3, Palette } from 'lucide-react';
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
  },
  {
    id: 'music-studio',
    title: 'SonicGen Hub',
    description: 'Neural soundscapes and composition with high-fidelity studio integration.',
    icon: Music,
    status: 'Live',
    image: PlaceHolderImages.find(img => img.id === 'studio-music')?.imageUrl,
    href: '/studios/music',
    color: 'hsl(var(--accent))'
  }
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Platform Status */}
      <section className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl bg-[#0a0a0c] border border-white/5">
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
           <Zap className="w-4 h-4 text-primary animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest">Neural Bridge: Active</span>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
           <Sparkles className="w-4 h-4 text-accent" />
           <span className="text-[10px] font-black uppercase tracking-widest">Model: Gemini 2.5 Flash</span>
        </div>
        <div className="flex-1" />
        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] px-4">LuxAI Enterprise Environment</span>
      </section>

      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-headline text-4xl font-black mb-2 tracking-tight uppercase">Featured Studios</h2>
            <p className="text-muted-foreground font-medium text-lg max-w-2xl leading-relaxed">Specialized intelligence environments optimized for high-performance financial and creative workflows.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="rounded-xl h-12 px-6 font-black uppercase text-xs" asChild>
              <Link href="/studios">Open All Hubs</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStudios.map((studio) => (
            <Card key={studio.id} className="group overflow-hidden border-white/5 bg-[#0a0a0c] hover:bg-card/60 transition-all duration-500 relative rounded-3xl">
              <div className="aspect-video relative overflow-hidden">
                <Image 
                  src={studio.image || ''} 
                  alt={studio.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                  data-ai-hint="abstract technology"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />
                <Badge 
                  className={`absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-black tracking-widest ${
                    studio.status === 'Live' ? 'bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]' : 
                    studio.status === 'Beta' ? 'bg-accent' : 'bg-muted text-muted-foreground'
                  }`}
                >
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
                <Button 
                  asChild 
                  variant="default"
                  className="w-full group/btn rounded-xl h-12 bg-white/5 hover:bg-primary border border-white/10 transition-all duration-300"
                >
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
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Intelligent Collaboration</span>
            </div>
            <h3 className="font-headline text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">Augment your workflow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Neural Personas.</span></h3>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-xl">
              Our specialized agents don't just chat—they architect systems, debug complex builds, and manage enterprise hospitality. Select a persona and start your session.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" asChild className="rounded-2xl bg-primary hover:bg-primary/90 h-14 px-8 font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
                <Link href="/chat">Launch Agent Chat</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-2xl border-white/10 h-14 px-8 font-black uppercase text-xs tracking-widest bg-white/5 hover:bg-white/10 transition-all">
                <Link href="/agents">Agent Hub</Link>
              </Button>
            </div>
          </div>
          <div className="flex -space-x-8 lg:-space-x-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-24 h-24 lg:w-32 lg:h-32 rounded-[2rem] border-4 border-[#0a0a0c] overflow-hidden relative shadow-2xl transition-transform hover:scale-110 hover:z-20 cursor-pointer">
                <Image 
                  src={`https://picsum.photos/seed/agent-persona-${i}/300/300`} 
                  alt={`Agent ${i}`}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
