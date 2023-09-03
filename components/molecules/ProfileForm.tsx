'use client'

import { useSession } from 'next-auth/react'

const ProfileForm = () => {
  const { data: session, status } = useSession()
  console.log(session, status)
  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
    </div>
  )
}

export default ProfileForm
