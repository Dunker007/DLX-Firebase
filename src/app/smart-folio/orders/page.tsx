
"use client"

import * as React from "react"
import { Activity, Plus, History, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function OrderBuilderPage() {
  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-black uppercase tracking-tight">Order Builder</h1>
          <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">Precision Execution Interface</p>
        </div>
        <Button variant="outline" className="h-10 border-white/5 bg-white/5 text-[10px] font-black uppercase rounded-xl">
          <History className="w-4 h-4 mr-2" /> Execution Log
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-[#0e0e11] border-white/5 p-8 rounded-3xl space-y-6">
          <div className="space-y-4">
             <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-muted-foreground">Asset Pair</label>
               <Input placeholder="ETH/USDC" className="bg-black border-white/5 h-12 rounded-xl" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground">Amount</label>
                  <Input placeholder="0.00" className="bg-black border-white/5 h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground">Limit Price</label>
                  <Input placeholder="Market" className="bg-black border-white/5 h-12 rounded-xl" />
                </div>
             </div>
          </div>
          <Button className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-[12px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-600/20">
            Preview Order <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        <Card className="bg-[#0e0e11] border-white/5 p-8 rounded-3xl flex flex-col items-center justify-center border-dashed opacity-50">
           <Activity className="w-12 h-12 text-muted-foreground/20 mb-4" />
           <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Awaiting execution data</p>
        </Card>
      </div>
    </div>
  )
}
