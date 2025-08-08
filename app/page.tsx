import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";

export default function Home() {
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
        
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">欢迎使用移山管理系统</h2>
          <p className="text-muted-foreground">
            请选择入口以继续使用系统功能
          </p>
        </div>
        
        <div className="space-y-3">
          <Link 
            href="/admin/login"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium text-sm inline-flex items-center justify-center"
          >
            管理员登录
          </Link>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              管理员登录后进入管理仪表板
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}