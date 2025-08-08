import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function AdminLoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <h1 className="text-2xl font-bold">移山通用管理系统</h1>
          </div>
          <p className="text-sm text-muted-foreground">锲而不舍，金石可镂</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}