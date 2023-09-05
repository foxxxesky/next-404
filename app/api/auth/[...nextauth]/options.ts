import bcrypt from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'

import prisma from '@/db'

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      async profile(profile) {
        // check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email ?? '',
          },
        })

        async function createUser() {
          await prisma.user.create({
            data: {
              username: profile.name ?? '',
              email: profile.email ?? '',
              role: 'User',
              password: await bcrypt.hash(profile.sub, 10),
            },
          })
        }

        if (!user) {
          createUser()
        }

        return {
          ...profile,
          id: profile.sub,
          role: profile.role ?? 'User',
          username: profile.name
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      async profile(profile) {

        // check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email ?? '',
          },
        })

        async function createUser() {
          await prisma.user.create({
            data: {
              username: profile.login,
              email: profile.email ?? '',
              role: 'User',
              password: await bcrypt.hash(profile.node_id, 10),
            },
          })
        }

        if (!user) {
          createUser()
        }

        return {
          ...profile,
          role: profile.role ?? 'User',
          username: profile.login
        }
      },
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

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
      }

      return token
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
        session.user.username = token.username
        session.user.role = token.role
      }

      // console.log('session', session)

      return session
    }
  },
  pages: {
    signIn: '/signin',
  }
}
