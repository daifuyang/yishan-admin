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
import { Search, MoreHorizontal, UserPlus, Edit, Trash2, Shield } from "lucide-react"

export default function UsersPage() {
  // 模拟用户数据
  const users = [
    {
      id: 1,
      username: "admin",
      name: "系统管理员",
      department: "技术部",
      role: "超级管理员",
      status: "正常",
      email: "admin@yishan.com",
      phone: "13800138000",
      createTime: "2024-01-01 10:00:00",
    },
    {
      id: 2,
      username: "zhangsan",
      name: "张三",
      department: "技术部",
      role: "开发工程师",
      status: "正常",
      email: "zhangsan@yishan.com",
      phone: "13800138001",
      createTime: "2024-01-15 14:30:00",
    },
    {
      id: 3,
      username: "lisi",
      name: "李四",
      department: "市场部",
      role: "市场经理",
      status: "正常",
      email: "lisi@yishan.com",
      phone: "13800138002",
      createTime: "2024-02-01 09:15:00",
    },
    {
      id: 4,
      username: "wangwu",
      name: "王五",
      department: "财务部",
      role: "财务专员",
      status: "禁用",
      email: "wangwu@yishan.com",
      phone: "13800138003",
      createTime: "2024-02-15 16:45:00",
    },
    {
      id: 5,
      username: "zhaoliu",
      name: "赵六",
      department: "人事部",
      role: "人事专员",
      status: "正常",
      email: "zhaoliu@yishan.com",
      phone: "13800138004",
      createTime: "2024-03-01 11:20:00",
    },
  ]

  const getStatusBadge = (status: string) => {
    return status === "正常" ? (
      <Badge className="bg-green-100 text-green-800">正常</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">禁用</Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* 页面操作栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="搜索用户名/姓名/邮箱"
              className="pl-10 w-full sm:w-[300px]"
            />
          </div>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          新增用户
        </Button>
      </div>

      {/* 用户统计 */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">{users.length}</div>
          <p className="text-sm text-muted-foreground">总用户数</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => u.status === "正常").length}
          </div>
          <p className="text-sm text-muted-foreground">正常用户</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-red-600">
            {users.filter(u => u.status === "禁用").length}
          </div>
          <p className="text-sm text-muted-foreground">禁用用户</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">4</div>
          <p className="text-sm text-muted-foreground">部门数量</p>
        </div>
      </div>

      {/* 用户表格 */}
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold">用户列表</h3>
        </div>
        <div className="p-6 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户名</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>部门</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>手机</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="w-[100px]">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.createTime}</TableCell>
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
                          分配角色
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
          显示 1 到 {users.length} 条，共 {users.length} 条记录
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