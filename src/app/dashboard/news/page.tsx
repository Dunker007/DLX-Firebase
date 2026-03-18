
"use client"

import * as React from 'react';
import Image from 'next/image';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, ExternalLink, Loader2 } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';

export default function NewsPage() {
  const db = useFirestore();
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  
  const newsQuery = useMemoFirebase(() => {
    if (!db || !hasMounted) return null;
    return query(collection(db, 'news_articles'), orderBy('publishDate', 'desc'), limit(10));
  }, [db, hasMounted]);

  const { data: newsItems, isLoading } = useCollection(newsQuery);

  if (!hasMounted) return null;

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Newspaper className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h1 className="font-headline text-3xl font-black tracking-tight uppercase">Intelligence Feed</h1>
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Grounded platform updates & AI research reports</p>
        </div>
      </div>

      <div className="space-y-10">
        {(isLoading || !newsItems) && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Syncing News Feed...</p>
          </div>
        )}

        {!isLoading && newsItems?.map((item) => (
          <Card key={item.id} className="group overflow-hidden border-white/5 bg-[#0a0a0c]/40 hover:bg-[#0a0a0c]/60 transition-all cursor-pointer rounded-3xl">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative aspect-video md:aspect-auto overflow-hidden">
                <Image 
                  src={`https://picsum.photos/seed/${item.id}/800/400`} 
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
              </div>
              <div className="flex-1 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="outline" className="border-accent/30 text-accent font-black text-[9px] uppercase tracking-widest">{item.category || 'Platform'}</Badge>
                  <span className="text-[9px] text-muted-foreground font-black uppercase tracking-widest">
                    {item.publishDate ? new Date(item.publishDate).toLocaleDateString() : 'Pending'}
                  </span>
                </div>
                <CardTitle className="font-headline text-2xl font-black mb-4 group-hover:text-accent transition-colors tracking-tight uppercase leading-tight">{item.title}</CardTitle>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 opacity-80">
                  {item.content.length > 150 ? item.content.substring(0, 150) + '...' : item.content}
                </p>
                <div className="flex items-center text-[10px] font-black text-accent group-hover:underline uppercase tracking-[0.2em]">
                  Read Full Signal <ExternalLink className="w-3.5 h-3.5 ml-2" />
                </div>
              </div>
            </div>
          </Card>
        ))}

        {!isLoading && newsItems?.length === 0 && (
          <div className="text-center p-20 border-2 border-dashed border-white/5 rounded-[3rem]">
            <Newspaper className="w-12 h-12 text-muted-foreground/10 mx-auto mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">No news signals detected in the matrix.</p>
          </div>
        )}
      </div>
    </div>
  )
}
