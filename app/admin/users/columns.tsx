"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Key,
  UserCheck,
  UserX,
  Trash2,
} from "lucide-react";

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: string;
  createTime: string;
}

// ProTable 列配置类型
export type ProColumnDef<TData> = ColumnDef<TData> & {
  // ProTable 特有属性
  title?: string;
  dataIndex?: string;
  valueType?:
    | "text"
    | "select"
    | "date"
    | "dateTime"
    | "dateRange"
    | "time"
    | "option"
    | "index"
    | "indexBorder";
  valueEnum?: Record<
    string,
    {
      text: string;
      status?: "Success" | "Error" | "Processing" | "Warning" | "Default";
    }
  >;
  hideInSearch?: boolean;
  hideInTable?: boolean;
  order?: number;
  sorter?: boolean | ((a: any, b: any) => number);
  filters?: boolean;
  ellipsis?: boolean;
  copyable?: boolean;
  fieldProps?: Record<string, any>;
  renderFormItem?: (
    item: any,
    props: { value: any; onChange: (value: any) => void }
  ) => React.ReactNode;
  render?: (
    text: any,
    record: TData,
    index?: number,
    action?: any
  ) => React.ReactNode | React.ReactNode[];
};

export const columns: ProColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "用户名",
    valueType: "text",
    ellipsis: true,
    copyable: true,
  },
  {
    accessorKey: "name",
    header: "姓名",
    valueType: "text",
    ellipsis: true,
  },
  {
    accessorKey: "department",
    header: "部门",
    valueType: "select",
    ellipsis: true,
  },
  {
    accessorKey: "role",
    header: "角色",
    valueType: "select",
    valueEnum: {
      admin: { text: "管理员", status: "Processing" },
      user: { text: "普通用户", status: "Default" },
      editor: { text: "编辑", status: "Success" },
    },
    render: (text: any, record: User) => {
      const getRoleStyle = (role: string) => {
        switch (role) {
          case "管理员":
            return "text-blue-700 bg-blue-50 border-blue-200";
          case "编辑":
            return "text-purple-700 bg-purple-50 border-purple-200";
          default:
            return "text-gray-700 bg-gray-50 border-gray-200";
        }
      };
      return (
        <Badge variant="outline" className={getRoleStyle(record.role)}>
          {record.role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "状态",
    valueType: "select",
    valueEnum: {
      active: { text: "启用", status: "Success" },
      inactive: { text: "禁用", status: "Default" },
    },
    filters: true,
    render: (text: any, record: User) => {
      const variant = record.status === "正常" ? "default" : "secondary";
      const color = record.status === "正常" ? "text-green-700 bg-green-50 border-green-200" : "text-gray-700 bg-gray-50 border-gray-200";
      return (
        <Badge variant={variant} className={color}>
          {record.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "email",
    header: "邮箱",
    valueType: "text",
    ellipsis: true,
    copyable: true,
  },
  {
    accessorKey: "phone",
    header: "电话",
    valueType: "text",
    hideInSearch: true,
    ellipsis: true,
    copyable: true,
  },
  {
    accessorKey: "createTime",
    header: "创建时间",
    valueType: "dateTime",
    hideInSearch: true,
    sorter: true,
    ellipsis: true,
  },
  {
    id: "actions",
    header: "操作",
    valueType: "option",
    hideInSearch: true,
    enableHiding: false,
    render: (text: any, record: User, index?: number, action?: any) => (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => action?.onView?.(record)}
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">查看详情</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => action?.onEdit?.(record)}
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">编辑</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => action?.onDelete?.(record)}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">删除</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">更多操作</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => action?.onResetPassword?.(record)}>
              <Key className="mr-2 h-4 w-4" />
              重置密码
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {record.status === "active" ? (
              <DropdownMenuItem onClick={() => action?.onDisable?.(record)}>
                <UserX className="mr-2 h-4 w-4" />
                禁用用户
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => action?.onEnable?.(record)}>
                <UserCheck className="mr-2 h-4 w-4" />
                启用用户
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
