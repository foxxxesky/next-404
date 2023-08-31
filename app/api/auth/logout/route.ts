import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = NextResponse.json({
      status: 200,
      message: 'User logged out successfully',
    })

    response.cookies.set('token', '', { httpOnly: true, expires: new Date(0) })

    return response
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
    })
  }
}

