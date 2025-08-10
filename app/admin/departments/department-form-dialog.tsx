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
import { Department } from "./columns";

const departmentFormSchema = z.object({
  name: z.string().min(1, "部门名称不能为空"),
  code: z.string().min(1, "部门编码不能为空"),
  parent: z.string().optional(),
  leader: z.string().min(1, "负责人不能为空"),
  status: z.string().min(1, "请选择状态"),
  description: z.string().optional(),
});

type DepartmentFormValues = z.infer<typeof departmentFormSchema>;

interface DepartmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (department: Department, isEdit?: boolean) => void;
  department?: Department; // 编辑时传入部门数据
  mode?: 'add' | 'edit'; // 模式：添加或编辑
  parentDepartment?: Department; // 添加下级部门时的父部门
}

export function DepartmentFormDialog({ 
  open, 
  onOpenChange, 
  onSuccess, 
  department, 
  mode = 'add',
  parentDepartment
}: DepartmentFormDialogProps) {
  const [loading, setLoading] = useState(false);
  const isEdit = mode === 'edit';

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: "",
      code: "",
      parent: "",
      leader: "",
      status: "正常",
      description: "",
    },
  });

  // 当部门数据变化时，更新表单
  useEffect(() => {
    if (isEdit && department) {
      form.reset({
        name: department.name,
        code: department.code,
        parent: department.parent,
        leader: department.leader,
        status: department.status,
        description: department.description,
      });
    } else if (parentDepartment) {
      // 添加下级部门时，设置父部门
      form.reset({
        name: "",
        code: "",
        parent: parentDepartment.name,
        leader: "",
        status: "正常",
        description: "",
      });
    } else {
      form.reset({
        name: "",
        code: "",
        parent: "",
        leader: "",
        status: "正常",
        description: "",
      });
    }
  }, [department, isEdit, parentDepartment, form]);

  const onSubmit = async (values: DepartmentFormValues) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDepartment: Department = {
        id: isEdit ? department!.id : Date.now().toString(),
        name: values.name,
        code: values.code,
        parent: values.parent || "-",
        leader: values.leader,
        userCount: isEdit ? department!.userCount : 0,
        status: values.status,
        description: values.description || "-",
        createTime: isEdit ? department!.createTime : new Date().toLocaleString(),
      };
      
      onSuccess(newDepartment, isEdit);
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error('提交失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  // 模拟部门选项
  const departmentOptions = [
    { value: "技术部", label: "技术部" },
    { value: "产品部", label: "产品部" },
    { value: "市场部", label: "市场部" },
    { value: "人事部", label: "人事部" },
    { value: "财务部", label: "财务部" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? '编辑部门' : parentDepartment ? `添加下级部门 - ${parentDepartment.name}` : '添加部门'}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? '修改部门信息' : '填写部门基本信息'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>部门名称 *</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入部门名称" {...field} />
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
                    <FormLabel>部门编码 *</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入部门编码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="parent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>上级部门</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={!!parentDepartment}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择上级部门" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">无上级部门</SelectItem>
                        {departmentOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leader"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>负责人 *</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入负责人" {...field} />
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
                  <FormLabel>状态 *</FormLabel>
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
                      placeholder="请输入部门描述" 
                      className="resize-none" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                disabled={loading}
              >
                取消
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? '提交中...' : (isEdit ? '更新' : '添加')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}