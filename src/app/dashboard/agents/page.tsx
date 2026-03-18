
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot, Sparkles, Settings2, Trash2, Edit2, PlayCircle } from 'lucide-react';

const agentList = [
  {
    name: "Lux",
    role: "System Host",
    status: "Live",
    interactions: 1240,
    engine: "Gemini 1.5 Pro",
    image: "https://picsum.photos/seed/lux/200/200"
  },
  {
    name: "Architect",
    role: "Design Lead",
    status: "Live",
    interactions: 850,
    engine: "Gemini 1.5 Pro",
    image: "https://picsum.photos/seed/arch/200/200"
  },
  {
    name: "Dev",
    role: "Core Engineer",
    status: "Beta",
    interactions: 2100,
    engine: "Gemini 1.5 Flash",
    image: "https://picsum.photos/seed/dev/200/200"
  }
];

export default function AgentsHubPage() {
  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-headline text-3xl font-black tracking-tight">Agent Hub</h1>
            <p className="text-muted-foreground font-medium">Manage and configure your custom AI personas.</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 neon-glow rounded-full px-6 font-bold h-11">
          <Sparkles className="w-4 h-4 mr-2" /> Create New Persona
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {agentList.map((agent, i) => (
          <Card key={i} className="border-white/5 bg-card/40 overflow-hidden group">
            <CardHeader className="relative h-24 bg-gradient-to-br from-primary/20 to-transparent">
              <Badge className={`absolute top-4 right-4 rounded-full px-2 py-0.5 text-[10px] font-black tracking-widest ${
                agent.status === 'Live' ? 'bg-green-500' : 'bg-accent'
              }`}>
                {agent.status.toUpperCase()}
              </Badge>
              <Avatar className="w-16 h-16 absolute -bottom-8 left-6 border-4 border-background ring-1 ring-white/5">
                <AvatarImage src={agent.image} />
                <AvatarFallback>{agent.name[0]}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="pt-12 pb-6">
              <div className="mb-6">
                <h3 className="font-headline text-xl font-bold">{agent.name}</h3>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{agent.role}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-background/40 border border-white/5">
                  <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Total Logs</p>
                  <p className="text-lg font-bold">{agent.interactions}</p>
                </div>
                <div className="p-3 rounded-xl bg-background/40 border border-white/5">
                  <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Core Engine</p>
                  <p className="text-xs font-bold truncate">{agent.engine}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" className="flex-1 rounded-lg">
                  <PlayCircle className="w-4 h-4 mr-2" /> Chat
                </Button>
                <Button size="icon" variant="outline" className="border-white/10 rounded-lg">
                  <Settings2 className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="outline" className="border-white/10 rounded-lg hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center p-10 text-center hover:bg-white/5 transition-colors cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Bot className="w-8 h-8 text-muted-foreground/30" />
          </div>
          <h3 className="font-headline text-lg font-bold text-muted-foreground mb-2">Deploy New Agent</h3>
          <p className="text-xs text-muted-foreground/50 font-medium">Define capabilities, personality, and knowledge bases.</p>
        </Card>
      </div>
    </div>
  )
}
