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
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react";

export interface Position {
  id: string;
  name: string;
  code: string;
  department: string;
  level: string;
  description: string;
  requirements: string;
  userCount: number;
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

export const columns: ProColumnDef<Position>[] = [
  {
    accessorKey: "name",
    header: "岗位名称",
    valueType: "text",
    ellipsis: true,
  },
  {
    accessorKey: "code",
    header: "岗位编码",
    valueType: "text",
    ellipsis: true,
    copyable: true,
  },
  {
    accessorKey: "department",
    header: "所属部门",
    valueType: "select",
    ellipsis: true,
    valueEnum: {
      "技术部": { text: "技术部", status: "Success" },
      "产品部": { text: "产品部", status: "Processing" },
      "市场部": { text: "市场部", status: "Warning" },
      "销售部": { text: "销售部", status: "Default" },
      "人事部": { text: "人事部", status: "Success" },
      "财务部": { text: "财务部", status: "Processing" },
    },
  },
  {
    accessorKey: "level",
    header: "岗位级别",
    valueType: "select",
    valueEnum: {
      "P1": { text: "P1-初级", status: "Default" },
      "P2": { text: "P2-中级", status: "Processing" },
      "P3": { text: "P3-高级", status: "Success" },
      "P4": { text: "P4-专家", status: "Warning" },
      "M1": { text: "M1-主管", status: "Success" },
      "M2": { text: "M2-经理", status: "Success" },
      "M3": { text: "M3-总监", status: "Success" },
    },
    render: (text: any, record: Position) => {
      const levelConfig = {
        "P1": { text: "P1-初级", variant: "secondary" as const },
        "P2": { text: "P2-中级", variant: "outline" as const },
        "P3": { text: "P3-高级", variant: "default" as const },
        "P4": { text: "P4-专家", variant: "destructive" as const },
        "M1": { text: "M1-主管", variant: "default" as const },
        "M2": { text: "M2-经理", variant: "default" as const },
        "M3": { text: "M3-总监", variant: "default" as const },
      };
      const config = levelConfig[record.level as keyof typeof levelConfig];
      return config ? (
        <Badge variant={config.variant}>{config.text}</Badge>
      ) : (
        <span>{record.level}</span>
      );
    },
  },
  {
    accessorKey: "userCount",
    header: "在职人数",
    valueType: "text",
    hideInSearch: true,
    render: (text: any, record: Position) => (
      <span className="text-blue-600 font-medium">{record.userCount}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "状态",
    valueType: "select",
    valueEnum: {
      "正常": { text: "正常", status: "Success" },
      "禁用": { text: "禁用", status: "Default" },
    },
    filters: true,
    render: (text: any, record: Position) => {
      const variant = record.status === "正常" ? "default" : "secondary";
      return <Badge variant={variant}>{record.status}</Badge>;
    },
  },
  {
    accessorKey: "description",
    header: "岗位描述",
    valueType: "text",
    ellipsis: true,
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
    render: (text: any, record: Position, index?: number, action?: any) => (
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
            <DropdownMenuItem onClick={() => action?.onViewUsers?.(record)}>
              <UserCheck className="mr-2 h-4 w-4" />
              查看人员
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {record.status === "正常" ? (
              <DropdownMenuItem onClick={() => action?.onDisable?.(record)}>
                <UserX className="mr-2 h-4 w-4" />
                禁用岗位
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => action?.onEnable?.(record)}>
                <UserCheck className="mr-2 h-4 w-4" />
                启用岗位
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];