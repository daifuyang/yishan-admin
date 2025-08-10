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
  Building,
  Users,
  Trash2,
} from "lucide-react";

export interface Department {
  id: string;
  name: string;
  code: string;
  parent: string;
  leader: string;
  userCount: number;
  status: string;
  description: string;
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

export const columns: ProColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: "部门名称",
    valueType: "text",
    ellipsis: true,
  },
  {
    accessorKey: "code",
    header: "部门编码",
    valueType: "text",
    ellipsis: true,
    copyable: true,
    render: (text: any, record: Department) => (
      <span className="font-mono text-sm">{text}</span>
    ),
  },
  {
    accessorKey: "parent",
    header: "上级部门",
    valueType: "select",
    ellipsis: true,
  },
  {
    accessorKey: "leader",
    header: "负责人",
    valueType: "text",
    ellipsis: true,
  },
  {
    accessorKey: "userCount",
    header: "人员数量",
    valueType: "text",
    hideInSearch: true,
    render: (text: any, record: Department) => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-gray-400" />
        {text}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "状态",
    valueType: "select",
    valueEnum: {
      normal: { text: "正常", status: "Success" },
      disabled: { text: "禁用", status: "Default" },
    },
    filters: true,
    render: (text: any, record: Department) => {
      return record.status === "正常" ? (
        <Badge variant="secondary" className="hover:bg-secondary/80">正常</Badge>
      ) : (
        <Badge variant="destructive" className="hover:bg-destructive/80">禁用</Badge>
      );
    },
  },
  {
    accessorKey: "description",
    header: "描述",
    valueType: "text",
    hideInSearch: true,
    ellipsis: true,
    render: (text: any, record: Department) => (
      <div className="max-w-[200px] truncate" title={text}>
        {text}
      </div>
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
    render: (text: any, record: Department, index?: number, action?: any) => (
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
            <DropdownMenuItem onClick={() => action?.onAddSubDepartment?.(record)}>
              <Building className="mr-2 h-4 w-4" />
              添加下级部门
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => action?.onViewUsers?.(record)}>
              <Users className="mr-2 h-4 w-4" />
              查看人员
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {record.status === "正常" ? (
              <DropdownMenuItem onClick={() => action?.onDisable?.(record)}>
                <Building className="mr-2 h-4 w-4" />
                禁用部门
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => action?.onEnable?.(record)}>
                <Building className="mr-2 h-4 w-4" />
                启用部门
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];