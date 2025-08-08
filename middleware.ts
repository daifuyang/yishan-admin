import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 允许访问登录页面和首页
  if (pathname === "/admin/login" || pathname === "/") {
    return NextResponse.next();
  }
  
  // 检查是否是admin路由
  if (pathname.startsWith("/admin")) {
    // 检查是否有登录状态（这里使用简单的session检查）
    const isLoggedIn = request.cookies.get("admin-auth")?.value === "true";
    
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};