'use client'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { User } from '@prisma/client'

export const useQueryUser = () => {
  const router = useRouter()

  const getUser = async () => {
    try {
      const { data } = await axios.get<Omit<User, 'hashedPassword'>>(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
      )
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          router.push('/')
        }
      }
      throw error
    }
  }

  return useQuery<Omit<User, 'hashedPassword'>, AxiosError>({
    queryKey: ['user'],
    queryFn: getUser,
  })
}
