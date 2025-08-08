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
import { Search, MoreHorizontal, Building, UserPlus, Edit, Trash2, Users } from "lucide-react"

export default function DepartmentsPage() {
  // 模拟部门数据
  const departments = [
    {
      id: 1,
      name: "技术部",
      code: "tech",
      parent: "总公司",
      leader: "张三",
      userCount: 8,
      status: "正常",
      description: "负责技术开发和系统维护",
      createTime: "2024-01-01 10:00:00",
    },
    {
      id: 2,
      name: "市场部",
      code: "market",
      parent: "总公司",
      leader: "李四",
      userCount: 5,
      status: "正常",
      description: "负责市场营销和客户拓展",
      createTime: "2024-01-01 10:00:00",
    },
    {
      id: 3,
      name: "财务部",
      code: "finance",
      parent: "总公司",
      leader: "王五",
      userCount: 3,
      status: "正常",
      description: "负责财务管理和会计核算",
      createTime: "2024-01-15 14:30:00",
    },
    {
      id: 4,
      name: "人事部",
      code: "hr",
      parent: "总公司",
      leader: "赵六",
      userCount: 4,
      status: "正常",
      description: "负责人力资源管理和行政事务",
      createTime: "2024-02-01 09:15:00",
    },
    {
      id: 5,
      name: "前端组",
      code: "frontend",
      parent: "技术部",
      leader: "前端经理",
      userCount: 3,
      status: "正常",
      description: "负责前端开发工作",
      createTime: "2024-02-15 16:45:00",
    },
    {
      id: 6,
      name: "后端组",
      code: "backend",
      parent: "技术部",
      leader: "后端经理",
      userCount: 4,
      status: "正常",
      description: "负责后端开发工作",
      createTime: "2024-02-15 16:45:00",
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
              placeholder="搜索部门名称/编码"
              className="pl-10 w-full sm:w-[300px]"
            />
          </div>
        </div>
        <Button>
          <Building className="mr-2 h-4 w-4" />
          新增部门
        </Button>
      </div>

      {/* 部门统计 */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">{departments.length}</div>
          <p className="text-sm text-muted-foreground">部门总数</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-green-600">
            {departments.filter(d => d.status === "正常").length}
          </div>
          <p className="text-sm text-muted-foreground">正常部门</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold text-red-600">
            {departments.filter(d => d.status === "禁用").length}
          </div>
          <p className="text-sm text-muted-foreground">禁用部门</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">
            {departments.reduce((sum, dept) => sum + dept.userCount, 0)}
          </div>
          <p className="text-sm text-muted-foreground">部门人员</p>
        </div>
      </div>

      {/* 部门表格 */}
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <h3 className="text-lg font-semibold">部门列表</h3>
        </div>
        <div className="p-6 pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>部门名称</TableHead>
                <TableHead>部门编码</TableHead>
                <TableHead>上级部门</TableHead>
                <TableHead>负责人</TableHead>
                <TableHead>人员数量</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="w-[100px]">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell className="font-mono text-sm">{dept.code}</TableCell>
                  <TableCell>{dept.parent}</TableCell>
                  <TableCell>{dept.leader}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      {dept.userCount}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(dept.status)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{dept.description}</TableCell>
                  <TableCell>{dept.createTime}</TableCell>
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
                          <UserPlus className="mr-2 h-4 w-4" />
                          添加下级部门
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          查看人员
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
          显示 1 到 {departments.length} 条，共 {departments.length} 条记录
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