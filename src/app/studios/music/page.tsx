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
  Volume2,
  Copy,
  CheckCircle2,
  ListMusic
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { generateAudio } from "@/ai/flows/audio-generation-flow"
import { cn } from "@/lib/utils"
import { useFirestore, useUser, useCollection } from "@/firebase"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const modes = [
  { id: 'suno-generator', name: 'Suno Prompt Generator', desc: 'Format lyrics for AI music generation', icon: ListMusic, active: true },
  { id: 'vocal-synth', name: 'Neural Voice Synthesis', desc: 'Generate spoken-word audio tracks', icon: Mic2 },
]

export default function MusicStudioPage() {
  const [selectedMode, setSelectedMode] = React.useState('suno-generator')
  const [script, setScript] = React.useState("")
  
  // Audio Synthesis State
  const [isSynthesizing, setIsSynthesizing] = React.useState(false)
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null)
  
  // Suno Generator State
  const { user } = useUser()
  const db = useFirestore()
  const [recentLyrics, setRecentLyrics] = React.useState<any[]>([])
  const [isCopied, setIsCopied] = React.useState(false)

  // Fetch recent lyrics from chat history when in Suno mode
  React.useEffect(() => {
    async function fetchRecentLyrics() {
      if (!user || !db || selectedMode !== 'suno-generator') return;
      
      const qplRef = collection(db, 'users', user.uid, 'ai_conversations', 'QPL', 'messages');
      const newsicianRef = collection(db, 'users', user.uid, 'ai_conversations', 'Newsician', 'messages');
      
      try {
        const [qplDocs, newsicianDocs] = await Promise.all([
          getDocs(query(qplRef, orderBy('timestamp', 'desc'), limit(10))),
          getDocs(query(newsicianRef, orderBy('timestamp', 'desc'), limit(10)))
        ]);

        const allDocs = [...qplDocs.docs, ...newsicianDocs.docs]
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((msg: any) => msg.senderType === 'ai' && msg.content.includes('[Intro]')) // Naive check for lyrics
          .sort((a: any, b: any) => b.timestamp - a.timestamp);

        setRecentLyrics(allDocs);
      } catch(e) {
        console.error("Error fetching lyrics", e);
      }
    }
    fetchRecentLyrics();
  }, [user, db, selectedMode]);

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

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(script);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
                <Badge variant="outline" className="border-purple-500/30 text-purple-500 text-[10px] font-black tracking-widest bg-purple-500/5">
                  STUDIO ACTIVE
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">Suno Prompting & Voice Synthesis</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 space-y-6">
             <section className="space-y-3">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest px-2">Studio Mode</p>
                <div className="space-y-2">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => {
                        setSelectedMode(mode.id);
                        setScript("");
                        setAudioUrl(null);
                      }}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group",
                        selectedMode === mode.id 
                          ? "bg-purple-600/10 border-purple-600/40 ring-1 ring-purple-600/40" 
                          : "bg-[#0a0a0c] border-white/5 hover:bg-white/5"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors border",
                        selectedMode === mode.id ? "bg-purple-600 text-white border-purple-500" : "bg-background border-white/5 text-muted-foreground group-hover:text-white"
                      )}>
                        <mode.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-tight">{mode.name}</h4>
                        <p className="text-[9px] text-muted-foreground font-bold uppercase mt-1 tracking-widest">{mode.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
             </section>
          </div>

          <div className="lg:col-span-6 space-y-6">
            {selectedMode === 'vocal-synth' ? (
              <>
                 <Card className="aspect-video bg-[#0c0c0e] border-white/5 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group border-dashed">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent)]" />
                    {audioUrl ? (
                      <div className="z-10 flex flex-col items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center shadow-2xl animate-pulse">
                          <Volume2 className="w-10 h-10 text-white" />
                        </div>
                        <audio controls src={audioUrl} className="w-64" />
                        <Button variant="outline" size="sm" onClick={() => setAudioUrl(null)} className="text-[10px] uppercase font-black border-white/10 hover:bg-white/5">Reset Output</Button>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl border border-white/5">
                          <Mic2 className="w-8 h-8 text-purple-600" />
                        </div>
                        <h2 className="font-headline text-2xl font-black mb-2 uppercase tracking-tighter">Vocal Synthesis Studio</h2>
                        <p className="text-xs text-muted-foreground font-medium max-w-[300px] text-center leading-relaxed">
                          Bridge established. Voice synthesis engine standing by.
                        </p>
                      </>
                    )}
                 </Card>

                 <Card className="bg-[#0a0a0c] border-white/5 p-8 rounded-3xl">
                    <div className="flex items-center gap-2 mb-6">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <h3 className="text-[10px] font-black uppercase tracking-widest">Text-to-Speech Engine</h3>
                    </div>
                    <div className="space-y-6">
                       <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Voiceover Script</label>
                         <Textarea 
                           value={script}
                           onChange={(e) => setScript(e.target.value)}
                           placeholder="Enter text to synthesize into a professional AI voiceover..." 
                           className="bg-[#111115] border-white/10 h-40 rounded-2xl focus:ring-purple-600/50 resize-none text-sm p-4"
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
              </>
            ) : (
              <Card className="bg-[#0a0a0c] border-white/5 p-8 rounded-3xl h-full min-h-[600px] flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center border border-purple-500/20">
                      <ListMusic className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-black uppercase tracking-tight">Suno Generator</h3>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-1">Format lyrics for production</p>
                    </div>
                  </div>
                  
                  <Select onValueChange={(val) => setScript(val)}>
                    <SelectTrigger className="w-[200px] h-10 bg-[#111115] border-white/10 rounded-xl text-xs font-bold">
                      <SelectValue placeholder="Load Recent Lyrics..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#111115] border-white/10">
                      {recentLyrics.length === 0 ? (
                        <SelectItem value="none" disabled>No recent lyrics found</SelectItem>
                      ) : (
                        recentLyrics.map((msg, i) => (
                          <SelectItem key={msg.id} value={msg.content} className="text-xs">
                            Draft {i + 1} ({new Date(msg.timestamp?.toDate()).toLocaleDateString()})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Production Script (Suno V5 Format)</label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleCopyPrompt}
                      disabled={!script.trim()}
                      className="h-8 text-[10px] font-black uppercase tracking-widest hover:bg-white/5"
                    >
                      {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 mr-2" />}
                      {isCopied ? 'Copied' : 'Copy Prompt'}
                    </Button>
                  </div>
                  <Textarea 
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="Paste or load a Newsician/QPL lyric sheet here. Make final edits, then copy to paste directly into Suno." 
                    className="flex-1 min-h-[300px] bg-[#111115] border-white/10 rounded-2xl focus:ring-purple-600/50 resize-none font-mono text-sm p-6 leading-relaxed"
                  />
                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => window.open('https://suno.com/create', '_blank')}
                      className="w-full h-12 bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest rounded-xl"
                    >
                      Open Suno.com <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10 font-black uppercase tracking-widest rounded-xl"
                    >
                      Send to Drive
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="lg:col-span-3 space-y-6">
             <Card className="bg-[#0a0a0c] border-white/5 p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Mic's Guidelines</h3>
                  <Settings2 className="w-4 h-4 text-muted-foreground/30" />
                </div>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-white/70 uppercase tracking-tight">1. Review Tags</p>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">Ensure [Voice 1] and [Intro] tags are clean before sending to Suno.</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-white/70 uppercase tracking-tight">2. Generate Audio</p>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">Let Suno handle the heavy lifting. Generate 2-3 variations.</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black text-white/70 uppercase tracking-tight">3. Visualizer</p>
                      <p className="text-xs text-muted-foreground font-medium leading-relaxed">Download final audio and move to the Video Studio for minimum viable visuals.</p>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
