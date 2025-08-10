"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns, type User, type ProColumnDef } from "./columns";
import { DataTable } from "./data-table";
import TableSearchForm, { ProColumnType } from "@/components/ui/table-search-form";
import { UserFormDialog } from "./user-form-dialog";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    fetchUsers();
  }, []);

  // 根据搜索参数过滤用户
  const filteredUsers = users.filter((user) => {
    return Object.entries(searchParams).every(([key, value]) => {
      if (!value) return true;
      const userValue = user[key as keyof User];
      if (typeof userValue === 'string') {
        return userValue.toLowerCase().includes(value.toLowerCase());
      }
      return userValue === value;
    });
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const mockUsers: User[] = [
        {
          id: "1",
          username: "admin",
          name: "管理员",
          email: "admin@example.com",
          phone: "13800138000",
          department: "技术部",
          role: "超级管理员",
          status: "正常",
          createTime: "2024-01-01"
        },
        {
          id: "2",
          username: "user001",
          name: "张三",
          email: "zhangsan@example.com",
          phone: "13800138001",
          department: "产品部",
          role: "普通用户",
          status: "正常",
          createTime: "2024-01-02"
        },
        {
          id: "3",
          username: "user002",
          name: "李四",
          email: "lisi@example.com",
          phone: "13800138002",
          department: "运营部",
          role: "运营专员",
          status: "禁用",
          createTime: "2024-01-03"
        },
        {
          id: "4",
          username: "user003",
          name: "王五",
          email: "wangwu@example.com",
          phone: "13800138003",
          department: "财务部",
          role: "财务专员",
          status: "正常",
          createTime: "2024-01-04"
        },
        {
          id: "5",
          username: "user004",
          name: "赵六",
          email: "zhaoliu@example.com",
          phone: "13800138004",
          department: "人事部",
          role: "人事专员",
          status: "正常",
          createTime: "2024-01-05"
        }
      ];

      setUsers(mockUsers);
    } catch (error) {
      console.error("获取用户列表失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserFormSuccess = (userData: User, isEdit?: boolean) => {
    if (isEdit) {
      // 编辑模式：更新现有用户
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userData.id ? userData : user
        )
      );
    } else {
      // 添加模式：添加新用户
      setUsers(prevUsers => [userData, ...prevUsers]);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  // 计算统计数据
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === '正常').length;
  const disabledUsers = users.filter(user => user.status === '禁用').length;
  const newUsersThisMonth = users.filter(user => {
    const createDate = new Date(user.createTime);
    const now = new Date();
    return createDate.getMonth() === now.getMonth() && createDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="space-y-4">
      {/* 页面标题区域 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
          <p className="text-muted-foreground">管理系统用户信息和权限</p>
        </div>
        <Button onClick={() => {
          setDialogMode('add');
          setEditingUser(undefined);
          setDialogOpen(true);
        }}>
          <Plus className="w-4 h-4 mr-2" />
          添加用户
        </Button>
      </div>

      {/* 用户统计 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-sm text-muted-foreground">总用户数</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            <p className="text-sm text-muted-foreground">活跃用户</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-red-600">{disabledUsers}</div>
            <p className="text-sm text-muted-foreground">禁用用户</p>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">{newUsersThisMonth}</div>
            <p className="text-sm text-muted-foreground">本月新增</p>
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
          data={filteredUsers} 
          action={{
            onEdit: handleEditUser
          }}
        />
      </Card>

      {/* 用户表单弹窗 */}
      <UserFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleUserFormSuccess}
        user={editingUser}
        mode={dialogMode}
      />
    </div>
  );
}
