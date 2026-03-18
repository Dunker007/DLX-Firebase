"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  MessageSquare,
  Bot,
  Newspaper,
  FlaskConical,
  Settings,
  Sparkles,
  Zap,
  HardDrive,
  Users,
  LayoutGrid,
  Video,
  Radio
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/firebase"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Studios", url: "/studios", icon: LayoutGrid },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Agents", url: "/dashboard/agents", icon: Users },
  { title: "Agentflow", url: "/dashboard/agentflow", icon: Zap },
  { title: "News Feed", url: "/dashboard/news", icon: Newspaper },
  { title: "Meeting Room", url: "/dashboard/meeting", icon: Video },
  { title: "Labs Hub", url: "/dashboard/labs", icon: FlaskConical },
  { title: "Pipeline", url: "/dashboard/pipeline", icon: Radio },
  { title: "Drive", url: "/dashboard/drive", icon: HardDrive },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const { user } = useUser()

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5 bg-[#08080a]">
      <SidebarHeader className="h-16 flex items-center px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_-2px_rgba(var(--primary),0.5)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {state !== "collapsed" && (
            <div className="flex flex-col">
              <span className="font-headline font-bold text-sm tracking-tight leading-none uppercase">Nexus OS</span>
              <span className="text-[8px] font-black text-muted-foreground/60 tracking-widest uppercase">Local Interface</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/30 uppercase text-[9px] tracking-widest font-black px-4 py-2">
            Systems Orchestration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url || (item.url !== '/dashboard' && pathname.startsWith(item.url))}
                    tooltip={item.title}
                    className="h-10 transition-all duration-200 hover:bg-white/5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-tight">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-white/5 space-y-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" className="hover:bg-white/5">
              <Link href="/dashboard/settings">
                <Settings className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-tight">System Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-2 mt-2">
              <Avatar className="w-7 h-7 border border-white/5">
                <AvatarImage src={user?.photoURL || `https://picsum.photos/seed/${user?.uid}/100/100`} />
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-black">
                  {user?.displayName?.[0] || user?.email?.[0] || 'JD'}
                </AvatarFallback>
              </Avatar>
              {state !== "collapsed" && (
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-tight truncate">
                    {user?.displayName || "Neural User"}
                  </span>
                  <span className="text-[8px] font-bold text-muted-foreground/60 uppercase truncate">
                    {user ? "Link Secure" : "Establishing Link"}
                  </span>
                </div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        {state !== "collapsed" && (
          <div className="px-2">
            <Badge variant="outline" className="w-full border-primary/20 bg-primary/5 text-primary text-[8px] font-black uppercase tracking-widest justify-center py-1">
              BETA v0.1.0
            </Badge>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}