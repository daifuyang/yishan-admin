"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns, type Role, type ProColumnDef } from "./columns";
import { DataTable } from "./data-table";
import TableSearchForm, { ProColumnType } from "@/components/ui/table-search-form";
import { RoleFormDialog } from "./role-form-dialog";

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | undefined>(undefined);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    fetchRoles();
  }, []);

  // 根据搜索参数过滤角色
  const filteredRoles = roles.filter((role) => {
    return Object.entries(searchParams).every(([key, value]) => {
      if (!value) return true;
      const roleValue = role[key as keyof Role];
      if (typeof roleValue === 'string') {
        return roleValue.toLowerCase().includes(value.toLowerCase());
      }
      return roleValue === value;
    });
  });

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const mockRoles: Role[] = [
        {
          id: "1",
          name: "超级管理员",
          code: "admin",
          status: "正常",
          description: "系统最高权限管理员",
          userCount: 1,
          createTime: "2024-01-01 10:00:00",
          permissions: ["用户管理", "角色管理", "部门管理", "系统设置", "数据查看", "数据操作"],
        },
        {
          id: "2",
          name: "系统管理员",
          code: "system",
          status: "正常",
          description: "系统配置和管理员",
          userCount: 2,
          createTime: "2024-01-01 10:00:00",
          permissions: ["用户管理", "角色管理", "部门管理", "系统设置"],
        },
        {
          id: "3",
          name: "部门经理",
          code: "manager",
          status: "正常",
          description: "部门级别的管理人员",
          userCount: 4,
          createTime: "2024-01-15 14:30:00",
          permissions: ["用户管理", "数据查看"],
        },
        {
          id: "4",
          name: "普通员工",
          code: "user",
          status: "正常",
          description: "普通系统用户",
          userCount: 15,
          createTime: "2024-02-01 09:15:00",
          permissions: ["数据查看"],
        },
        {
          id: "5",
          name: "访客",
          code: "guest",
          status: "禁用",
          description: "只读访问用户",
          userCount: 0,
          createTime: "2024-02-15 16:45:00",
          permissions: ["基础查看"],
        }
      ];

      setRoles(mockRoles);
    } catch (error) {
      console.error("获取角色列表失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleFormSuccess = (roleData: Role, isEdit?: boolean) => {
    if (isEdit) {
      // 编辑模式：更新现有角色
      setRoles(prevRoles => 
        prevRoles.map(role => 
          role.id === roleData.id ? roleData : role
        )
      );
    } else {
      // 添加模式：添加新角色
      setRoles(prevRoles => [roleData, ...prevRoles]);
    }
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  // 计算统计数据
  const totalRoles = roles.length;
  const activeRoles = roles.filter(role => role.status === '正常').length;
  const disabledRoles = roles.filter(role => role.status === '禁用').length;
  const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);

  return (
    <div className="space-y-4">
      {/* 页面标题区域 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">角色管理</h1>
          <p className="text-muted-foreground">管理系统角色和权限配置</p>
        </div>
        <Button onClick={() => {
          setDialogMode('add');
          setEditingRole(undefined);
          setDialogOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          添加角色
        </Button>
      </div>

      {/* 角色统计 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{totalRoles}</div>
            <p className="text-sm text-muted-foreground">总角色数</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{activeRoles}</div>
            <p className="text-sm text-muted-foreground">正常角色</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{disabledRoles}</div>
            <p className="text-sm text-muted-foreground">禁用角色</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            <p className="text-sm text-muted-foreground">关联用户</p>
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
          data={filteredRoles} 
          action={{
            onEdit: handleEditRole
          }}
        />
      </Card>

      {/* 角色表单弹窗 */}
      <RoleFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleRoleFormSuccess}
        role={editingRole}
        mode={dialogMode}
      />
    </div>
  );
}