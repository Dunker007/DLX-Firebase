
"use client"

import * as React from "react"
import { PieChart, TrendingUp, ShieldAlert, CheckCircle2, ArrowRight, Loader2, DollarSign, Calendar, Target } from "lucide-react"
import { smartFolioInsights, type SmartFolioInsightsInput, type SmartFolioInsightsOutput } from "@/ai/flows/smart-folio-insights"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function SmartFolioPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [report, setReport] = React.useState<SmartFolioInsightsOutput | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const input: SmartFolioInsightsInput = {
      currentPortfolioValue: Number(formData.get("portfolioValue")),
      monthlyContribution: Number(formData.get("monthlyContribution")),
      riskTolerance: formData.get("riskTolerance") as any,
      investmentHorizonYears: Number(formData.get("horizon")),
      investmentGoals: formData.get("goals") as string,
      existingInvestmentsDescription: formData.get("holdings") as string,
    }

    try {
      const result = await smartFolioInsights(input)
      setReport(result)
    } catch (error) {
      console.error("SmartFolio error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
          <PieChart className="w-10 h-10 text-primary" />
        </div>
        <h1 className="font-headline text-4xl font-black mb-3 tracking-tight">DLX SmartFolio</h1>
        <p className="text-muted-foreground text-lg font-medium">Expert AI analysis for your investment portfolio and strategy.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Input Form */}
        <aside className="lg:col-span-5">
          <Card className="border-white/5 bg-card/40 backdrop-blur-md sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Portfolio Configuration</CardTitle>
              <CardDescription className="font-medium text-muted-foreground">Provide your current financial context for analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-2">
                      <DollarSign className="w-3 h-3" /> Total Value ($)
                    </Label>
                    <Input name="portfolioValue" type="number" defaultValue="10000" className="bg-background border-white/5" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Monthly Contrib.
                    </Label>
                    <Input name="monthlyContribution" type="number" defaultValue="500" className="bg-background border-white/5" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-2">
                      <ShieldAlert className="w-3 h-3" /> Risk Tolerance
                    </Label>
                    <Select name="riskTolerance" defaultValue="moderate">
                      <SelectTrigger className="bg-background border-white/5">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-3 h-3" /> Horizon (Years)
                    </Label>
                    <Input name="horizon" type="number" defaultValue="10" className="bg-background border-white/5" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-2">
                    <Target className="w-3 h-3" /> Investment Goals
                  </Label>
                  <Textarea name="goals" placeholder="e.g. Retirement in 20 years, Buying a home..." className="bg-background border-white/5 min-h-[100px]" required />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Existing Holdings (Optional)</Label>
                  <Textarea name="holdings" placeholder="e.g. 50% S&P 500, 20% Tech Stocks, 30% Bonds" className="bg-background border-white/5 min-h-[80px]" />
                </div>

                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl font-bold neon-glow" disabled={isLoading}>
                  {isLoading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Generating Analysis...</> : "Run AI Insights"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </aside>

        {/* Report View */}
        <main className="lg:col-span-7 space-y-8">
          {!report && !isLoading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 glass-panel rounded-3xl border-dashed border-white/10">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <PieChart className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <h3 className="font-headline text-2xl font-bold mb-2">Awaiting Intelligence</h3>
              <p className="text-muted-foreground font-medium max-w-sm">Complete your profile to the left to see your personalized AI financial report.</p>
            </div>
          )}

          {isLoading && (
            <div className="space-y-8 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-white/5 rounded-3xl border border-white/5" />
              ))}
            </div>
          )}

          {report && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Summary Card */}
              <Card className="glass-panel border-primary/20 bg-primary/5">
                <CardHeader>
                  <Badge className="w-fit bg-primary mb-2 uppercase font-bold tracking-widest px-2 py-0.5 text-[10px]">Executive Summary</Badge>
                  <CardTitle className="font-headline text-2xl font-black">Strategic Outlook</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium leading-relaxed">{report.summary}</p>
                </CardContent>
              </Card>

              {/* Risk Analysis Card */}
              <Card className="border-white/5 bg-card/40">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="font-headline text-xl">Risk Profile</CardTitle>
                    <CardDescription className="font-medium text-muted-foreground">Level: <span className="text-accent font-bold">{report.riskAnalysis.level}</span></CardDescription>
                  </div>
                  <ShieldAlert className="w-8 h-8 text-accent" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground font-medium leading-relaxed">{report.riskAnalysis.detailedAnalysis}</p>
                </CardContent>
              </Card>

              {/* Two Column Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-white/5 bg-card/40">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" /> Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {report.investmentStrategySuggestions.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm font-medium text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-white/5 bg-card/40">
                  <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" /> Diversification
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {report.diversificationRecommendations.map((d, i) => (
                        <li key={i} className="flex gap-2 text-sm font-medium text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Next Steps */}
              <div className="bg-accent/10 border border-accent/20 p-8 rounded-3xl">
                <h3 className="font-headline text-2xl font-black mb-6 tracking-tight flex items-center gap-3">
                  <ArrowRight className="w-6 h-6 text-accent" /> Actionable Next Steps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.nextSteps.map((step, i) => (
                    <div key={i} className="bg-background/40 border border-white/5 p-4 rounded-xl flex items-center gap-4 group hover:border-accent/40 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center font-black text-accent text-sm group-hover:bg-accent group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <span className="text-sm font-bold">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
