import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/db'

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { email, password } = reqBody

    // check if user already registered
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      return NextResponse.json({
        status: 400,
        error: 'User not found',
      })
    }

    // check if password is correct
    const validatePassword = await bcryptjs.compare(password, user.password)

    if (!validatePassword) {
      return NextResponse.json({
        status: 400,
        error: 'Invalid password',
      })
    }

    // create token
    const tokenData = {
      id: user.id,
      email: user.email,
      username: user.username
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1h' })

    const response = NextResponse.json({
      status: 200,
      message: 'User logged in successfully',
    })

    response.cookies.set('token', token, { httpOnly: true })

    return response

  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
    })
  }
}
