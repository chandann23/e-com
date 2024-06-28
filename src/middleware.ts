import React from 'react'
import { NextRequest, NextResponse } from 'next/server'
import isValidPassword from './lib/isValidPassword'

type Props = {}

const isAunthenticated =async (req: NextRequest) => {
const authHeader = req.headers.get("Authorization") || req.headers.get("authorization")
if(authHeader == null) return false

const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":")
return username === process.env.ADMIN_USERNMAE && await isValidPassword(password,process.env.HASHED_ADMIN_PASSWORD as string)
}

const middleware = async (req   : NextRequest) => {
if(await isAunthenticated(req) === false){
  return new NextResponse("Unauthenticated", {
    status: 401,
    headers: {
     "WWW-Authenticate": "Basic",
    },
  })
}
}



export default middleware

export const config = {
  matcher: "/admin/:path*",
}