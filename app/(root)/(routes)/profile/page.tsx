import { getServerSession } from 'next-auth'

import prisma from '@/db'
import PageHeading from '@/components/atomic/PageHeading'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { ProfileForm } from '@/components/molecules/ProfileForm'

const ProfilePage = async() => {
  const session = await getServerSession(options)

  const userData = await prisma.user.findUnique({
    where: {
      email: session?.user.email!
    }
  })

  return (
   <div className='p-4'>
    <PageHeading
      title='Profile'
      desc='Your profile information'
    />

    <div className="pt-10">
      <ProfileForm initialData={userData!} />
    </div>
   </div>
  )
}

export default ProfilePage
