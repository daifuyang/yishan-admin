"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
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
import { Search, Settings, Save, RefreshCw, Activity, Bell, Database } from "lucide-react"

export default function SettingsPage() {
  // 模拟系统配置数据
  const systemSettings = [
    {
      id: 1,
      name: "系统名称",
      key: "system_name",
      value: "移山通用管理系统",
      type: "text",
      description: "系统显示名称",
    },
    {
      id: 2,
      name: "系统版本",
      key: "system_version",
      value: "v1.0.0",
      type: "text",
      description: "当前系统版本",
    },
    {
      id: 3,
      name: "允许用户注册",
      key: "allow_register",
      value: "true",
      type: "boolean",
      description: "是否允许新用户注册",
    },
    {
      id: 4,
      name: "密码最小长度",
      key: "password_min_length",
      value: "6",
      type: "number",
      description: "用户密码最小长度要求",
    },
    {
      id: 5,
      name: "会话超时时间",
      key: "session_timeout",
      value: "3600",
      type: "number",
      description: "用户会话超时时间（秒）",
    },
  ]

  // 模拟操作日志
  const operationLogs = [
    {
      id: 1,
      username: "admin",
      operation: "登录系统",
      ip: "192.168.1.100",
      status: "成功",
      createTime: "2024-03-20 10:30:15",
    },
    {
      id: 2,
      username: "zhangsan",
      operation: "修改用户信息",
      ip: "192.168.1.101",
      status: "成功",
      createTime: "2024-03-20 10:25:22",
    },
    {
      id: 3,
      username: "lisi",
      operation: "删除角色",
      ip: "192.168.1.102",
      status: "失败",
      createTime: "2024-03-20 10:20:11",
    },
    {
      id: 4,
      username: "admin",
      operation: "系统备份",
      ip: "192.168.1.100",
      status: "成功",
      createTime: "2024-03-20 10:15:08",
    },
    {
      id: 5,
      username: "wangwu",
      operation: "导出数据",
      ip: "192.168.1.103",
      status: "成功",
      createTime: "2024-03-20 10:10:33",
    },
  ]

  const getStatusBadge = (status: string) => {
    return status === "成功" ? (
      <Badge className="bg-green-100 text-green-800">成功</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">失败</Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* 系统基础信息 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">系统版本</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">v1.0.0</div>
            <p className="text-xs text-muted-foreground">稳定版</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">在线用户</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">当前活跃</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">系统运行时间</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">过去30天</p>
          </CardContent>
        </Card>
      </div>

      {/* 系统参数设置 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>系统参数设置</CardTitle>
              <CardDescription>
                配置系统的基础参数和运行选项
              </CardDescription>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              保存设置
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {systemSettings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{setting.name}</h4>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded">{setting.key}</code>
                </div>
                <div className="flex items-center space-x-2">
                  {setting.type === "boolean" ? (
                    <Switch defaultChecked={setting.value === "true"} />
                  ) : (
                    <Input
                      defaultValue={setting.value}
                      className="w-32"
                      type={setting.type}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 操作日志 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>操作日志</CardTitle>
              <CardDescription>
                查看系统用户的操作记录
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜索用户/操作"
                  className="pl-10 w-full sm:w-[300px]"
                />
              </div>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                刷新
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户名</TableHead>
                <TableHead>操作类型</TableHead>
                <TableHead>IP地址</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作时间</TableHead>
                <TableHead className="w-[100px]">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operationLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.username}</TableCell>
                  <TableCell>{log.operation}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell>{log.createTime}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>操作</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>查看详情</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 系统工具 */}
      <Card>
        <CardHeader>
          <CardTitle>系统工具</CardTitle>
          <CardDescription>
            系统维护和管理工具
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <Database className="h-6 w-6 mb-2" />
              数据备份
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <RefreshCw className="h-6 w-6 mb-2" />
              缓存清理
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="h-6 w-6 mb-2" />
              系统监控
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Bell className="h-6 w-6 mb-2" />
              通知设置
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}