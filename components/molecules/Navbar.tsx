'use client'

import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'


export const Sidebar = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    try {
      setLoading(true)

      await axios.get('/api/auth/logout')

      toast.success('Logout success!')
      router.push('/signin')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-slate-400'>
      <div className='flex items-center'>
        <Menu className="block md:hidden" />
        <Link href='/'>
          <h1 className='hidden md:block text-xl md:text-3xl font-bold'>
            Home
          </h1>
        </Link>
      </div>

      <div className='flex items-center gap-x-3'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size='sm' variant='ghost' className='w-full'>Profile</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className='text-xs'>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href='/profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Button disabled={loading} onClick={logout} size='sm' variant='destructive' className='w-full'>Logout</Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Sidebar
