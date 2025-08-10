'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Database, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  Download,
  Upload,
  Clock
} from "lucide-react";

export default function SystemMonitorPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">系统监控</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新数据
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 系统资源监控 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU使用率</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">正常</span> • 8核心运行中
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">内存使用率</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <Progress value={72} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-yellow-600">注意</span> • 14.4GB / 20GB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">磁盘使用率</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45%</div>
            <Progress value={45} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">正常</span> • 450GB / 1TB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">网络延迟</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12ms</div>
            <div className="flex items-center mt-2">
              <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">优秀</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              平均响应时间
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 服务状态监控 */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              服务状态监控
            </CardTitle>
            <CardDescription>
              关键服务运行状态实时监控
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium">Web服务器</p>
                    <p className="text-sm text-muted-foreground">Nginx 1.20.2</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  运行中
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium">数据库服务</p>
                    <p className="text-sm text-muted-foreground">MySQL 8.0.32</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  运行中
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium">缓存服务</p>
                    <p className="text-sm text-muted-foreground">Redis 7.0.8</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  重启中
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium">消息队列</p>
                    <p className="text-sm text-muted-foreground">RabbitMQ 3.11.10</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  运行中
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              数据库性能
            </CardTitle>
            <CardDescription>
              数据库连接和查询性能监控
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <p className="text-sm text-muted-foreground">活跃连接</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">23ms</div>
                  <p className="text-sm text-muted-foreground">平均查询时间</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">查询缓存命中率</span>
                  <span className="text-sm font-medium">94.2%</span>
                </div>
                <Progress value={94.2} />

                <div className="flex justify-between items-center">
                  <span className="text-sm">慢查询比例</span>
                  <span className="text-sm font-medium">0.8%</span>
                </div>
                <Progress value={0.8} className="[&>div]:bg-red-500" />

                <div className="flex justify-between items-center">
                  <span className="text-sm">连接池使用率</span>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <Progress value={62} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 网络流量监控 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            网络流量监控
          </CardTitle>
          <CardDescription>
            实时网络流量和带宽使用情况
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Download className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">入站流量</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">2.4 MB/s</div>
              <p className="text-xs text-muted-foreground mt-1">峰值: 5.2 MB/s</p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Upload className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">出站流量</span>
              </div>
              <div className="text-2xl font-bold text-green-600">1.8 MB/s</div>
              <p className="text-xs text-muted-foreground mt-1">峰值: 3.9 MB/s</p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">带宽使用率</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">42%</div>
              <Progress value={42} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 系统日志 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            最近系统事件
          </CardTitle>
          <CardDescription>
            系统运行日志和重要事件记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">系统备份完成</p>
                <p className="text-xs text-muted-foreground">数据库备份已成功完成，备份文件大小: 2.3GB</p>
                <p className="text-xs text-muted-foreground mt-1">2024-01-15 14:30:25</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">内存使用率告警</p>
                <p className="text-xs text-muted-foreground">系统内存使用率达到75%，建议检查内存占用情况</p>
                <p className="text-xs text-muted-foreground mt-1">2024-01-15 14:25:18</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">服务重启完成</p>
                <p className="text-xs text-muted-foreground">Redis缓存服务重启完成，服务运行正常</p>
                <p className="text-xs text-muted-foreground mt-1">2024-01-15 14:20:42</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border rounded-lg">
              <Activity className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">系统更新检查</p>
                <p className="text-xs text-muted-foreground">发现新的系统更新版本 v2.1.3，包含安全补丁和性能优化</p>
                <p className="text-xs text-muted-foreground mt-1">2024-01-15 14:15:30</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}