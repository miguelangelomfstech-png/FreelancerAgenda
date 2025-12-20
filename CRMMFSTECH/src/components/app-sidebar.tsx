"use client";

import {
  LayoutDashboard,
  Users,
  Briefcase,
  Target,
  Calendar,
  BarChart3,
  Settings,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Leads",
    url: "/dashboard/leads",
    icon: Target,
  },
  {
    title: "Opportunities",
    url: "/dashboard/opportunities",
    icon: Briefcase,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Activities",
    url: "/dashboard/activities",
    icon: Calendar,
  },
];

const analyticsItems = [
  {
    title: "Reports",
    url: "/dashboard/reports",
    icon: BarChart3,
  },
];

const adminItems = [
  {
    title: "Security Logs",
    url: "/dashboard/admin/logs",
    icon: ShieldCheck,
  },
  {
    title: "Settings",
    url: "/dashboard/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-2">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="h-5 w-5" />
          </div>
          <span className="group-data-[collapsible=icon]:hidden">MFSTECH CRM</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <UserCircle className="h-8 w-8 text-muted-foreground" />
          <div className="flex flex-col text-sm group-data-[collapsible=icon]:hidden">
            <span className="font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
