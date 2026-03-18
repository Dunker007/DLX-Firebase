"use client"

import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '../dashboard/layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, PieChart, Music, FileText, Zap, ChevronRight, Video, LayoutGrid, Palette } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const studios = [
  {
    id: 'video-studio',
    title: 'Vids Production',
    description: 'Enterprise video storyboarder and production editor for professional storytelling.',
    icon: Video,
    status: 'Live',
    image: 'https://picsum.photos/seed/vids-studio/600/400',
    href: '/studios/video',
    color: 'hsl(217 91% 60%)'
  },
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
    id: 'content-studio',
    title: 'CopyArchitect',
    description: 'Advanced blog and technical content generation toolkit.',
    icon: FileText,
    status: 'Live',
    image: PlaceHolderImages.find(img => img.id === 'studio-blog')?.imageUrl,
    href: '/studios/blog',
    color: 'hsl(142 70% 45%)'
  },
  {
    id: 'art-studio',
    title: 'VisionaryAI',
    description: 'Generative image and branding assets for modern teams.',
    icon: Palette,
    status: 'Live',
    image: 'https://picsum.photos/seed/art-studio/600/400',
    href: '/studios/art',
    color: 'hsl(24 95% 53%)'
  }
];

export default function StudiosHubPage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-12 py-6">
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <LayoutGrid className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-headline text-4xl font-black tracking-tight uppercase">Studios Hub</h1>
                <p className="text-muted-foreground font-medium text-lg uppercase tracking-widest text-[10px] font-black">Your gateway to specialized intelligence tools</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studios.map((studio) => (
              <Card key={studio.id} className="group overflow-hidden border-white/5 bg-card/40 hover:bg-card/60 transition-all duration-500 relative rounded-3xl">
                <div className="aspect-video relative overflow-hidden">
                  <Image 
                    src={studio.image || ''} 
                    alt={studio.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <Badge 
                    className={`absolute top-4 right-4 rounded-full px-3 py-1 font-black text-[10px] tracking-widest ${
                      studio.status === 'Live' ? 'bg-primary neon-glow' : 
                      studio.status === 'Beta' ? 'bg-accent accent-glow' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {studio.status}
                  </Badge>
                </div>
                <CardHeader className="relative -mt-8 pt-0 pb-2">
                  <div className="w-12 h-12 rounded-xl bg-background border border-white/10 flex items-center justify-center mb-4 shadow-xl group-hover:border-primary/30 transition-colors">
                    <studio.icon className="w-6 h-6" style={{ color: studio.color }} />
                  </div>
                  <CardTitle className="font-headline text-xl font-black uppercase tracking-tight">{studio.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-muted-foreground text-xs font-medium h-10 overflow-hidden leading-relaxed">{studio.description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button 
                    asChild 
                    variant={studio.status === 'Coming Soon' ? 'ghost' : 'default'} 
                    disabled={studio.status === 'Coming Soon'}
                    className="w-full group/btn rounded-xl bg-white/5 hover:bg-primary transition-all duration-300 border border-white/10"
                  >
                    <Link href={studio.href} className="flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest">
                      {studio.status === 'Coming Soon' ? 'Access Restricted' : 'Enter Studio'}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}