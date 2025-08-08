"use client"

import * as React from "react"
import {
  Users,
  UserCheck,
  Building,
  Settings,
  LayoutDashboard,
  GalleryVerticalEnd,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "管理员",
    email: "admin@yishan.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "仪表板",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "数据概览",
          url: "/admin/dashboard",
        },
        {
          title: "系统监控",
          url: "/admin/dashboard/monitor",
        },
        {
          title: "活动日志",
          url: "/admin/dashboard/logs",
        },
      ],
    },
    {
      title: "用户管理",
      url: "/admin/users",
      icon: Users,
      items: [
        {
          title: "用户列表",
          url: "/admin/users",
        },
        {
          title: "用户新增",
          url: "/admin/users/create",
        },
        {
          title: "用户导入",
          url: "/admin/users/import",
        },
        {
          title: "用户导出",
          url: "/admin/users/export",
        },
      ],
    },
    {
      title: "角色管理",
      url: "/admin/roles",
      icon: UserCheck,
      items: [
        {
          title: "角色列表",
          url: "/admin/roles",
        },
        {
          title: "角色新增",
          url: "/admin/roles/create",
        },
        {
          title: "权限管理",
          url: "/admin/roles/permissions",
        },
        {
          title: "用户分配",
          url: "/admin/roles/assign",
        },
      ],
    },
    {
      title: "部门管理",
      url: "/admin/departments",
      icon: Building,
      items: [
        {
          title: "部门列表",
          url: "/admin/departments",
        },
        {
          title: "部门新增",
          url: "/admin/departments/create",
        },
        {
          title: "组织架构",
          url: "/admin/departments/structure",
        },
        {
          title: "人员管理",
          url: "/admin/departments/personnel",
        },
      ],
    },
    {
      title: "系统设置",
      url: "/admin/settings",
      icon: Settings,
      items: [
        {
          title: "基础设置",
          url: "/admin/settings/basic",
        },
        {
          title: "参数配置",
          url: "/admin/settings/parameters",
        },
        {
          title: "操作日志",
          url: "/admin/settings/logs",
        },
        {
          title: "系统工具",
          url: "/admin/settings/tools",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
                        <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight whitespace-nowrap">
                <span className="truncate font-medium">移山通用管理系统</span>
                <span className="text-xs text-muted-foreground">锲而不舍，金石可镂</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
