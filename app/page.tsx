'use client'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import Form from '@/app/ui/auth/form'

export default function Page() {
  const [error, setError] = useState('')
  const router = useRouter()
  axios.defaults.withCredentials = true
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`,
          {
            withCredentials: true,
          },
        )
        axios.defaults.headers.common['csrf-token'] = data.csrfToken
      } catch (e: any) {
        setError(e.response.data.message)
      }
    }
    getCsrfToken()
  }, [])

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: values.email,
        password: values.password,
      })
      router.push('/project')
    } catch (e: any) {
      setError(e.response.data.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Form handleSubmit={handleSubmit} />
        {error && (
          <div style={{ color: 'red' }} className="mt-4">
            {error}
          </div>
        )}
        <div className="mt-4">
          <Link
            href="/auth/signup"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            サインアップはこちら
          </Link>
        </div>
      </div>
    </div>
  )
}
