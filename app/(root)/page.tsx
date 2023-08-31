'use client'

import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'


export default function Home() {
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
   <div className="p-4">
    <Button disabled={loading} onClick={logout}>Logout</Button>
   </div>
  )
}
