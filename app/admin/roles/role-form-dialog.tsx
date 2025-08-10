"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Role } from "./columns";

const roleFormSchema = z.object({
  name: z.string().min(1, "角色名称不能为空"),
  code: z.string().min(1, "角色编码不能为空").regex(/^[a-zA-Z0-9_]+$/, "角色编码只能包含字母、数字和下划线"),
  status: z.string().min(1, "请选择状态"),
  description: z.string().optional(),
  permissions: z.array(z.string()).min(1, "请至少选择一个权限"),
});

type RoleFormValues = z.infer<typeof roleFormSchema>;

interface RoleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (role: Role, isEdit?: boolean) => void;
  role?: Role; // 编辑时传入角色数据
  mode?: 'add' | 'edit'; // 模式：添加或编辑
}

// 可用权限列表
const availablePermissions = [
  { id: "user_management", label: "用户管理" },
  { id: "role_management", label: "角色管理" },
  { id: "department_management", label: "部门管理" },
  { id: "system_settings", label: "系统设置" },
  { id: "data_view", label: "数据查看" },
  { id: "data_operation", label: "数据操作" },
  { id: "report_view", label: "报表查看" },
  { id: "report_export", label: "报表导出" },
];

export function RoleFormDialog({ 
  open, 
  onOpenChange, 
  onSuccess, 
  role, 
  mode = 'add' 
}: RoleFormDialogProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: "",
      code: "",
      status: "正常",
      description: "",
      permissions: [],
    },
  });

  // 当角色数据变化时，更新表单
  useEffect(() => {
    if (role && mode === 'edit') {
      form.reset({
        name: role.name,
        code: role.code,
        status: role.status,
        description: role.description || "",
        permissions: role.permissions || [],
      });
    } else {
      form.reset({
        name: "",
        code: "",
        status: "正常",
        description: "",
        permissions: [],
      });
    }
  }, [role, mode, form]);

  const onSubmit = async (values: RoleFormValues) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const roleData: Role = {
        id: mode === 'edit' ? role!.id : Date.now().toString(),
        name: values.name,
        code: values.code,
        status: values.status,
        description: values.description || "",
        permissions: values.permissions,
        userCount: mode === 'edit' ? role!.userCount : 0,
        createTime: mode === 'edit' ? role!.createTime : new Date().toLocaleString('zh-CN'),
      };

      onSuccess(roleData, mode === 'edit');
      onOpenChange(false);
      
      // 重置表单
      if (mode === 'add') {
        form.reset();
      }
    } catch (error) {
      console.error('保存角色失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !loading) {
      onOpenChange(false);
      // 延迟重置表单，避免关闭动画时看到表单重置
      setTimeout(() => {
        form.reset();
      }, 200);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? '编辑角色' : '添加角色'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? '修改角色信息和权限配置' : '创建新的角色并配置相应权限'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>角色名称</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入角色名称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>角色编码</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="请输入角色编码" 
                        {...field} 
                        disabled={mode === 'edit'}
                        className={mode === 'edit' ? 'bg-gray-50' : ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>状态</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择状态" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="正常">正常</SelectItem>
                      <SelectItem value="禁用">禁用</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="请输入角色描述" 
                      className="resize-none" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permissions"
              render={() => (
                <FormItem>
                  <FormLabel>权限配置</FormLabel>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {availablePermissions.map((permission) => (
                      <FormField
                        key={permission.id}
                        control={form.control}
                        name="permissions"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={permission.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(permission.label)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, permission.label])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== permission.label
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {permission.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleOpenChange(false)}
                disabled={loading}
              >
                取消
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? '保存中...' : (mode === 'edit' ? '更新' : '创建')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}