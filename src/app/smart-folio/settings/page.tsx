
"use client"

import * as React from "react"
import { Settings, Wallet, Bell, Shield, Database } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function SmartFolioSettingsPage() {
  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="font-headline text-3xl font-black uppercase tracking-tight">Folio Settings</h1>
        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-1">Orchestration & Data Sync Preferences</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-[#0e0e11] border-white/5 p-8 rounded-[2rem] space-y-8">
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
               <Database className="w-4 h-4 text-blue-500" /> Data Integration
            </h3>
            <div className="space-y-3">
              {[
                { label: "Automatic Price Refresh", desc: "Sync latest market data every 60 seconds." },
                { label: "Chain Analysis Bridge", desc: "Fetch real-time transaction data from L2 networks." },
                { label: "AI Snapshot History", desc: "Keep record of all tactical analysis results." }
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <p className="text-sm font-bold text-white/90">{s.label}</p>
                    <p className="text-[10px] text-muted-foreground font-medium">{s.desc}</p>
                  </div>
                  <Switch defaultChecked={i !== 1} />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 pt-4">
             <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
               <Bell className="w-4 h-4 text-blue-500" /> Alert Intelligence
            </h3>
            <div className="grid grid-cols-2 gap-4">
               <Button variant="outline" className="h-12 border-white/10 bg-white/5 text-[9px] font-black uppercase rounded-xl">Configure Slack</Button>
               <Button variant="outline" className="h-12 border-white/10 bg-white/5 text-[9px] font-black uppercase rounded-xl">Configure Discord</Button>
            </div>
          </section>
        </Card>
      </div>
    </div>
  )
}
