
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
  ChevronRight,
  Sparkles,
  PieChart,
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
    title: "Chat & Agents",
    url: "/chat",
    icon: MessageSquare,
  },
  {
    title: "SmartFolio",
    url: "/smart-folio",
    icon: PieChart,
  },
  {
    title: "Agent Hub",
    url: "/agents",
    icon: Bot,
  },
  {
    title: "News Feed",
    url: "/news",
    icon: Newspaper,
  },
  {
    title: "Labs",
    url: "/labs",
    icon: FlaskConical,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5">
      <SidebarHeader className="h-16 flex items-center px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center neon-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {state !== "collapsed" && (
            <span className="font-headline font-bold text-lg tracking-tight">LuxAI</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/50 uppercase text-[10px] tracking-widest font-bold px-4 py-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="h-11 transition-all duration-200"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
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
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/settings">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 p-2 mt-2">
              <Avatar className="w-8 h-8 border border-primary/20">
                <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">JD</AvatarFallback>
              </Avatar>
              {state !== "collapsed" && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold truncate">Jane Doe</span>
                  <span className="text-xs text-muted-foreground truncate">Pro Member</span>
                </div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
