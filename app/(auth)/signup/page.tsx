import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { SignUpForm } from '@/components/molecules/SignUpForm'

export default function SignUpPage() {
  return (
    <div className="flex flex-col justify-center gap-8 md:w-1/3 md:px-10 px-4 py-12">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className='text-slate-800 font-bold text-2xl'>Sign Up</h1>
        <p className='text-xs text-slate-400 font-medium'>Please create your account</p>
      </div>

      <SignUpForm />

      <div className="flex justify-center items-center">
        <p className='text-xs text-slate-400'>already have an account?</p>
        <Button variant={'link'} className='p-0 ps-2 text-xs'>
          <Link
            href='/signin'
          >
            SignIn
          </Link>
        </Button>
      </div>
    </div>
  )
}
