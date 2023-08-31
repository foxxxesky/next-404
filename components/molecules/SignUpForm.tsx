'use client'

import * as z from 'zod'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-hot-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const signUpSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }),
  email: z.string().email({message: 'Please enter a valid email.'}),
  password: z.string().min(8, {message: 'Password must be at least 8 characters.'})
})

export const SignUpForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      setLoading(true)

      const response = await axios.post('/api/auth/signup', values)

      if (response.data.status === 400) throw new Error(response.data.error)

      toast.success('Sign up success!')
      router.push('/signin')

    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                      placeholder='Username'
                      {...field}
                  />
                  </FormControl>
                  <FormMessage className='text-xs' />
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
                      type='email'
                      disabled={loading}
                      placeholder='@youremail'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      disabled={loading}
                      placeholder='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )
            }}
          />
          <div className="pt-6">
            <Button
              type='submit'
              disabled={loading}
              className='w-full'
            >
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
