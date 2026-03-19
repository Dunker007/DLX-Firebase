"use client"

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FlaskConical, Plus, Search, Loader2 } from 'lucide-react';
import { useNexus } from '@/hooks/use-nexus';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function LabsPage() {
  const { data: labProjects, isLoading } = useNexus<any[]>('/projects');
  const [search, setSearch] = React.useState('');

  const filteredProjects = React.useMemo(() => {
    if (!labProjects) return [];
    return labProjects.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [labProjects, search]);

  // Removed hasMounted

  return (
    <div className="max-w-[1400px] mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h1 className="font-headline text-3xl font-black tracking-tight uppercase">Labs Hub</h1>
            <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Experimental feature roadmap & agent assignments</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 border-white/5 bg-white/5 text-[10px] font-black uppercase">
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : "Live Data Trace"}
          </Button>
          <Button variant="default" size="sm" className="h-9 bg-primary hover:bg-primary/90 text-[10px] font-black uppercase shadow-lg shadow-primary/20">Sync Matrix</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {["All", "Operations", "Intelligence", "Creation", "Capital"].map((filter, i) => (
            <Button 
              key={filter} 
              variant={i === 0 ? "default" : "outline"} 
              size="sm" 
              className={`h-8 rounded-full text-[10px] font-black uppercase px-4 ${i === 0 ? "bg-primary" : "border-white/5 bg-white/5"}`}
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roadmap..." 
            className="h-9 pl-9 bg-white/5 border-white/5 text-xs rounded-full" 
          />
        </div>
      </div>

      <div className="bg-card border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-[300px_1fr] border-b border-white/5 bg-white/5">
          <div className="p-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest border-r border-white/5">Project Stream</div>
          <div className="grid grid-cols-12">
            {months.map(m => (
              <div key={m} className="p-4 text-center text-[10px] font-black uppercase text-muted-foreground tracking-widest border-r border-white/5 last:border-r-0">
                {m}
              </div>
            ))}
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {filteredProjects.map((project, i) => (
            <div key={project.id} className="grid grid-cols-[300px_1fr] hover:bg-white/5 transition-colors group">
              <div className="p-4 border-r border-white/5 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    project.status === 'ACTIVE' ? 'bg-emerald-500' : 
                    project.status === 'PREVIEW' ? 'bg-orange-500' : 'bg-muted-foreground/30'
                  }`} />
                  <span className="text-xs font-black uppercase tracking-tight">{project.name}</span>
                </div>
                <p className="text-[9px] text-muted-foreground font-medium truncate opacity-60">{project.description}</p>
              </div>
              <div className="relative grid grid-cols-12 h-full">
                {months.map((_, mi) => (
                  <div key={mi} className="border-r border-white/[0.03] h-full last:border-r-0" />
                ))}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 h-6 rounded-full bg-primary/10 border border-primary/20 overflow-hidden"
                  style={{
                    left: `${(i * 12) % 60}%`,
                    width: `30%`
                  }}
                >
                  <div 
                    className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.4)] flex items-center justify-end px-3"
                    style={{ width: `${60 + (i * 5) % 40}%` }}
                  >
                    <span className="text-[8px] font-black text-white">SYNC_OK</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!isLoading && filteredProjects.length === 0 && (
            <div className="p-20 text-center text-muted-foreground/30 text-[10px] font-black uppercase tracking-widest">
              No experimental data in this sector.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}