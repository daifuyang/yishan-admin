"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns, type Department, type ProColumnDef } from "./columns";
import { DataTable } from "./data-table";
import TableSearchForm, { ProColumnType } from "@/components/ui/table-search-form";
import { DepartmentFormDialog } from "./department-form-dialog";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | undefined>(undefined);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [parentDepartment, setParentDepartment] = useState<Department | undefined>();

  useEffect(() => {
    fetchDepartments();
  }, []);

  // 根据搜索参数过滤部门
  const filteredDepartments = departments.filter((department) => {
    return Object.entries(searchParams).every(([key, value]) => {
      if (!value) return true;
      const departmentValue = department[key as keyof Department];
      if (typeof departmentValue === 'string') {
        return departmentValue.toLowerCase().includes(value.toLowerCase());
      }
      return departmentValue === value;
    });
  });

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const mockDepartments: Department[] = [
    {
      id: "1",
      name: "技术部",
      code: "TECH",
      parent: "-",
      leader: "张三",
      userCount: 25,
      status: "正常",
      description: "负责公司技术研发工作",
      createTime: "2024-01-15 10:30:00",
    },
    {
      id: "2",
      name: "产品部",
      code: "PROD",
      parent: "-",
      leader: "李四",
      userCount: 12,
      status: "正常",
      description: "负责产品设计和规划",
      createTime: "2024-01-16 14:20:00",
    },
    {
      id: "3",
      name: "市场部",
      code: "MKT",
      parent: "-",
      leader: "王五",
      userCount: 18,
      status: "正常",
      description: "负责市场推广和销售",
      createTime: "2024-01-17 09:15:00",
    },
    {
      id: "4",
      name: "人事部",
      code: "HR",
      parent: "-",
      leader: "赵六",
      userCount: 8,
      status: "正常",
      description: "负责人力资源管理",
      createTime: "2024-01-18 11:45:00",
    },
    {
      id: "5",
      name: "财务部",
      code: "FIN",
      parent: "-",
      leader: "钱七",
      userCount: 6,
      status: "禁用",
      description: "负责财务管理和会计工作",
      createTime: "2024-01-19 16:30:00",
    },
    ];

      setDepartments(mockDepartments);
    } catch (error) {
      console.error("获取部门列表失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentFormSuccess = (departmentData: Department, isEdit?: boolean) => {
    if (isEdit) {
      // 编辑模式：更新现有部门
      setDepartments(prevDepartments => 
        prevDepartments.map(department => 
          department.id === departmentData.id ? departmentData : department
        )
      );
    } else {
      // 添加模式：添加新部门
      setDepartments(prevDepartments => [departmentData, ...prevDepartments]);
    }
  };

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleAddSubDepartment = (department: Department) => {
    setParentDepartment(department);
    setDialogMode('add');
    setEditingDepartment(undefined);
    setDialogOpen(true);
  };

  const handleDeleteDepartment = (department: Department) => {
    if (confirm(`确定要删除部门 "${department.name}" 吗？`)) {
      setDepartments(prev => prev.filter(d => d.id !== department.id));
    }
  };

  const handleToggleStatus = (department: Department) => {
    const newStatus = department.status === "正常" ? "禁用" : "正常";
    const updatedDepartment = { ...department, status: newStatus };
    setDepartments(prev => prev.map(d => d.id === department.id ? updatedDepartment : d));
  };

  const handleViewDepartment = (department: Department) => {
    alert(`查看部门详情: ${department.name}`);
  };

  const handleViewUsers = (department: Department) => {
    alert(`查看部门人员: ${department.name}`);
  };

  // 计算统计数据
  const totalDepartments = departments.length;
  const activeDepartments = departments.filter(d => d.status === "正常").length;
  const disabledDepartments = departments.filter(d => d.status === "禁用").length;
  const totalUsers = departments.reduce((sum, d) => sum + d.userCount, 0);

  return (
    <div className="space-y-4">
      {/* 页面标题区域 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">部门管理</h1>
          <p className="text-muted-foreground">管理组织架构和部门信息</p>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => {
            setDialogMode('add');
            setEditingDepartment(undefined);
            setParentDepartment(undefined);
            setDialogOpen(true);
          }}>
            <Plus className="w-4 h-4 mr-2" />
            添加部门
          </Button>
        </div>
      </div>

      {/* 部门统计 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{totalDepartments}</div>
            <p className="text-sm text-muted-foreground">总部门数</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{activeDepartments}</div>
            <p className="text-sm text-muted-foreground">正常部门</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{disabledDepartments}</div>
            <p className="text-sm text-muted-foreground">禁用部门</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            <p className="text-sm text-muted-foreground">总人员数</p>
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
          data={filteredDepartments} 
          action={{
            onView: handleViewDepartment,
            onEdit: handleEditDepartment,
            onDelete: handleDeleteDepartment,
            onAddSubDepartment: handleAddSubDepartment,
            onViewUsers: handleViewUsers,
            onDisable: (department: Department) => handleToggleStatus(department),
            onEnable: (department: Department) => handleToggleStatus(department),
          }}
        />
      </Card>

      {/* 部门表单弹窗 */}
      <DepartmentFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleDepartmentFormSuccess}
        department={editingDepartment}
        mode={dialogMode}
        parentDepartment={parentDepartment}
      />
    </div>
  );
}