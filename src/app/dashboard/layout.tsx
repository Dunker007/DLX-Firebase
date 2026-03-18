"use client"

import { AppSidebar } from "@/components/layout/AppSidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Moon, Search, AlertCircle, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser, useAuth } from "@/firebase"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isUserLoading } = useUser()
  const auth = useAuth()

  const handleSignOut = () => {
    auth.signOut()
  }

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
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Studios', href: '/studios' },
                { label: 'Chat', href: '/chat' },
                { label: 'Agents', href: '/dashboard/agents' },
                { label: 'Labs', href: '/dashboard/labs' },
              ].map(link => (
                <Link 
                  href={link.href}
                  key={link.label} 
                  className="text-[9px] font-black uppercase tracking-[0.2em] cursor-pointer transition-colors text-white/30 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex-1" />
            
            <div className="flex items-center gap-6">
              {!isUserLoading && !user && (
                <Button asChild size="sm" variant="outline" className="h-8 text-[9px] font-black uppercase border-white/10 hover:bg-white/5 rounded-full px-4">
                  <Link href="/login">Establish Link</Link>
                </Button>
              )}
              
              {user && (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Secure
                  </div>

                  <div className="flex items-center gap-4 text-white/40">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/10">
                      <Search className="w-3.5 h-3.5" />
                      <span className="opacity-40">Ctrl+K</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <Avatar className="w-8 h-8 border border-white/10 cursor-pointer hover:border-cyan-500 transition-colors">
                        <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`} />
                        <AvatarFallback className="bg-cyan-500/10 text-cyan-500 text-[10px] font-black">
                          {user.displayName?.[0] || user.email?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#050507]" />
                      
                      {/* Sign Out Tooltip-ish UI */}
                      <button 
                        onClick={handleSignOut}
                        className="absolute top-10 right-0 hidden group-hover:flex items-center gap-2 bg-black border border-white/10 px-4 py-2 rounded-xl text-[9px] font-black uppercase text-rose-500 hover:bg-rose-500/10 transition-all shadow-2xl z-50 whitespace-nowrap"
                      >
                        <LogOut className="w-3 h-3" /> Terminate Link
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
