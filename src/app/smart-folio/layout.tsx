
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DashboardLayout from "../dashboard/layout"
import { 
  Wallet, 
  Activity, 
  ShieldCheck, 
  FileText, 
  Settings, 
  LayoutGrid,
  TrendingUp,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Strategic Hub", icon: LayoutGrid, href: "/smart-folio" },
  { title: "Order Builder", icon: Activity, href: "/smart-folio/orders" },
  { title: "Risk Guard", icon: ShieldCheck, href: "/smart-folio/risk" },
  { title: "Portfolio Report", icon: FileText, href: "/smart-folio/report" },
  { title: "Settings", icon: Settings, href: "/smart-folio/settings" },
]

export default function SmartFolioLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-100px)] -m-6 overflow-hidden">
        {/* Local SmartFolio Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-background/40 backdrop-blur-xl flex flex-col p-4 space-y-8 hidden md:flex">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="font-black text-xs">SF</span>
            </div>
            <div>
              <h2 className="font-bold text-sm tracking-tight leading-none">SmartFolio</h2>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">Enterprise AI</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest px-2 mb-3">Accounts</p>
              <div className="space-y-1">
                <div className="group flex items-center justify-between p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 cursor-pointer hover:bg-blue-500/20 transition-all">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-blue-400">Algo Account</span>
                    <span className="text-xs text-muted-foreground font-medium">#82263</span>
                  </div>
                  <span className="text-sm font-bold">$13,472.16</span>
                </div>
                <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 border border-transparent cursor-pointer transition-all">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-foreground">DEFI Account</span>
                    <span className="text-xs text-muted-foreground font-medium">#82267</span>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">$1,432</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <span className="text-[10px] font-bold text-muted-foreground">Combined AUM</span>
                  <span className="text-sm font-bold text-blue-500">$17,582.96</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
               <div>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-2">Strategy Pulse</p>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold">ACTIVE DEPLOYMENT</span>
                  <span className="text-[10px] font-bold text-primary">32.2%</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[32.2%]" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Activity className="w-3 h-3 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Execution in progress</span>
              </div>
            </div>

            <div>
               <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest px-2 mb-3">Macro Signal</p>
               <div className="flex items-center justify-between p-3 rounded-xl bg-background/60 border border-white/5">
                <span className="text-[10px] font-bold uppercase">Accumulate</span>
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
               </div>
            </div>
          </div>

          <nav className="mt-auto space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href 
                    ? "bg-white/10 text-white" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Viewport */}
        <main className="flex-1 overflow-y-auto bg-[#0a0a0c]">
          {children}
        </main>
      </div>
    </DashboardLayout>
  )
}
