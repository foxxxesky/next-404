'use client'

import React from 'react'
import Link from 'next/link'
// import { axios } from 'axios'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
    const [ user, setUser ] = React.useState({
        username: '',
        email: '',
        password: ''
    })

    const onSignUp = async () => {
    }

    return (
        <div>
            <h1>Sign Up Page</h1>
        </div>
    )
}
