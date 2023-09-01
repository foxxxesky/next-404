'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'react-hot-toast'


export default function Profile() {
  const router = useRouter()
  const [data, setData] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get('/api/auth/profile')
        console.log(user.data.data)

        setData(user.data.data)

      } catch (error: any) {
        toast.error(error.message)
      }
    }

    getUser()

  }, [])

  return (
   <>
      {/* { data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading user data...</p>
      )} */}
   </>
  )
}
