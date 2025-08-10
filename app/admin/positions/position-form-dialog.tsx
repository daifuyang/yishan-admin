"use client";

import * as React from "react";
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
import { Position } from "./columns";

const formSchema = z.object({
  name: z.string().min(1, "岗位名称不能为空"),
  code: z.string().min(1, "岗位编码不能为空"),
  department: z.string().min(1, "请选择所属部门"),
  level: z.string().min(1, "请选择岗位级别"),
  description: z.string().optional(),
  requirements: z.string().optional(),
  status: z.string().min(1, "请选择状态"),
});

type FormData = z.infer<typeof formSchema>;

interface PositionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position?: Position | null;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
}

// 模拟部门数据
const departments = [
  { value: "技术部", label: "技术部" },
  { value: "产品部", label: "产品部" },
  { value: "设计部", label: "设计部" },
  { value: "市场部", label: "市场部" },
  { value: "销售部", label: "销售部" },
  { value: "运营部", label: "运营部" },
  { value: "人事部", label: "人事部" },
  { value: "财务部", label: "财务部" },
];

const levels = [
  { value: "P1", label: "P1-初级" },
  { value: "P2", label: "P2-中级" },
  { value: "P3", label: "P3-高级" },
  { value: "P4", label: "P4-专家" },
  { value: "M1", label: "M1-主管" },
  { value: "M2", label: "M2-经理" },
  { value: "M3", label: "M3-总监" },
];

const statusOptions = [
  { value: "正常", label: "正常" },
  { value: "禁用", label: "禁用" },
];

export function PositionFormDialog({
  open,
  onOpenChange,
  position,
  onSubmit,
  loading = false,
}: PositionFormDialogProps) {
  const isEdit = !!position;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      department: "",
      level: "",
      description: "",
      requirements: "",
      status: "正常",
    },
  });

  // 当弹窗打开时重置表单
  React.useEffect(() => {
    if (open) {
      if (position) {
        form.reset({
          name: position.name,
          code: position.code,
          department: position.department,
          level: position.level,
          description: position.description,
          requirements: position.requirements,
          status: position.status,
        });
      } else {
        form.reset({
          name: "",
          code: "",
          department: "",
          level: "",
          description: "",
          requirements: "",
          status: "正常",
        });
      }
    }
  }, [open, position, form]);

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑岗位" : "新增岗位"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "修改岗位信息" : "填写岗位基本信息"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>岗位名称 *</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入岗位名称" {...field} />
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
                    <FormLabel>岗位编码 *</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入岗位编码" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>所属部门 *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择所属部门" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
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
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>岗位级别 *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="请选择岗位级别" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择状态" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>岗位描述</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="请输入岗位描述"
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
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>任职要求</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="请输入任职要求"
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
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                取消
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "保存中..." : isEdit ? "更新" : "创建"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}