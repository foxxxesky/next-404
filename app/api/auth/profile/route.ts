import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/db'
import { getToken } from '@/helpers/getToken'

export async function GET(req: NextRequest) {
  try {
    const user = getToken(req)

    const profile = await prisma.user.findUnique({
      where: {
        id: user.id
      },
      select: {
        id: true,
        email: true,
        username: true,
        password: false,
      },
    })

    return NextResponse.json({
      status: 200,
      data: profile,
    })

  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
    })
  }

}
