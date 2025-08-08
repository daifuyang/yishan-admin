export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* 数据概览卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="text-2xl font-bold leading-none">1,234</div>
            <p className="text-sm text-muted-foreground">总用户数</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="text-2xl font-bold leading-none">567</div>
            <p className="text-sm text-muted-foreground">活跃用户</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="text-2xl font-bold leading-none">89</div>
            <p className="text-sm text-muted-foreground">新增用户</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="text-2xl font-bold leading-none">98%</div>
            <p className="text-sm text-muted-foreground">系统可用性</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* 系统状态 */}
        <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              系统状态
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">CPU 使用率</span>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">内存使用</span>
                <span className="text-sm text-muted-foreground">2.1GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">磁盘空间</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">网络延迟</span>
                <span className="text-sm text-muted-foreground">12ms</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 最近活动 */}
        <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              最近活动
            </h3>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">系统正常运行</p>
                  <p className="text-xs text-muted-foreground">2分钟前</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">数据备份完成</p>
                  <p className="text-xs text-muted-foreground">1小时前</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">系统更新可用</p>
                  <p className="text-xs text-muted-foreground">3小时前</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm">用户登录活跃</p>
                  <p className="text-xs text-muted-foreground">5小时前</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            快速操作
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">用</span>
              </div>
              <div>
                <p className="font-medium">用户管理</p>
                <p className="text-xs text-muted-foreground">管理系统用户</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">角</span>
              </div>
              <div>
                <p className="font-medium">角色管理</p>
                <p className="text-xs text-muted-foreground">配置用户角色</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">部</span>
              </div>
              <div>
                <p className="font-medium">部门管理</p>
                <p className="text-xs text-muted-foreground">组织架构管理</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-semibold text-sm">设</span>
              </div>
              <div>
                <p className="font-medium">系统设置</p>
                <p className="text-xs text-muted-foreground">系统参数配置</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}