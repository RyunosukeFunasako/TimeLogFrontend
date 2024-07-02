'use client'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Project } from '@prisma/client'

export const useQueryProjectById = (id: string) => {
  const router = useRouter()

  const getProject = async () => {
    try {
      const { data } = await axios.get<Project>(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`,
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

  return useQuery<Project, AxiosError>({
    queryKey: ['project', id],
    queryFn: getProject,
  })
}
