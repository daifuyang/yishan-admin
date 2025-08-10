"use client"

import { ColumnDef } from "@tanstack/react-table";

export interface User {
  id: string;
  username: string;
  name: string;
  department: string;
  role: string;
  status: string;
  email: string;
  phone: string;
  createTime: string;
}

// ProTable 列配置类型
export type ProColumnDef<TData> = ColumnDef<TData> & {
  // ProTable 特有属性
  title?: string;
  dataIndex?: string;
  valueType?: 'text' | 'select' | 'date' | 'dateTime' | 'dateRange' | 'time' | 'option' | 'index' | 'indexBorder';
  valueEnum?: Record<string, { text: string; status?: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default' }>;
  hideInSearch?: boolean;
  hideInTable?: boolean;
  order?: number;
  sorter?: boolean | ((a: any, b: any) => number);
  filters?: boolean;
  ellipsis?: boolean;
  copyable?: boolean;
  fieldProps?: Record<string, any>;
  renderFormItem?: (item: any, props: { value: any; onChange: (value: any) => void }) => React.ReactNode;
  render?: (text: any, record: TData, index?: number, action?: any) => React.ReactNode | React.ReactNode[];
};

export const columns: ProColumnDef<User>[] = [
  {
    title: "用户名",
    dataIndex: "username",
    accessorKey: "username",
    header: "用户名",
    valueType: "text",
    order: 4,
    ellipsis: true,
    copyable: true,
  },
  {
    title: "姓名",
    dataIndex: "name",
    accessorKey: "name",
    header: "姓名",
    valueType: "text",
    order: 3,
    ellipsis: true,
  },
  {
    title: "部门",
    dataIndex: "department",
    accessorKey: "department",
    header: "部门",
    valueType: "select",
    order: 2,
    ellipsis: true,
    // hideInSearch: true,
  },
  {
    title: "角色",
    dataIndex: "role",
    accessorKey: "role",
    header: "角色",
    valueType: "select",
    valueEnum: {
      admin: { text: "管理员", status: "Processing" },
      user: { text: "普通用户", status: "Default" },
      editor: { text: "编辑", status: "Success" },
    },
    order: 1,
    // hideInSearch: true,
  },
  {
    title: "状态",
    dataIndex: "status",
    accessorKey: "status",
    header: "状态",
    valueType: "select",
    valueEnum: {
      active: { text: "启用", status: "Success" },
      inactive: { text: "禁用", status: "Default" },
    },
    order: 5,
    filters: true,
  },
  {
    title: "邮箱",
    dataIndex: "email",
    accessorKey: "email",
    header: "邮箱",
    valueType: "text",
    order: 6,
    ellipsis: true,
    copyable: true,
  },
  {
    title: "电话",
    dataIndex: "phone",
    accessorKey: "phone",
    header: "电话",
    valueType: "text",
    hideInSearch: true,
    ellipsis: true,
    copyable: true,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    accessorKey: "createTime",
    header: "创建时间",
    valueType: "dateTime",
    hideInSearch: true,
    sorter: true,
    ellipsis: true,
  },
  {
    id: "actions",
    title: "操作",
    valueType: "option",
    hideInSearch: true,
    enableHiding: false,
    render: (text: any, record: User) => [
      <a key="edit">编辑</a>,
      <a key="delete" style={{ color: '#ff4d4f' }}>删除</a>,
    ],
  },
]