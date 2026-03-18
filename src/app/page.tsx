import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.1),transparent_50%)]">
      <nav className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center neon-glow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tighter">LuxAI</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Sign In</Link>
          <Button asChild className="bg-primary hover:bg-primary/90 neon-glow rounded-full px-6">
            <Link href="/dashboard">Enter Nexus</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center max-w-6xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2 duration-700">
          <Zap className="w-3 h-3" />
          Beta v0.1.0 Online
        </div>
        <h1 className="font-headline text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-white uppercase">
          Neural OS for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI Studios.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-12 font-medium leading-relaxed">
          The unified platform for specialized intelligence. Orchestrate storyboards, financial tactics, and neural content generation with grounded AI agents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 neon-glow" asChild>
            <Link href="/dashboard" className="flex items-center gap-2 uppercase font-black tracking-widest">
              Establish Link <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-white/10 hover:bg-white/5 uppercase font-black tracking-widest">
            Protocol Docs
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { icon: ShieldCheck, title: "Neural Encryption", desc: "Enterprise-grade data isolation for sensitive portfolio and chat intelligence." },
            { icon: Globe, title: "Multi-Agent Matrix", desc: "Specialized personas (Lux, Architect, Dev) grounded in real-time platform signals." },
            { icon: Sparkles, title: "Studio Synthesis", desc: "Advanced GenAI pipelines for high-fidelity video, audio, and technical content." }
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl text-left hover:border-primary/40 transition-all group">
              <feature.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="font-headline text-xl font-bold mb-3 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-muted-foreground font-black uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-primary" />
          </div>
          <span>&copy; 2024 LuxAI Neural OS. Terminal v0.1.0</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="#" className="hover:text-primary transition-colors">Neural Terms</Link>
          <Link href="#" className="hover:text-primary transition-colors">Privacy Protocol</Link>
          <Link href="#" className="hover:text-primary transition-colors">Nexus Signal</Link>
        </div>
      </footer>
    </div>
  );
}