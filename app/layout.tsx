import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { ToastProvider } from '@/providers/toast.provider'
import { Provider } from '@/providers/session.provider'
import { getServerSession } from 'next-auth'

const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Next 404',
  description: 'Website to learn Next 13',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <Provider userSession={session}>
        <body className={poppins.className}>
          <ToastProvider />
          {children}
        </body>
      </Provider>
    </html>
  )
}
