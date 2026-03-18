
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, PieChart, Music, FileText, Zap, ChevronRight, Video } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const featuredStudios = [
  {
    id: 'smart-folio',
    title: 'DLX SmartFolio',
    description: 'AI-driven investment insights and portfolio risk analysis.',
    icon: PieChart,
    status: 'Live',
    image: PlaceHolderImages.find(img => img.id === 'studio-smartfolio')?.imageUrl,
    href: '/smart-folio',
    color: 'hsl(var(--primary))'
  },
  {
    id: 'music-studio',
    title: 'SonicGen Hub',
    description: 'Compose original music and soundscapes with neural generation.',
    icon: Music,
    status: 'Live',
    image: PlaceHolderImages.find(img => img.id === 'studio-music')?.imageUrl,
    href: '/studios/music',
    color: 'hsl(var(--accent))'
  },
  {
    id: 'video-studio',
    title: 'DLX Video (Veo)',
    description: 'Generate high-fidelity cinematic videos using Google Veo.',
    icon: Video,
    status: 'Beta',
    image: 'https://picsum.photos/seed/video-gen/600/400',
    href: '/studios/video',
    color: 'hsl(var(--primary))'
  }
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-headline text-4xl font-black mb-2 tracking-tight">Active Studios</h2>
            <p className="text-muted-foreground font-medium text-lg">Specialized intelligence tools for your creative and financial workflows.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="rounded-full" asChild>
              <Link href="/studios">Explore All</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredStudios.map((studio) => (
            <Card key={studio.id} className="group overflow-hidden border-white/5 bg-card/40 hover:bg-card/60 transition-all duration-300 relative">
              <div className="aspect-video relative overflow-hidden">
                <Image 
                  src={studio.image || ''} 
                  alt={studio.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint="abstract technology"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <Badge 
                  className={`absolute top-4 right-4 rounded-full px-3 py-1 font-bold ${
                    studio.status === 'Live' ? 'bg-primary neon-glow' : 
                    studio.status === 'Beta' ? 'bg-accent accent-glow' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {studio.status}
                </Badge>
              </div>
              <CardHeader className="relative -mt-12 pt-0 pb-2">
                <div className="w-14 h-14 rounded-2xl bg-background border border-white/5 flex items-center justify-center mb-4 shadow-xl group-hover:border-primary/30 transition-colors">
                  <studio.icon className="w-7 h-7" style={{ color: studio.color }} />
                </div>
                <CardTitle className="font-headline text-2xl font-bold">{studio.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-muted-foreground font-medium">{studio.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  asChild 
                  variant={studio.status === 'Coming Soon' ? 'ghost' : 'default'} 
                  disabled={studio.status === 'Coming Soon'}
                  className="w-full group/btn rounded-xl"
                >
                  <Link href={studio.href} className="flex items-center justify-center gap-2">
                    {studio.status === 'Coming Soon' ? 'Waitlist' : 'Enter Studio'}
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="glass-panel p-10 rounded-3xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-4">
            <h3 className="font-headline text-3xl font-black tracking-tight">Meet the Agents</h3>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              Don't work alone. Chat with our persona-driven AI agents specialized in architecture, development, and luxury hospitality.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild className="rounded-full bg-accent hover:bg-accent/90 accent-glow">
                <Link href="/chat">Open Agent Chat</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full border-white/10">
                <Link href="/agents">Manage Personas</Link>
              </Button>
            </div>
          </div>
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-20 rounded-full border-4 border-background overflow-hidden relative shadow-2xl">
                <Image 
                  src={`https://picsum.photos/seed/agent${i}/200/200`} 
                  alt={`Agent ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
