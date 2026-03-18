
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FlaskConical, Plus, Search, LayoutGrid, ListFilter, Calendar } from 'lucide-react';

const projectRoadmap = [
  { name: "Nexus Implementation Plan", status: "ACTIVE", start: 0, duration: 100, progress: 100, category: "Operations" },
  { name: "AI Staff Meeting", status: "ACTIVE", start: 20, duration: 30, progress: 85, category: "Operations" },
  { name: "Voice Command", status: "ACTIVE", start: 20, duration: 40, progress: 90, category: "Intelligence" },
  { name: "Automation Lab", status: "ACTIVE", start: 25, duration: 35, progress: 80, category: "Creation" },
  { name: "Smart Home Control", status: "ACTIVE", start: 25, duration: 75, progress: 65, category: "Operations" },
  { name: "Analytics Hub", status: "ACTIVE", start: 40, duration: 40, progress: 45, category: "Capital" },
  { name: "Knowledge Base", status: "PREVIEW", start: 45, duration: 45, progress: 20, category: "Intelligence" },
  { name: "Data Weave", status: "ACTIVE", start: 55, duration: 25, progress: 10, category: "Intelligence" },
  { name: "Music Studio", status: "ACTIVE", start: 85, duration: 15, progress: 70, category: "Creation" },
  { name: "Agent Forge", status: "PREVIEW", start: 40, duration: 40, progress: 30, category: "Intelligence" },
  { name: "Code Generator", status: "ACTIVE", start: 10, duration: 30, progress: 75, category: "Creation" },
  { name: "Vision Lab", status: "CONCEPT", start: 60, duration: 30, progress: 5, category: "Creation" },
  { name: "SmartFolio", status: "ACTIVE", start: 45, duration: 55, progress: 95, category: "Capital" },
  { name: "Passive Income", status: "ACTIVE", start: 20, duration: 70, progress: 60, category: "Capital" },
  { name: "Crypto Lab", status: "ACTIVE", start: 45, duration: 35, progress: 30, category: "Capital" },
  { name: "AURA Interface", status: "CONCEPT", start: 70, duration: 30, progress: 0, category: "Intelligence" },
  { name: "PC Optimizer", status: "CONCEPT", start: 50, duration: 40, progress: 0, category: "Experimental" },
  { name: "LLM Lab", status: "CONCEPT", start: 50, duration: 40, progress: 0, category: "Experimental" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function LabsPage() {
  return (
    <div className="max-w-[1400px] mx-auto py-6 space-y-8">
      {/* Header */}
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
          <Button variant="outline" size="sm" className="h-9 border-white/5 bg-white/5 text-[10px] font-black uppercase">Static Data</Button>
          <Button variant="default" size="sm" className="h-9 bg-cyan-600 hover:bg-cyan-700 text-[10px] font-black uppercase shadow-lg shadow-cyan-600/20">Sync to OS</Button>
          <div className="flex items-center border border-white/5 bg-white/5 rounded-lg p-1">
             <Button variant="ghost" size="icon" className="h-7 w-7"><LayoutGrid className="w-3.5 h-3.5" /></Button>
             <Button variant="ghost" size="icon" className="h-7 w-7 bg-background"><ListFilter className="w-3.5 h-3.5" /></Button>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {["All", "Operations", "Intelligence", "Creation", "Capital", "Experimental"].map((filter, i) => (
            <Button 
              key={filter} 
              variant={i === 0 ? "default" : "outline"} 
              size="sm" 
              className={`h-8 rounded-full text-[10px] font-black uppercase px-4 ${i === 0 ? "bg-cyan-600" : "border-white/5 bg-white/5"}`}
            >
              {filter}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input 
              placeholder="Search labs..." 
              className="h-9 pl-9 bg-white/5 border-white/5 text-xs rounded-full focus-visible:ring-cyan-600/50" 
            />
          </div>
          <Button size="sm" className="h-9 bg-purple-600 hover:bg-purple-700 text-[10px] font-black uppercase rounded-full px-6 shadow-lg shadow-purple-600/20">
            <Plus className="w-4 h-4 mr-1.5" /> New Idea
          </Button>
        </div>
      </div>

      {/* Gantt Chart Roadmap */}
      <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-[300px_1fr] border-b border-white/5">
          <div className="p-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest border-r border-white/5">Project</div>
          <div className="grid grid-cols-12">
            {months.map(m => (
              <div key={m} className="p-4 text-center text-[10px] font-black uppercase text-muted-foreground tracking-widest border-r border-white/5 last:border-r-0">
                {m}
              </div>
            ))}
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {projectRoadmap.map((project, i) => (
            <div key={i} className="grid grid-cols-[300px_1fr] hover:bg-white/5 transition-colors group">
              <div className="p-4 border-r border-white/5 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    project.status === 'ACTIVE' ? 'bg-cyan-500' : 
                    project.status === 'PREVIEW' ? 'bg-orange-500' : 'bg-muted-foreground/30'
                  }`} />
                  <span className="text-xs font-black uppercase tracking-tight">{project.name}</span>
                </div>
                <Badge variant="outline" className="w-fit text-[8px] font-black py-0 h-4 border-white/10 uppercase tracking-tighter">
                  {project.status}
                </Badge>
              </div>
              <div className="relative grid grid-cols-12 h-full">
                {/* Vertical Grid Lines */}
                {months.map((_, mi) => (
                  <div key={mi} className="border-r border-white/[0.03] h-full last:border-r-0" />
                ))}
                
                {/* Timeline Bar */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 h-6 rounded-full bg-cyan-900/20 border border-cyan-500/20 overflow-hidden"
                  style={{
                    left: `${project.start}%`,
                    width: `${project.duration}%`
                  }}
                >
                  <div 
                    className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-end px-3"
                    style={{ width: `${project.progress}%` }}
                  >
                    {project.progress > 10 && (
                      <span className="text-[8px] font-black text-black">{project.progress}%</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground px-2">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-cyan-500" /> <span>Active</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-orange-500" /> <span>Preview</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-muted-foreground/30" /> <span>Concept</span>
           </div>
        </div>
        <div>18 projects — Click to open</div>
      </div>
    </div>
  );
}
