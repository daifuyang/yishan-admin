"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { DataTable } from "./data-table";
import { columns, Position } from "./columns";
import { PositionFormDialog } from "./position-form-dialog";
import TableSearchForm, { ProColumnType } from "@/components/ui/table-search-form";

// 模拟岗位数据
const mockPositions: Position[] = [
  {
    id: "1",
    name: "前端开发工程师",
    code: "FE001",
    department: "技术部",
    level: "P2",
    description: "负责前端页面开发和用户交互优化",
    requirements: "熟练掌握React、Vue等前端框架，具备良好的编程基础",
    userCount: 8,
    status: "正常",
    createTime: "2024-01-15 10:30:00",
  },
  {
    id: "2",
    name: "后端开发工程师",
    code: "BE001",
    department: "技术部",
    level: "P3",
    description: "负责后端服务开发和系统架构设计",
    requirements: "熟练掌握Java、Python等后端语言，具备分布式系统经验",
    userCount: 12,
    status: "正常",
    createTime: "2024-01-10 14:20:00",
  },
  {
    id: "3",
    name: "产品经理",
    code: "PM001",
    department: "产品部",
    level: "P3",
    description: "负责产品规划和需求分析",
    requirements: "具备产品思维和用户体验意识，熟悉产品设计流程",
    userCount: 5,
    status: "正常",
    createTime: "2024-01-08 09:15:00",
  },
  {
    id: "4",
    name: "UI设计师",
    code: "UI001",
    department: "设计部",
    level: "P2",
    description: "负责界面设计和视觉效果优化",
    requirements: "熟练使用Figma、Sketch等设计工具，具备良好的审美能力",
    userCount: 3,
    status: "正常",
    createTime: "2024-01-05 16:45:00",
  },
  {
    id: "5",
    name: "技术总监",
    code: "TD001",
    department: "技术部",
    level: "M3",
    description: "负责技术团队管理和技术决策",
    requirements: "具备丰富的技术管理经验和团队领导能力",
    userCount: 1,
    status: "正常",
    createTime: "2024-01-01 08:00:00",
  },
  {
    id: "6",
    name: "测试工程师",
    code: "QA001",
    department: "技术部",
    level: "P2",
    description: "负责软件测试和质量保证",
    requirements: "熟悉测试流程和自动化测试工具",
    userCount: 4,
    status: "禁用",
    createTime: "2023-12-20 11:30:00",
  },
];

export default function PositionsPage() {
  const [positions, setPositions] = React.useState<Position[]>(mockPositions);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingPosition, setEditingPosition] = React.useState<Position | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState({});

  // 处理编辑岗位
  const handleEditPosition = (position: Position) => {
    setEditingPosition(position);
    setDialogOpen(true);
  };

  // 处理删除岗位
  const handleDeletePosition = (position: Position) => {
    if (position.userCount > 0) {
      toast.error(`无法删除岗位"${position.name}"，该岗位下还有${position.userCount}名员工`);
      return;
    }
    
    setPositions(prev => prev.filter(p => p.id !== position.id));
    toast.success(`岗位"${position.name}"已删除`);
  };

  // 处理查看岗位详情
  const handleViewPosition = (position: Position) => {
    toast.info(`查看岗位"${position.name}"详情`);
  };

  // 处理查看岗位人员
  const handleViewUsers = (position: Position) => {
    toast.info(`查看岗位"${position.name}"下的${position.userCount}名员工`);
  };

  // 处理禁用岗位
  const handleDisablePosition = (position: Position) => {
    if (position.userCount > 0) {
      toast.error(`无法禁用岗位"${position.name}"，该岗位下还有${position.userCount}名员工`);
      return;
    }
    
    setPositions(prev => 
      prev.map(p => 
        p.id === position.id ? { ...p, status: "禁用" } : p
      )
    );
    toast.success(`岗位"${position.name}"已禁用`);
  };

  // 处理启用岗位
  const handleEnablePosition = (position: Position) => {
    setPositions(prev => 
      prev.map(p => 
        p.id === position.id ? { ...p, status: "正常" } : p
      )
    );
    toast.success(`岗位"${position.name}"已启用`);
  };

  // 处理表单提交
  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (editingPosition) {
        // 更新岗位
        setPositions(prev => 
          prev.map(p => 
            p.id === editingPosition.id 
              ? { 
                  ...p, 
                  ...data,
                  userCount: p.userCount, // 保持原有人数
                  createTime: p.createTime, // 保持原有创建时间
                }
              : p
          )
        );
        toast.success(`岗位"${data.name}"更新成功`);
      } else {
        // 新增岗位
        const newPosition: Position = {
          id: Date.now().toString(),
          ...data,
          userCount: 0,
          createTime: new Date().toLocaleString('zh-CN'),
        };
        setPositions(prev => [newPosition, ...prev]);
        toast.success(`岗位"${data.name}"创建成功`);
      }
      
      setDialogOpen(false);
      setEditingPosition(null);
    } catch (error) {
      toast.error("操作失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  // 根据搜索参数过滤数据
  const filteredPositions = React.useMemo(() => {
    if (!searchParams || Object.keys(searchParams).length === 0) {
      return positions;
    }

    return positions.filter(position => {
      return Object.entries(searchParams).every(([key, value]) => {
        if (!value || value === '') return true;
        
        switch (key) {
          case 'name':
            return position.name.toLowerCase().includes(String(value).toLowerCase());
          case 'code':
            return position.code.toLowerCase().includes(String(value).toLowerCase());
          case 'department':
            return position.department.toLowerCase().includes(String(value).toLowerCase());
          case 'level':
            return position.level === value;
          case 'status':
            return position.status === value;
          case 'description':
            return position.description?.toLowerCase().includes(String(value).toLowerCase());
          default:
            return true;
        }
      });
    });
  }, [positions, searchParams]);

  // 计算统计数据
  const totalPositions = filteredPositions.length;
  const activePositions = filteredPositions.filter(p => p.status === "正常").length;
  const totalUsers = filteredPositions.reduce((sum, p) => sum + p.userCount, 0);
  const avgUsersPerPosition = totalPositions > 0 ? Math.round(totalUsers / totalPositions * 10) / 10 : 0;

  return (
    <div className="space-y-6">
      {/* 页面标题和操作 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">岗位管理</h1>
          <p className="text-muted-foreground mt-2">
            管理组织架构中的岗位信息，包括岗位设置、人员分配等
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            添加岗位
          </Button>
        </div>
      </div>

      {/* 岗位统计 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{totalPositions}</div>
            <p className="text-sm text-muted-foreground">岗位总数</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{activePositions}</div>
            <p className="text-sm text-muted-foreground">活跃岗位</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            <p className="text-sm text-muted-foreground">在职人员</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">{avgUsersPerPosition}</div>
            <p className="text-sm text-muted-foreground">平均人数</p>
          </CardContent>
        </Card>
      </div>

      {/* 搜索表单 */}
      <div>
        <TableSearchForm
          columns={columns}
          onSearch={setSearchParams}
          onReset={() => setSearchParams({})}
          defaultCollapsed={true}
          layout="horizontal"
          labelWidth={80}
          hideRequiredMark={true}
          split={false}
          preserve={true}
          className=""
        />
      </div>

      {/* 数据表格 */}
      <Card className="p-0 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={filteredPositions} 
          onView={handleViewPosition}
          onEdit={handleEditPosition}
          onDelete={handleDeletePosition}
          onViewUsers={handleViewUsers}
          onDisable={handleDisablePosition}
          onEnable={handleEnablePosition}
        />
      </Card>

      {/* 岗位表单弹窗 */}
      <PositionFormDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingPosition(null);
          }
        }}
        position={editingPosition}
        onSubmit={handleFormSubmit}
        loading={loading}
      />
    </div>
  );
}