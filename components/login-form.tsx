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
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">欢迎回来</CardTitle>
          <CardDescription>
            请输入您的账号和密码
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">账号</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="请输入账号"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">密码</Label>
                  </div>
                  <Input id="password" type="password" required />
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
