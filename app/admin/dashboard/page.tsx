'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  UserPlus, 
  Activity, 
  Server, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  UserCheck,
  Building
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="py-6 space-y-6">
      {/* 核心指标面板 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* 用户数据 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总用户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              较上月增长
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,967</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.2%
              </span>
              较上周增长
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">新增用户</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.1%
              </span>
              较昨日下降
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">系统负载</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <Progress value={45} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              CPU使用率正常
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 可视化图表区域 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* 趋势分析图表 */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              用户增长趋势
            </CardTitle>
            <CardDescription>
              过去30天的用户增长情况
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">图表组件占位</p>
                <p className="text-xs text-muted-foreground">实际项目中可集成 Chart.js 或 Recharts</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-green-600">+15.2%</div>
                <div className="text-xs text-muted-foreground">月增长率</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-blue-600">2,847</div>
                <div className="text-xs text-muted-foreground">本月新增</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-purple-600">89.3%</div>
                <div className="text-xs text-muted-foreground">留存率</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 实时告警 */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                实时告警
              </span>
              <Link href="/admin/dashboard/alerts">
                <Button variant="outline" size="sm">查看全部</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">CPU使用率过高</p>
                  <p className="text-xs text-red-600">当前85% - 2分钟前</p>
                </div>
                <Badge variant="destructive">紧急</Badge>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800">响应时间异常</p>
                  <p className="text-xs text-yellow-600">平均2.3s - 5分钟前</p>
                </div>
                <Badge variant="secondary">重要</Badge>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">系统备份完成</p>
                  <p className="text-xs text-green-600">数据库备份 - 1小时前</p>
                </div>
                <Badge variant="outline">正常</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 智能洞察 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            智能洞察
          </CardTitle>
          <CardDescription>
            基于数据分析的系统运营建议
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">用户活跃度提升</span>
              </div>
              <p className="text-sm text-blue-700">
                检测到用户活跃度较上周提升18%，建议加强用户留存策略。
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">资源优化建议</span>
              </div>
              <p className="text-sm text-orange-700">
                系统负载在高峰期达到80%，建议考虑扩容或优化查询性能。
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">系统运行良好</span>
              </div>
              <p className="text-sm text-green-700">
                过去24小时系统运行稳定，可用性达到99.8%，表现优秀。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 快速操作中心 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            快速操作中心
          </CardTitle>
          <CardDescription>
            常用功能快捷入口和待办事项提醒
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/users" className="block">
              <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors group">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">用户管理</p>
                  <p className="text-xs text-muted-foreground">管理系统用户</p>
                </div>
              </div>
            </Link>
            
            <Link href="/admin/roles" className="block">
              <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors group">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">角色管理</p>
                  <p className="text-xs text-muted-foreground">配置用户角色</p>
                </div>
              </div>
            </Link>
            
            <Link href="/admin/departments" className="block">
              <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors group">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">部门管理</p>
                  <p className="text-xs text-muted-foreground">组织架构管理</p>
                </div>
              </div>
            </Link>
            
            <Link href="/admin/settings" className="block">
              <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors group">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <Settings className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">系统设置</p>
                  <p className="text-xs text-muted-foreground">系统参数配置</p>
                </div>
              </div>
            </Link>
          </div>
          
          {/* 待办事项提醒 */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              待办事项
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">3个用户待审核</span>
                </div>
                <Link href="/admin/users">
                  <Button variant="outline" size="sm">处理</Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">系统更新可用</span>
                </div>
                <Link href="/admin/settings">
                  <Button variant="outline" size="sm">查看</Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">数据备份已完成</span>
                </div>
                <Badge variant="outline">已完成</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}