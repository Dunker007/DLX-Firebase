"use client"

import * as React from "react"
import DashboardLayout from "../../dashboard/layout"
import { 
  FileText, 
  Sparkles, 
  BarChart, 
  Globe, 
  CheckCircle,
  Zap,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateBlogContent, type BlogContentOutput } from "@/ai/flows/blog-content-flow"

export default function BlogStudioPage() {
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [prompt, setPrompt] = React.useState("")
  const [tone, setTone] = React.useState<'technical' | 'professional' | 'creative' | 'minimal'>("technical")
  const [target, setTarget] = React.useState<'twitter' | 'medium' | 'newsletter' | 'whitepaper'>("medium")
  
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [keywords, setKeywords] = React.useState<string[]>([])
  const [stats, setStats] = React.useState({ wordCount: 0, readingTime: 0 })

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    try {
      const result = await generateBlogContent({ prompt, tone, target })
      setTitle(result.title)
      setContent(result.content)
      setKeywords(result.seoKeywords)
      setStats({ wordCount: result.wordCount, readingTime: result.readingTime })
    } catch (error) {
      console.error("Failed to generate content:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1600px] mx-auto py-6 space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-headline text-3xl font-black uppercase tracking-tight">CopyArchitect</h1>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 text-[10px] font-black tracking-widest bg-emerald-500/5">
                  V2.4 NEURAL ENGINE
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">SEO Optimized Technical Content Generation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="ghost" className="h-10 text-[10px] font-black uppercase">Drafts (12)</Button>
             <Button className="h-10 bg-emerald-600 hover:bg-emerald-700 font-black uppercase text-[10px] px-6 rounded-xl">
               Publish Now
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Card className="bg-[#0c0c0e] border-white/5 rounded-3xl p-10 min-h-[600px] flex flex-col relative">
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article Headline..." 
                className="bg-transparent border-none text-4xl font-black p-0 h-auto focus-visible:ring-0 placeholder:text-white/10 mb-8"
              />
              <Textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Start architectural drafting or use the generator on the right..." 
                className="flex-1 bg-transparent border-none text-lg font-medium p-0 focus-visible:ring-0 placeholder:text-white/5 resize-none leading-relaxed"
              />
              <div className="absolute bottom-6 right-6 flex items-center gap-4 text-[10px] font-black uppercase text-muted-foreground">
                <span>{stats.wordCount} Words</span>
                <span className="w-px h-3 bg-white/10" />
                <span>Reading time: {stats.readingTime} min</span>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-white/5 border-white/5 p-8 rounded-3xl space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Generation Hub</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground">Prompt / Abstract</label>
                    <Textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g. A deep dive into the 2024 AI chip landscape and NVIDIA's dominance..." 
                      className="bg-black/40 border-white/5 h-24 rounded-xl focus:ring-emerald-600/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-muted-foreground">Tone</label>
                      <Select value={tone} onValueChange={(v: any) => setTone(v)}>
                        <SelectTrigger className="bg-black/40 border-white/5 h-10 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1e] border-white/10">
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="minimal">Minimalist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-muted-foreground">Target</label>
                      <Select value={target} onValueChange={(v: any) => setTarget(v)}>
                        <SelectTrigger className="bg-black/40 border-white/5 h-10 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1e] border-white/10">
                          <SelectItem value="twitter">Thread</SelectItem>
                          <SelectItem value="medium">Medium Blog</SelectItem>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="whitepaper">Whitepaper</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 font-black uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-600/20"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                    Architect Content
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">SEO Blueprint</h3>
                </div>
                <div className="space-y-3">
                  {keywords.length > 0 ? keywords.slice(0, 4).map(kw => (
                    <div key={kw} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-[10px] font-black uppercase text-muted-foreground">{kw}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                  )) : ['Keyword Density', 'Readability Score', 'Link Integrity', 'Alt Text Status'].map(item => (
                    <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-[10px] font-black uppercase text-muted-foreground">{item}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500/30" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-widest">Distribution</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-10 border-white/5 bg-white/5 text-[10px] font-black uppercase rounded-xl">WordPress</Button>
                  <Button variant="outline" className="h-10 border-white/5 bg-white/5 text-[10px] font-black uppercase rounded-xl">Substack</Button>
                  <Button variant="outline" className="h-10 border-white/5 bg-white/5 text-[10px] font-black uppercase rounded-xl">LinkedIn</Button>
                  <Button variant="outline" className="h-10 border-white/5 bg-white/5 text-[10px] font-black uppercase rounded-xl">Webflow</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
