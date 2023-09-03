import bcrypt from 'bcryptjs'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from '@/db'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', placeholder: 'Enter Email' },
        password: { label: 'Password', placeholder: 'password' },
      },

      async authorize(credentials: any) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) {
          return null
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
          return null
        }

        console.log('user', user)

        return user
      }
    })
  ],
  // jwt: {

  // }
  pages: {
    signIn: '/signin'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
