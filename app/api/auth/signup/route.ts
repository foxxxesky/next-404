import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/db'

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { username, email, password } = reqBody

    // check if user already exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (user) {
      return NextResponse.json({
        status: 400,
        error: 'User already exists',
      })
    }

    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const savedUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({
      status: 200,
      message: 'User created successfully',
      data: savedUser,
    })

  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
    })
  }
}
