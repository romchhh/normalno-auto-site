import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/uk' || pathname.startsWith('/uk/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/uk' ? '/' : pathname.slice(3)
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/uk', '/uk/:path*'],
}
