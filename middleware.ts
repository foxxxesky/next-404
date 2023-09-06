import { NextResponse } from 'next/server'
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
    const token = request.nextauth.token

    if (isAdminPath && token?.role !== 'Admin') {
      return NextResponse.redirect(new URL('/', request.nextUrl))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token
      },
    },
    pages: {
      signIn: '/signin',
    }
  }
)

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/admin'
  ]
}
