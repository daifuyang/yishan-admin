"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, UserPlus, Edit, Trash2, Shield, Users } from "lucide-react"

export default function RolesPage() {
  // 模拟角色数据
  const roles = [
    {
      id: 1,
      name: "超级管理员",
      code: "admin",
      status: "正常",
      description: "系统最高权限管理员",
      userCount: 1,
      createTime: "2024-01-01 10:00:00",
      permissions: ["用户管理", "角色管理", "部门管理", "系统设置", "数据查看", "数据操作"],
    },
    {
      id: 2,
      name: "系统管理员",
      code: "system",
      status: "正常",
      description: "系统配置和管理员",
      userCount: 2,
      createTime: "2024-01-01 10:00:00",
      permissions: ["用户管理", "角色管理", "部门管理", "系统设置"],
    },
    {
      id: 3,
      name: "部门经理",
      code: "manager",
      status: "正常",
      description: "部门级别的管理人员",
      userCount: 4,
      createTime: "2024-01-15 14:30:00",
      permissions: ["用户管理", "数据查看"],
    },
    {
      id: 4,
      name: "普通员工",
      code: "user",
      status: "正常",
      description: "普通系统用户",
      userCount: 15,
      createTime: "2024-02-01 09:15:00",
      permissions: ["数据查看"],
    },
    {
      id: 5,
      name: "访客",
      code: "guest",
      status: "禁用",
      description: "只读访问用户",
      userCount: 0,
      createTime: "2024-02-15 16:45:00",
      permissions: ["基础查看"],
    },
  ]

  const getStatusBadge = (status: string) => {
    return status === "正常" ? (
      <Badge className="bg-green-100 text-green-800">正常</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">禁用</Badge>
    )
  }

  const getPermissionBadges = (permissions: string[]) => {
    return (
      <div className="flex flex-wrap gap-1">
        {permissions.slice(0, 3).map((permission, index) => (
          <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
            {permission}
          </Badge>
        ))}
        {permissions.length > 3 && (
          <Badge className="bg-gray-100 text-gray-800 text-xs">
            +{permissions.length - 3}
          </Badge>
        )}
      </div>
    )
  }

  return (
    <div className="py-6 space-y-6">
      {/* 页面操作栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="搜索角色名称/编码"
              className="pl-10 w-full sm:w-[300px]"
            />
          </div>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          新增角色
        </Button>
      </div>

      {/* 角色统计 */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">{roles.length}</div>
          <p className="text-sm text-muted-foreground">总角色数</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-green-600">
            {roles.filter(r => r.status === "正常").length}
          </div>
          <p className="text-sm text-muted-foreground">正常角色</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-red-600">
            {roles.filter(r => r.status === "禁用").length}
          </div>
          <p className="text-sm text-muted-foreground">禁用角色</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">
            {roles.reduce((sum, role) => sum + role.userCount, 0)}
          </div>
          <p className="text-sm text-muted-foreground">关联用户</p>
        </div>
      </div>

      {/* 角色表格 */}
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold">角色列表</h3>
        </div>
        <div className="p-6 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>角色名称</TableHead>
                <TableHead>角色编码</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>用户数量</TableHead>
                <TableHead>权限</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="w-[100px]">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="font-mono text-sm">{role.code}</TableCell>
                  <TableCell>{getStatusBadge(role.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      {role.userCount}
                    </div>
                  </TableCell>
                  <TableCell>{getPermissionBadges(role.permissions)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{role.description}</TableCell>
                  <TableCell>{role.createTime}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>操作</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          权限设置
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          用户分配
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          显示 1 到 {roles.length} 条，共 {roles.length} 条记录
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            上一页
          </Button>
          <Button variant="outline" size="sm" disabled>
            下一页
          </Button>
        </div>
      </div>
    </div>
  )
}