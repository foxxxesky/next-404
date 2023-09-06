import prisma from '@/db'
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { options } from '@/app/api/auth/[...nextauth]/options';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(options)

    const reqBody = await req.json()

    const product = await prisma.product.create({
      data: { ...reqBody }
    })

    return NextResponse.json({
      status: 200,
      message: 'Product created successfully',
      product: product
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
    })
  }
}

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams.get('id')

    if (params) {
      const data = await prisma.product.findUnique({
        where: {
          id: params
        }
      })

      return NextResponse.json({
        status: 200,
        message: 'Product retrieved successfully',
        product: data
      })
    } else {
      const data = await prisma.product.findMany()

      return NextResponse.json({
        status: 200,
        message: 'Product retrieved successfully',
        products: data
      })
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
    })
  }
}
