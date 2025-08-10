"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns, type User, type ProColumnDef } from "./columns";
import { DataTable } from "./data-table";
import TableSearchForm, { ProColumnType } from "@/components/ui/table-search-form";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  // TableSearchForm 组件现在可以直接处理 ProColumnDef 类型的 columns

  // 过滤数据
  const filteredUsers = users.filter((user) => {
    return Object.entries(searchParams).every(([key, value]) => {
      if (!value || value.toString().trim() === '') return true;
      
      const userValue = user[key as keyof typeof user];
      if (typeof userValue === 'string') {
        return userValue.toLowerCase().includes(value.toString().toLowerCase());
      }
      return userValue === value;
    });
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 模拟API调用 - 30条演示数据
      const mockUsers: User[] = [
        {
          id: "1",
          username: "admin",
          name: "系统管理员",
          department: "技术部",
          role: "超级管理员",
          status: "正常",
          email: "admin@yishan.com",
          phone: "13800138000",
          createTime: "2024-01-01",
        },
        {
          id: "2",
          username: "zhangsan",
          name: "张三",
          department: "技术部",
          role: "开发工程师",
          status: "正常",
          email: "zhangsan@yishan.com",
          phone: "13800138001",
          createTime: "2024-01-15",
        },
        {
          id: "3",
          username: "lisi",
          name: "李四",
          department: "市场部",
          role: "市场经理",
          status: "正常",
          email: "lisi@yishan.com",
          phone: "13800138002",
          createTime: "2024-02-01",
        },
        {
          id: "4",
          username: "wangwu",
          name: "王五",
          department: "财务部",
          role: "财务专员",
          status: "禁用",
          email: "wangwu@yishan.com",
          phone: "13800138003",
          createTime: "2024-02-15",
        },
        {
          id: "5",
          username: "zhaoliu",
          name: "赵六",
          department: "人事部",
          role: "人事专员",
          status: "正常",
          email: "zhaoliu@yishan.com",
          phone: "13800138004",
          createTime: "2024-03-01",
        },
        {
          id: "6",
          username: "sunqi",
          name: "孙七",
          department: "技术部",
          role: "前端工程师",
          status: "正常",
          email: "sunqi@yishan.com",
          phone: "13800138005",
          createTime: "2024-03-15",
        },
        {
          id: "7",
          username: "zhouba",
          name: "周八",
          department: "技术部",
          role: "后端工程师",
          status: "正常",
          email: "zhouba@yishan.com",
          phone: "13800138006",
          createTime: "2024-04-01",
        },
        {
          id: "8",
          username: "wujiu",
          name: "吴九",
          department: "市场部",
          role: "销售专员",
          status: "正常",
          email: "wujiu@yishan.com",
          phone: "13800138007",
          createTime: "2024-04-15",
        },
        {
          id: "9",
          username: "zhengshi",
          name: "郑十",
          department: "财务部",
          role: "会计",
          status: "正常",
          email: "zhengshi@yishan.com",
          phone: "13800138008",
          createTime: "2024-05-01",
        },
        {
          id: "10",
          username: "chenyi",
          name: "陈一",
          department: "人事部",
          role: "招聘专员",
          status: "正常",
          email: "chenyi@yishan.com",
          phone: "13800138009",
          createTime: "2024-05-15",
        },
        {
          id: "11",
          username: "liuer",
          name: "刘二",
          department: "技术部",
          role: "测试工程师",
          status: "正常",
          email: "liuer@yishan.com",
          phone: "13800138010",
          createTime: "2024-06-01",
        },
        {
          id: "12",
          username: "huangsan",
          name: "黄三",
          department: "市场部",
          role: "市场专员",
          status: "禁用",
          email: "huangsan@yishan.com",
          phone: "13800138011",
          createTime: "2024-06-15",
        },
        {
          id: "13",
          username: "linsi",
          name: "林四",
          department: "财务部",
          role: "出纳",
          status: "正常",
          email: "linsi@yishan.com",
          phone: "13800138012",
          createTime: "2024-07-01",
        },
        {
          id: "14",
          username: "hewu",
          name: "何五",
          department: "人事部",
          role: "培训专员",
          status: "正常",
          email: "hewu@yishan.com",
          phone: "13800138013",
          createTime: "2024-07-15",
        },
        {
          id: "15",
          username: "gaoliu",
          name: "高六",
          department: "技术部",
          role: "架构师",
          status: "正常",
          email: "gaoliu@yishan.com",
          phone: "13800138014",
          createTime: "2024-08-01",
        },
        {
          id: "16",
          username: "xuqi",
          name: "徐七",
          department: "市场部",
          role: "品牌经理",
          status: "正常",
          email: "xuqi@yishan.com",
          phone: "13800138015",
          createTime: "2024-08-15",
        },
        {
          id: "17",
          username: "songba",
          name: "宋八",
          department: "财务部",
          role: "财务经理",
          status: "正常",
          email: "songba@yishan.com",
          phone: "13800138016",
          createTime: "2024-09-01",
        },
        {
          id: "18",
          username: "tangjiu",
          name: "唐九",
          department: "人事部",
          role: "人事经理",
          status: "正常",
          email: "tangjiu@yishan.com",
          phone: "13800138017",
          createTime: "2024-09-15",
        },
        {
          id: "19",
          username: "hanshi",
          name: "韩十",
          department: "技术部",
          role: "运维工程师",
          status: "禁用",
          email: "hanshi@yishan.com",
          phone: "13800138018",
          createTime: "2024-10-01",
        },
        {
          id: "20",
          username: "dengyi",
          name: "邓一",
          department: "市场部",
          role: "客户经理",
          status: "正常",
          email: "dengyi@yishan.com",
          phone: "13800138019",
          createTime: "2024-10-15",
        },
        {
          id: "21",
          username: "caier",
          name: "蔡二",
          department: "财务部",
          role: "审计专员",
          status: "正常",
          email: "caier@yishan.com",
          phone: "13800138020",
          createTime: "2024-11-01",
        },
        {
          id: "22",
          username: "fansan",
          name: "范三",
          department: "人事部",
          role: "薪酬专员",
          status: "正常",
          email: "fansan@yishan.com",
          phone: "13800138021",
          createTime: "2024-11-15",
        },
        {
          id: "23",
          username: "yansi",
          name: "严四",
          department: "技术部",
          role: "产品经理",
          status: "正常",
          email: "yansi@yishan.com",
          phone: "13800138022",
          createTime: "2024-12-01",
        },
        {
          id: "24",
          username: "luwu",
          name: "陆五",
          department: "市场部",
          role: "渠道经理",
          status: "正常",
          email: "luwu@yishan.com",
          phone: "13800138023",
          createTime: "2024-12-15",
        },
        {
          id: "25",
          username: "kongliu",
          name: "孔六",
          department: "财务部",
          role: "成本会计",
          status: "禁用",
          email: "kongliu@yishan.com",
          phone: "13800138024",
          createTime: "2025-01-01",
        },
        {
          id: "26",
          username: "baiqi",
          name: "白七",
          department: "人事部",
          role: "绩效专员",
          status: "正常",
          email: "baiqi@yishan.com",
          phone: "13800138025",
          createTime: "2025-01-15",
        },
        {
          id: "27",
          username: "maoba",
          name: "毛八",
          department: "技术部",
          role: "UI设计师",
          status: "正常",
          email: "maoba@yishan.com",
          phone: "13800138026",
          createTime: "2025-02-01",
        },
        {
          id: "28",
          username: "wenjiu",
          name: "温九",
          department: "市场部",
          role: "商务专员",
          status: "正常",
          email: "wenjiu@yishan.com",
          phone: "13800138027",
          createTime: "2025-02-15",
        },
        {
          id: "29",
          username: "jiangshi",
          name: "蒋十",
          department: "财务部",
          role: "税务专员",
          status: "正常",
          email: "jiangshi@yishan.com",
          phone: "13800138028",
          createTime: "2025-03-01",
        },
        {
          id: "30",
          username: "caiyi",
          name: "蔡一",
          department: "人事部",
          role: "行政助理",
          status: "正常",
          email: "caiyi@yishan.com",
          phone: "13800138029",
          createTime: "2025-03-15",
        },
      ];

      setUsers(mockUsers);
    } catch (error) {
      console.error("获取用户列表失败:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-6">
      {/* 页面标题区域 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">用户管理</h1>
        <Button className="h-9 px-4">
          <Plus className="w-4 h-4 mr-2" />
          添加用户
        </Button>
      </div>

      {/* 搜索表单 */}
      <div className="mb-6">
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
      <div className="bg-white rounded-lg border shadow-sm">
        <DataTable columns={columns} data={filteredUsers} />
      </div>
    </div>
  );
}
