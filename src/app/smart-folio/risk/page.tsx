
"use client"

import * as React from "react"
import { ShieldCheck, AlertCircle, TrendingDown, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RiskGuardPage() {
  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="font-headline text-3xl font-black uppercase tracking-tight">Risk Guard</h1>
        <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mt-1">Real-time Exposure Monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-rose-500/5 border-rose-500/20 p-6 rounded-3xl space-y-4">
           <div className="flex items-center justify-between">
              <ShieldCheck className="w-6 h-6 text-rose-500" />
              <Badge className="bg-rose-500 text-white text-[8px] font-black">HIGH ALERT</Badge>
           </div>
           <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase">Volatility Score</p>
              <p className="text-3xl font-black text-white">84.2</p>
           </div>
        </Card>
        
        <Card className="bg-black border-white/5 p-6 rounded-3xl space-y-4">
           <AlertCircle className="w-6 h-6 text-yellow-500" />
           <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase">Max Drawdown</p>
              <p className="text-3xl font-black text-white">12.4%</p>
           </div>
        </Card>

        <Card className="bg-black border-white/5 p-6 rounded-3xl space-y-4">
           <TrendingDown className="w-6 h-6 text-blue-500" />
           <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase">Value at Risk (VaR)</p>
              <p className="text-3xl font-black text-white">$2,142</p>
           </div>
        </Card>
      </div>

      <Card className="bg-[#0e0e11] border-white/5 p-8 rounded-[2rem] space-y-6">
        <div className="flex items-center gap-3">
           <Zap className="w-5 h-5 text-rose-500" />
           <h3 className="text-sm font-black uppercase tracking-widest">Automated Guardrails</h3>
        </div>
        <div className="space-y-3">
           {[
             { label: "Stop Loss: RENDER @ $1.15", status: "ENABLED", color: "text-emerald-500" },
             { label: "Rebalance Trigger: USDC < 20%", status: "ARMED", color: "text-blue-400" },
             { label: "Global Liquidation: BTC < $40k", status: "DISABLED", color: "text-muted-foreground" },
           ].map((g, i) => (
             <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs font-bold text-white/80">{g.label}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${g.color}`}>{g.status}</span>
             </div>
           ))}
        </div>
      </Card>
    </div>
  )
}
