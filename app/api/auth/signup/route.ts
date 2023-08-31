import bcryptjs from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import { connect } from '@/db/connection'
import User from '@/db/models/userModel'

// connect to database
connect()

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json()
    const { username, email, password } = reqBody

    // check if user already exists
    const user = await User.findOne({ email: email })

    if (user) {
      return NextResponse.json({
        status: 400,
        error: 'User already exists',
      })
    }

    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()

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
