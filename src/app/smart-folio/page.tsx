
"use client"

import * as React from "react"
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCcw, 
  RotateCw,
  Info,
  ChevronDown,
  Circle,
  Activity
} from "lucide-react"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const allocationData = [
  { name: 'USD', value: 32.2, color: '#3b82f6' },
  { name: 'ONDO', value: 15.4, color: '#8b5cf6' },
  { name: 'RENDER', value: 15.3, color: '#0ea5e9' },
  { name: 'FET', value: 14.8, color: '#6366f1' },
  { name: 'UNI', value: 14.3, color: '#d946ef' },
  { name: 'HYPE', value: 8.0, color: '#f43f5e' },
]

const assetTactics = [
  { id: '1', name: 'USD', role: 'CASH RESERVE (USDC)', holdings: '4,505.33', basis: '$1.00', price: '$1.00', pnl: '+0.00', alloc: '32.20%', type: 'SAFETY NET', image: 'https://picsum.photos/seed/usdc/32/32' },
  { id: '2', name: 'ONDO', role: 'ONDO FINANCE', holdings: '7,953.54', basis: '$0.26', price: '$0.27', pnl: '+56.23', alloc: '15.40%', type: 'BALANCED ALT', image: 'https://picsum.photos/seed/ondo/32/32' },
  { id: '3', name: 'RENDER', role: 'RENDER NETWORK', holdings: '1,537.1', basis: '$1.25', price: '$1.39', pnl: '+205.12', alloc: '15.30%', type: 'BALANCED ALT', image: 'https://picsum.photos/seed/render/32/32' },
  { id: '4', name: 'FET', role: 'FETCH.AI', holdings: '12,377.4', basis: '$0.17', price: '$0.17', pnl: '-20.26', alloc: '14.80%', type: 'BALANCED ALT', image: 'https://picsum.photos/seed/fet/32/32' },
  { id: '5', name: 'UNI', role: 'UNISWAP', holdings: '588.69', basis: '$3.42', price: '$3.39', pnl: '-17.65', alloc: '14.30%', type: 'BALANCED ALT', image: 'https://picsum.photos/seed/uni/32/32' },
  { id: '6', name: 'HYPE', role: 'HYPERLIQUID', holdings: '35.66', basis: '$31.29', price: '$31.30', pnl: '+0.50', alloc: '8.00%', type: 'BALANCED ALT', image: 'https://picsum.photos/seed/hype/32/32' },
]

export default function SmartFolioHub() {
  return (
    <div className="p-8 space-y-10 bg-[#0a0a0c] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="font-headline text-3xl font-black tracking-tight uppercase">SmartFolio <span className="text-blue-500">v3.0</span></h1>
            <Badge variant="outline" className="border-white/10 text-[10px] font-black tracking-tighter text-muted-foreground uppercase">
              BRIDGE ONLINE | GEMINI 2.5 FLASH ACTIVE
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
          <Button variant="ghost" size="sm" className="h-8 text-[10px] font-black uppercase rounded-lg">Anchor</Button>
          <Button variant="default" size="sm" className="h-8 text-[10px] font-black uppercase rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20">Tactician</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><RotateCw className="w-4 h-4" /></Button>
        </div>
      </div>

      {/* Ticker Tape */}
      <div className="flex items-center gap-8 overflow-hidden bg-white/5 border-y border-white/5 py-3 -mx-8 px-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0 animate-marquee">
            {allocationData.map((asset) => (
              <div key={asset.name} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-muted-foreground">{asset.name}</span>
                <span className="text-xs font-bold">$1.3900</span>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-500">
                  <TrendingUp className="w-3 h-3" />
                  12.28%
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Allocation Monitor */}
        <Card className="lg:col-span-5 bg-[#0e0e11] border-white/5 p-6 rounded-3xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-500" />
               <h3 className="text-[10px] font-black uppercase tracking-widest">Allocation Monitor</h3>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
              <span>80:20 Alts : Cash</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 relative shrink-0">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Diversification</span>
                <span className="text-2xl font-black">5 COINS</span>
                <span className="text-[10px] font-bold text-blue-500 uppercase">Alt Positions</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1 w-full">
              {allocationData.map((asset) => (
                <div key={asset.name} className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-muted-foreground">{asset.name}</span>
                    <span className="text-[10px] font-bold">{asset.value}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-green-500">
                    <span>+$205.12</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Button variant="outline" className="w-full rounded-xl border-white/10 bg-white/5 h-10 text-[10px] font-black uppercase tracking-widest gap-2">
              <RefreshCcw className="w-3 h-3 text-blue-500" /> Balanced Rotation Active
            </Button>
          </div>
        </Card>

        {/* Equity Curve Placeholder */}
        <Card className="lg:col-span-7 bg-[#0e0e11] border-white/5 p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-white/20" />
               <h3 className="text-[10px] font-black uppercase tracking-widest">Equity Curve</h3>
            </div>
            <span className="text-[10px] text-muted-foreground font-bold">Snapshot Mode</span>
          </div>

          <div className="h-64 w-full flex flex-col items-center justify-center border border-dashed border-white/5 rounded-2xl bg-white/[0.02]">
             <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
               <Activity className="w-6 h-6 text-muted-foreground/20" />
             </div>
             <p className="text-xs text-muted-foreground/50 font-medium max-w-[240px] text-center leading-relaxed">
               Equity curve will appear after 2+ daily snapshots. Snapshots are saved automatically when prices sync.
             </p>
             <div className="flex items-center gap-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Live Monitoring Active</span>
             </div>
          </div>
        </Card>
      </div>

      {/* Asset Tactics Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-blue-500" />
             <h3 className="text-[10px] font-black uppercase tracking-widest">Altcoin Tactics</h3>
           </div>
           <div className="flex items-center gap-6">
             <div className="text-center">
               <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter mb-0.5">Pos</p>
               <p className="text-xs font-black">15</p>
             </div>
             <div className="text-center">
               <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter mb-0.5">Sentiment</p>
               <p className="text-xs font-black">26 <span className="text-[10px] text-muted-foreground">/ 100</span></p>
             </div>
             <Badge variant="outline" className="border-blue-500/30 text-blue-500 font-black text-[10px] rounded-full px-3 py-1 bg-blue-500/10">
               6 Active Positions
             </Badge>
           </div>
        </div>

        <Card className="bg-[#0e0e11] border-white/5 rounded-3xl overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5 border-b border-white/5">
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="text-[10px] font-black text-muted-foreground uppercase h-12">Asset / Role</TableHead>
                <TableHead className="text-[10px] font-black text-muted-foreground uppercase h-12">Holdings</TableHead>
                <TableHead className="text-[10px] font-black text-muted-foreground uppercase h-12">Basis</TableHead>
                <TableHead className="text-[10px] font-black text-muted-foreground uppercase h-12">Price</TableHead>
                <TableHead className="text-[10px] font-black text-muted-foreground uppercase h-12">PNL</TableHead>
                <TableHead className="text-[10px] font-black text-muted-foreground uppercase h-12 text-right">Alloc vs Target</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetTactics.map((asset) => (
                <TableRow key={asset.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 overflow-hidden p-1.5 flex items-center justify-center shrink-0">
                        <img src={asset.image} alt={asset.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm">{asset.name}</span>
                          <Badge variant="outline" className="text-[8px] font-black bg-blue-500/10 text-blue-500 border-none px-1.5 h-4">
                            {asset.type}
                          </Badge>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{asset.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="text-xs font-black">{asset.holdings}</p>
                      <p className="text-[10px] font-bold text-muted-foreground">$2,148.42</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="text-xs font-black">{asset.basis}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Avg</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="text-xs font-black text-blue-500">{asset.price}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`text-xs font-black ${asset.pnl.startsWith('+') ? 'text-green-500' : asset.pnl.startsWith('-') ? 'text-rose-500' : ''}`}>
                      {asset.pnl}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black uppercase text-muted-foreground">Target</span>
                         <span className="text-xs font-black">{asset.alloc}</span>
                      </div>
                      <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: asset.alloc }} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
