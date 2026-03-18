
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Sparkles, ExternalLink } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const newsItems = [
  {
    title: "LuxAI v2.4 Release: Neural Context Engines",
    date: "March 15, 2024",
    category: "Platform",
    excerpt: "We're introducing a new architecture for persona memory management, allowing for significantly longer and more coherent conversations.",
    image: PlaceHolderImages.find(img => img.id === 'news-update')?.imageUrl,
  },
  {
    title: "The Rise of Specialized LLMs in Finance",
    date: "March 12, 2024",
    category: "AI Research",
    excerpt: "New studies show that domain-specific fine-tuning outperforms general models like GPT-4 in niche investment strategy generation.",
    image: "https://picsum.photos/seed/finance-news/800/400",
  },
  {
    title: "Labs Update: SonicGen reaches 44.1kHz fidelity",
    date: "March 10, 2024",
    category: "Labs",
    excerpt: "Our experimental music studio can now generate CD-quality audio stems directly from text prompts with minimal latency.",
    image: "https://picsum.photos/seed/audio-news/800/400",
  }
];

export default function NewsPage() {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Newspaper className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-black tracking-tight">Intelligence Feed</h1>
          <p className="text-muted-foreground font-medium">Updates, research, and platform announcements.</p>
        </div>
      </div>

      <div className="space-y-10">
        {newsItems.map((item, i) => (
          <Card key={i} className="group overflow-hidden border-white/5 bg-card/40 hover:bg-card/60 transition-all cursor-pointer">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative aspect-video md:aspect-auto">
                <Image 
                  src={item.image || ''} 
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="secondary" className="bg-primary/20 text-primary font-bold">{item.category}</Badge>
                  <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{item.date}</span>
                </div>
                <CardTitle className="font-headline text-xl mb-3 group-hover:text-primary transition-colors">{item.title}</CardTitle>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6">
                  {item.excerpt}
                </p>
                <div className="flex items-center text-xs font-bold text-accent group-hover:underline uppercase tracking-widest">
                  Read Full Report <ExternalLink className="w-3 h-3 ml-2" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
