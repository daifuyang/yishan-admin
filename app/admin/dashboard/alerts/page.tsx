'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Bell, 
  Settings, 
  Filter,
  Search,
  RefreshCw,
  Eye,
  EyeOff,
  Trash2,
  Archive
} from "lucide-react";
import { useState } from "react";

type AlertLevel = 'critical' | 'warning' | 'info';
type AlertStatus = 'active' | 'resolved' | 'acknowledged';

interface Alert {
  id: string;
  title: string;
  description: string;
  level: AlertLevel;
  status: AlertStatus;
  timestamp: string;
  source: string;
  category: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'CPU使用率过高',
    description: '服务器CPU使用率持续超过90%，可能影响系统性能',
    level: 'critical',
    status: 'active',
    timestamp: '2024-01-15 15:30:25',
    source: 'system-monitor',
    category: '系统资源'
  },
  {
    id: '2',
    title: '数据库连接异常',
    description: '数据库连接池耗尽，新的连接请求被拒绝',
    level: 'critical',
    status: 'active',
    timestamp: '2024-01-15 15:25:18',
    source: 'database',
    category: '数据库'
  },
  {
    id: '3',
    title: '内存使用率告警',
    description: '系统内存使用率达到85%，建议检查内存占用情况',
    level: 'warning',
    status: 'acknowledged',
    timestamp: '2024-01-15 15:20:42',
    source: 'system-monitor',
    category: '系统资源'
  },
  {
    id: '4',
    title: '磁盘空间不足',
    description: '/var/log 目录磁盘使用率达到95%，需要清理日志文件',
    level: 'warning',
    status: 'active',
    timestamp: '2024-01-15 15:15:30',
    source: 'system-monitor',
    category: '存储'
  },
  {
    id: '5',
    title: '用户登录异常',
    description: '检测到来自异常IP的多次登录尝试',
    level: 'warning',
    status: 'active',
    timestamp: '2024-01-15 15:10:15',
    source: 'security',
    category: '安全'
  },
  {
    id: '6',
    title: '系统备份完成',
    description: '定时数据备份任务已成功完成',
    level: 'info',
    status: 'resolved',
    timestamp: '2024-01-15 14:30:00',
    source: 'backup-service',
    category: '备份'
  }
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filterLevel, setFilterLevel] = useState<AlertLevel | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<AlertStatus | 'all'>('all');

  const filteredAlerts = alerts.filter(alert => {
    const levelMatch = filterLevel === 'all' || alert.level === filterLevel;
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    return levelMatch && statusMatch;
  });

  const getAlertIcon = (level: AlertLevel) => {
    switch (level) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getAlertBadge = (level: AlertLevel) => {
    switch (level) {
      case 'critical':
        return <Badge variant="destructive">严重</Badge>;
      case 'warning':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">警告</Badge>;
      case 'info':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">信息</Badge>;
    }
  };

  const getStatusBadge = (status: AlertStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="text-red-600 border-red-600">活跃</Badge>;
      case 'acknowledged':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">已确认</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="text-green-600 border-green-600">已解决</Badge>;
    }
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'acknowledged' as AlertStatus } : alert
    ));
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' as AlertStatus } : alert
    ));
  };

  const activeAlertsCount = alerts.filter(alert => alert.status === 'active').length;
  const criticalAlertsCount = alerts.filter(alert => alert.level === 'critical' && alert.status === 'active').length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">实时告警</h2>
          <p className="text-muted-foreground">
            系统告警监控和事件管理中心
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            刷新
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            告警设置
          </Button>
        </div>
      </div>

      {/* 告警统计 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃告警</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activeAlertsCount}</div>
            <p className="text-xs text-muted-foreground">
              需要立即处理
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">严重告警</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalAlertsCount}</div>
            <p className="text-xs text-muted-foreground">
              高优先级处理
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日告警</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              比昨日减少 12%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均响应时间</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">3.2分钟</div>
            <p className="text-xs text-muted-foreground">
              处理效率良好
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 筛选和搜索 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            告警筛选
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">告警级别:</span>
              <div className="flex gap-2">
                <Button 
                  variant={filterLevel === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterLevel('all')}
                >
                  全部
                </Button>
                <Button 
                  variant={filterLevel === 'critical' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterLevel('critical')}
                >
                  严重
                </Button>
                <Button 
                  variant={filterLevel === 'warning' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterLevel('warning')}
                >
                  警告
                </Button>
                <Button 
                  variant={filterLevel === 'info' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterLevel('info')}
                >
                  信息
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">状态:</span>
              <div className="flex gap-2">
                <Button 
                  variant={filterStatus === 'all' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  全部
                </Button>
                <Button 
                  variant={filterStatus === 'active' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterStatus('active')}
                >
                  活跃
                </Button>
                <Button 
                  variant={filterStatus === 'acknowledged' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterStatus('acknowledged')}
                >
                  已确认
                </Button>
                <Button 
                  variant={filterStatus === 'resolved' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setFilterStatus('resolved')}
                >
                  已解决
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 告警列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            告警列表
          </CardTitle>
          <CardDescription>
            显示 {filteredAlerts.length} 条告警记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.level)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        {getAlertBadge(alert.level)}
                        {getStatusBadge(alert.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.timestamp}
                        </span>
                        <span>来源: {alert.source}</span>
                        <span>分类: {alert.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {alert.status === 'active' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAcknowledge(alert.id)}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          确认
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResolve(alert.id)}
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          解决
                        </Button>
                      </>
                    )}
                    {alert.status === 'acknowledged' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleResolve(alert.id)}
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        解决
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Archive className="mr-1 h-3 w-3" />
                      归档
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}