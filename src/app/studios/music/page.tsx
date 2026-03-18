
"use client"

import * as React from "react"
import DashboardLayout from "../../dashboard/layout"
import { 
  Music, 
  Sparkles, 
  Radio, 
  Mic2, 
  Play, 
  Settings2, 
  Youtube, 
  ExternalLink,
  ChevronRight,
  Plus,
  Zap,
  Library,
  Video,
  Loader2,
  Volume2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { generateAudio } from "@/ai/flows/audio-generation-flow"
import { cn } from "@/lib/utils"

const modes = [
  { id: 'studio', name: 'Studio Mode', desc: 'Manual composition control', icon: Music, active: true },
  { id: 'newscian', name: 'Newscian', desc: 'Political Rap / Truth-to-Power', icon: Radio },
  { id: 'sentinel', name: 'Midwest Sentinel', desc: 'Faith, Family, Boom Bap', icon: Mic2 },
  { id: 'neon', name: 'Neon Icon', desc: 'Viral Pop & Trends', icon: Zap },
  { id: 'mic', name: 'Mic (Manager)', desc: 'Strategy & Orchestration', icon: Settings2 },
]

export default function MusicStudioPage() {
  const [selectedMode, setSelectedMode] = React.useState('studio')
  const [script, setScript] = React.useState("")
  const [isSynthesizing, setIsSynthesizing] = React.useState(false)
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null)

  const handleSynthesize = async () => {
    if (!script.trim()) return
    setIsSynthesizing(true)
    try {
      const result = await generateAudio({ text: script, voice: 'Algenib' })
      setAudioUrl(result.audioUrl)
    } catch (error) {
      console.error("Synthesis failed:", error)
    } finally {
      setIsSynthesizing(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto py-6 space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/20">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-headline text-3xl font-black uppercase tracking-tight">SonicGen Hub</h1>
                <Badge variant="outline" className="border-rose-500/30 text-rose-500 text-[10px] font-black tracking-widest bg-rose-500/5">
                  NEURAL VOICE ACTIVE
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">Vocal Synthesis → Mastering → YouTube</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-6">
             <section className="space-y-3">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest px-2">Production Persona</p>
                <div className="space-y-1">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group",
                        selectedMode === mode.id 
                          ? "bg-purple-600/10 border-purple-600/40 ring-1 ring-purple-600/40" 
                          : "bg-white/5 border-transparent hover:bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                        selectedMode === mode.id ? "bg-purple-600 text-white" : "bg-white/5 text-muted-foreground group-hover:text-white"
                      )}>
                        <mode.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-tight">{mode.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-medium">{mode.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
             </section>
          </div>

          <div className="lg:col-span-6 space-y-6">
             <Card className="aspect-video bg-[#0c0c0e] border-white/5 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group border-dashed">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent)]" />
                {audioUrl ? (
                  <div className="z-10 flex flex-col items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center shadow-2xl animate-pulse">
                      <Volume2 className="w-10 h-10 text-white" />
                    </div>
                    <audio controls src={audioUrl} className="w-64" />
                    <Button variant="outline" size="sm" onClick={() => setAudioUrl(null)} className="text-[10px] uppercase font-black">Reset Output</Button>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                      <Music className="w-8 h-8 text-purple-600" />
                    </div>
                    <h2 className="font-headline text-3xl font-black mb-2 uppercase tracking-tighter">Composition Studio</h2>
                    <p className="text-xs text-muted-foreground font-medium max-w-[300px] text-center leading-relaxed">
                      Bridge established. Voice synthesis engine standing by.
                    </p>
                  </>
                )}
             </Card>

             <Card className="bg-white/5 border-white/5 p-8 rounded-3xl">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Neural Vocal Synthesis</h3>
                </div>
                <div className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Voiceover Script</label>
                     <Textarea 
                       value={script}
                       onChange={(e) => setScript(e.target.value)}
                       placeholder="Enter text to synthesize into a professional AI voiceover..." 
                       className="bg-black/40 border-white/5 h-32 rounded-xl focus:ring-purple-600/50 resize-none"
                     />
                   </div>
                   <Button 
                    onClick={handleSynthesize}
                    disabled={isSynthesizing || !script.trim()}
                    className="w-full h-14 bg-purple-600 hover:bg-purple-700 font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-purple-600/20"
                   >
                      {isSynthesizing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                      Synthesize Vocal <ChevronRight className="w-4 h-4 ml-2" />
                   </Button>
                </div>
             </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
             <Card className="bg-white/5 border-white/5 p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Global Distribution</h3>
                  <Library className="w-4 h-4 text-muted-foreground/30" />
                </div>
                <div className="grid gap-2">
                   {[
                     { name: 'YouTube Master', icon: Youtube, color: 'text-red-500' },
                     { name: 'Spotify Release', icon: Library, color: 'text-green-500' }
                   ].map(p => (
                     <button key={p.name} className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                        <div className="flex items-center gap-3">
                           <p.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", p.color)} />
                           <span className="text-[10px] font-black uppercase">{p.name}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/20 group-hover:text-white transition-colors" />
                     </button>
                   ))}
                </div>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
