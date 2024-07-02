'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Form from '@/app/ui/auth/form'

export default function Page() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        email: values.email,
        password: values.password,
      })
      router.push('/')
    } catch (e: any) {
      setError(e.response.data.message)
    }
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Form handleSubmit={handleSubmit} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}
