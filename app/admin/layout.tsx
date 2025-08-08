"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const breadcrumbMap: Record<string, string> = {
  "/admin": "仪表板",
  "/admin/dashboard": "仪表板",
  "/admin/users": "用户管理",
  "/admin/roles": "角色管理",
  "/admin/departments": "部门管理",
  "/admin/settings": "系统设置",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()
  
  // 如果是登录页面，不使用sidebar布局
  if (pathname === "/admin/login") {
    return <>{children}</>
  }
  
  // 获取当前页面的标题
  const getPageTitle = (path: string) => {
    return breadcrumbMap[path] || "管理系统"
  }
  
  // 生成面包屑
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = []
    
    let currentPath = ''
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      currentPath += `/${segment}`
      
      if (i === 0) {
        // 第一层是admin，显示为管理系统
        breadcrumbs.push({
          title: "管理系统",
          href: "/admin",
          isCurrent: i === segments.length - 1
        })
      } else {
        breadcrumbs.push({
          title: getPageTitle(currentPath),
          href: currentPath,
          isCurrent: i === segments.length - 1
        })
      }
    }
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  const currentPageTitle = getPageTitle(pathname)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.href}>
                    <BreadcrumbItem className="hidden md:block">
                      {breadcrumb.isCurrent ? (
                        <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={breadcrumb.href}>
                          {breadcrumb.title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!breadcrumb.isCurrent && index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">{currentPageTitle}</h1>
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}