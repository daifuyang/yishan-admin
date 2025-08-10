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
  Shield,
  Users,
  Trash2,
} from "lucide-react";

export interface Role {
  id: string;
  name: string;
  code: string;
  status: string;
  description: string;
  userCount: number;
  createTime: string;
  permissions: string[];
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

export const columns: ProColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "角色名称",
    valueType: "text",
    ellipsis: true,
  },
  {
    accessorKey: "code",
    header: "角色编码",
    valueType: "text",
    ellipsis: true,
    copyable: true,
    render: (text: any) => (
      <span className="font-mono text-sm">{text}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "状态",
    valueType: "select",
    valueEnum: {
      "正常": { text: "正常", status: "Success" },
      "禁用": { text: "禁用", status: "Error" },
    },
    filters: true,
    render: (text: any) => {
      return text === "正常" ? (
        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">正常</Badge>
      ) : (
        <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">禁用</Badge>
      );
    },
  },
  {
    accessorKey: "userCount",
    header: "用户数量",
    valueType: "text",
    hideInSearch: true,
    sorter: true,
    render: (text: any) => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-gray-400" />
        {text}
      </div>
    ),
  },
  {
    accessorKey: "permissions",
    header: "权限",
    valueType: "text",
    hideInSearch: true,
    ellipsis: true,
    render: (text: any, record: Role) => {
      const permissions = record.permissions || [];
      return (
        <div className="flex flex-wrap gap-1">
          {permissions.slice(0, 3).map((permission, index) => (
            <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
              {permission}
            </Badge>
          ))}
          {permissions.length > 3 && (
            <Badge className="bg-gray-100 text-gray-800 text-xs">
              +{permissions.length - 3}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "描述",
    valueType: "text",
    hideInSearch: true,
    ellipsis: true,
    render: (text: any) => (
      <span className="max-w-[200px] truncate block">{text}</span>
    ),
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
    render: (text: any, record: Role, index?: number, action?: any) => (
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
            <DropdownMenuItem onClick={() => action?.onPermissions?.(record)}>
              <Shield className="mr-2 h-4 w-4" />
              权限设置
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => action?.onAssignUsers?.(record)}>
              <Users className="mr-2 h-4 w-4" />
              用户分配
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];