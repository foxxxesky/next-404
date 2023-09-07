'use client'

import * as z from 'zod'
import { useState } from 'react'
import { Github, ChromeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-hot-toast'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const signInSchema = z.object({
  email: z.string().email({message: 'Please enter a valid email.'}),
  password: z.string().min(8, {message: 'Password must be at least 8 characters.'})
})

export const SignInForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const useCredentials = async (values: z.infer<typeof signInSchema>) => {
    try {
      setLoading(true)

      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password
      })

      if (res?.error) {
        throw new Error('Invalid credentials')
      }

      toast.success('Sign in success!')
      router.push('/')

    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(useCredentials)} className='space-y-4'>
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
          <div className="pt-6 space-y-2">
            <Button
              type='submit'
              className='w-full'
            >
              Sign In
            </Button>

            <p className='text-slate-400 text-xs text-center py-5'>or sign in with</p>
          </div>
        </form>
      </Form>
      <div className="space-y-2">
        <Button
          onClick={() => signIn('github')}
          variant='outline'
          className='w-full'
        >
          <Github className="mr-2 h-4 w-4" /> Github
        </Button>
        <Button
          onClick={() => signIn('google')}
          variant='outline'
          className='w-full'
        >
          <ChromeIcon className="mr-2 h-4 w-4" /> Google
        </Button>
      </div>
    </div>
  )
}
