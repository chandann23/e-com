"use client"

import { emailOrderHistory } from '@/actions/orders'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

const MyOrders= () => {

  const [data , action ] =useFormState(emailOrderHistory,{})
  return (
    <form action={action} className='max-2-xl mx-auto'>
    <Card>
      <CardHeader>
        <CardTitle>
my orders
        </CardTitle>
        <CardDescription>
          enter your email and we will send you a link to download your files
        </CardDescription>

      </CardHeader>
      <CardContent>
        <div className='space-y-1'>
<Label>EMAIL</Label>
<Input type='email' name='email' required id="email" placeholder='Enter your email' />
{data.error && <div className='text-red-500'>{data.error}</div>}
       </div>

      </CardContent>
      <CardFooter>
        {data.message ? <p className='text-destructive'>{data.message}</p> : <SubmitButton  />}

      </CardFooter>

    </Card>
    </form>
  )
}


const SubmitButton = () => {
  const {pending}  = useFormStatus();

  return (
<Button className='w-full' size="lg" disabled={pending}>
  {pending ? "Sending" : "Send"}
</Button>
  )
}

export default  MyOrders