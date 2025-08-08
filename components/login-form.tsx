"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    // 简单的验证逻辑（实际项目中应该调用后端API）
    if (username === "admin" && password === "123456") {
      // 设置登录状态
      document.cookie = "admin-auth=true; path=/; max-age=86400"
      // 登录成功后跳转到dashboard
      router.push("/admin")
    } else {
      alert("账号或密码错误")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">管理员登录</CardTitle>
          <CardDescription>
            锲而不舍，金石可镂
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">账号</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="请输入账号"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">密码</Label>
                  </div>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="请输入密码" 
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">
                  登录
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
