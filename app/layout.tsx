import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import { ToastProvider } from '@/providers/toast.provider'

const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Next 404',
  description: 'Website to learn Next 13',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
