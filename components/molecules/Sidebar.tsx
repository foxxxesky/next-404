'use client'

import { usePathname } from 'next/navigation'
import { Home, ShoppingCart, User } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export const Sidebar = () => {
  const pathName = usePathname()
  const router = useRouter()

  const routes = [
    {
      icon: Home,
      href: '/',
      label: 'Home',
      pro: false
    },
    {
      icon: ShoppingCart,
      href: '/products',
      label: 'Products',
      pro: false
    },
    {
      icon: User,
      href: '/users',
      label: 'Users',
      pro: false
    }
  ]

  const onNavigate = (url: string, pro: boolean) => {
    return router.push(url)
  }

  return (
    <div className="space-y-4 flex flex-col h-full border-r border-slate-200 w-[200px]">
      <div className="p-3 flex flex-1 justify-start w-full">
        <div className="space-y-2 w-full">
          { routes.map((route) => (
            <div
              key={ route.href }
              onClick={() => onNavigate(route.href, route.pro)}
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathName === route.href && 'bg-primary/10 text-primary'
              )}
            >
              <div className='flex gap-y-2 gap-x-2 items-center flex-1'>
                <route.icon className='w-4 h-4' />
                { route.label }
              </div>
            </div>
          )) }
        </div>
      </div>
    </div>
  )
}
