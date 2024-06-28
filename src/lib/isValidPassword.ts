import React from 'react'

type Props = {}

const isValidPassword = async (password: string, hashedPassword: string) => {
  return (
  await hashPassword(password) === hashedPassword
  )
}

const hashPassword = async (password: string) => {
 const arrayBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))

 return Buffer.from(arrayBuffer).toString("base64")
}

export default isValidPassword