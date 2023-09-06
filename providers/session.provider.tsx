'use client'

import { SessionProvider } from 'next-auth/react'

export const Provider = ({ children, userSession } : { children: React.ReactNode, userSession:any }) => {
  return (
    <SessionProvider session={userSession}>
      {children}
    </SessionProvider>
  )
}
