'use client'

import * as z from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'

import Link from 'next/link'
import { User } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

interface ProfileFormProps {
  initialData: User
}

const updateProfileSchema = z.object({
  username: z.string().min(3, {message: 'Username must be at least 3 characters.'}),
  email: z.string().email({message: 'Please enter a valid email.'}),
})

type updateProfileFormValues = z.infer<typeof updateProfileSchema>

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession()

  const form = useForm<updateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: initialData
  })

  const updateUserProfile = async (values: updateProfileFormValues) => {
    console.log(values)
  }


  return (
    <div className='flex'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(updateUserProfile)} className='space-y-4'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )
            }}
          />

          <div className='pt-4 flex gap-4'>
            <Button
              variant='secondary'
            >
              <Link href='/'>Back</Link>
            </Button>
            <Button
              disabled={loading}
              type='submit'
            >
              Update Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
