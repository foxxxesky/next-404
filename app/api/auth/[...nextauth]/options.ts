import bcrypt from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

import prisma from '@/db'

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      async profile(profile) {
        // check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        })

        async function createUser() {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.given_name,
              password: await bcrypt.hash(profile.sub, 10),
            },
          })
        }

        if (!user) {
          createUser()
        }

        return {
          id: user?.id,
          role: user?.role,
          email: user?.email,
          username: user?.username,
          ...profile
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
            email: profile.email,
          },
        })

        async function createUser() {
          await prisma.user.create({
            data: {
              email: profile.email,
              username: profile.login,
              password: await bcrypt.hash(profile.node_id, 10),
            },
          })
        }

        if (!user) {
          createUser()
        }

        return {
          id: user?.id,
          role: user?.role,
          email: user?.email,
          username: user?.username,
          ...profile
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
        token.role = user.role
        token.email = user.email
        token.name = user.username
        token.username = user.username
      }

      return token
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.email = token.email
        session.user.username = token.username
      }

      return session
    }
  },
  pages: {
    signIn: '/signin',
    signOut: '/signin'
  }
}
