
import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Moon, Search, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#050507]">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col min-h-screen bg-transparent">
          <header className="h-16 flex items-center px-8 gap-4 border-b border-white/5 sticky top-0 bg-[#050507]/80 backdrop-blur-md z-40">
            <SidebarTrigger className="text-muted-foreground hover:text-white" />
            
            <div className="h-4 w-px bg-white/10 mx-2" />
            
            <nav className="hidden xl:flex items-center gap-8">
              {[
                { label: 'Dashboard', active: false },
                { label: 'Studios', active: false },
                { label: 'Chat', active: false },
                { label: 'Agents', active: false },
                { label: 'Agentflow', active: true },
                { label: 'News', active: false },
                { label: 'Meeting', active: false },
                { label: 'Labs', active: false },
                { label: 'Pipeline', active: false },
                { label: 'Drive', active: false },
                { label: 'Settings', active: false },
              ].map(link => (
                <span 
                  key={link.label} 
                  className={`text-[9px] font-black uppercase tracking-[0.2em] cursor-pointer transition-colors ${
                    link.active ? 'text-cyan-400' : 'text-white/30 hover:text-white'
                  }`}
                >
                  {link.label}
                </span>
              ))}
            </nav>

            <div className="flex-1" />
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-rose-500 bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/20">
                <AlertCircle className="w-3 h-3" />
                Error
              </div>
              
              <div className="flex items-center gap-4 text-white/40">
                <Moon className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/10">
                  <Search className="w-3.5 h-3.5" />
                  <span className="opacity-40">Ctrl+K</span>
                </div>
              </div>

              <div className="relative">
                <Avatar className="w-8 h-8 border border-white/10 cursor-pointer hover:border-cyan-500 transition-colors">
                  <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                  <AvatarFallback className="bg-cyan-500/10 text-cyan-500 text-[10px] font-black">JD</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#050507]" />
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-x-hidden">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
