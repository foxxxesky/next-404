import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export const getToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get('token')?.value || ''
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)

    return decodedToken
  } catch (error: any) {
    throw new Error(error.message)
  }
}
