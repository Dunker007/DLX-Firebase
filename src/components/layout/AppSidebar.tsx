
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
  PieChart,
  Music,
  Video,
  LayoutGrid,
  Zap,
  HardDrive,
  Users
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

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Studios",
    url: "/studios",
    icon: LayoutGrid,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Agents",
    url: "/agents",
    icon: Users,
  },
  {
    title: "Agentflow",
    url: "/dashboard/agentflow",
    icon: Zap,
  },
  {
    title: "News",
    url: "/news",
    icon: Newspaper,
  },
  {
    title: "Meeting",
    url: "/dashboard/meeting",
    icon: Video,
  },
  {
    title: "Labs",
    url: "/labs",
    icon: FlaskConical,
  },
  {
    title: "Drive",
    url: "/dashboard/drive",
    icon: HardDrive,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5">
      <SidebarHeader className="h-16 flex items-center px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_-2px_rgba(6,182,212,0.5)]">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {state !== "collapsed" && (
            <div className="flex flex-col">
              <span className="font-headline font-bold text-sm tracking-tight leading-none uppercase">Nexus</span>
              <span className="text-[8px] font-black text-muted-foreground/60 tracking-widest uppercase">Local Interface</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/30 uppercase text-[9px] tracking-widest font-black px-4 py-2">
            Systems Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url || (item.url !== '/dashboard' && pathname.startsWith(item.url))}
                    tooltip={item.title}
                    className="h-10 transition-all duration-200 hover:bg-white/5 data-[active=true]:bg-cyan-500/10 data-[active=true]:text-cyan-500"
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
      <SidebarFooter className="p-4 border-t border-white/5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" className="hover:bg-white/5">
              <Link href="/settings">
                <Settings className="w-4 h-4" />
                <span className="text-xs font-black uppercase tracking-tight">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-2 mt-2">
              <Avatar className="w-7 h-7 border border-white/5">
                <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                <AvatarFallback className="bg-cyan-500/10 text-cyan-500 text-[10px] font-black">JD</AvatarFallback>
              </Avatar>
              {state !== "collapsed" && (
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-tight truncate">Jane Doe</span>
                  <span className="text-[8px] font-bold text-muted-foreground/60 uppercase truncate">Pro Access</span>
                </div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
