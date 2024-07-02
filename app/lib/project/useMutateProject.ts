import { useRouter } from 'next/router'
import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Project } from '@prisma/client'
import useStore from '@/store'
import { EditedProject } from '@/types'

export const useMutateProject = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const reset = useStore((state) => state.resetEditedProject)

  const createProjectMutation = useMutation(
    async (project: Omit<EditedProject, 'id'>) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/project`,
        project,
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousProjects = queryClient.getQueryData<Project[]>([
          'projects',
        ])
        if (previousProjects) {
          queryClient.setQueryData(['projects'], [res, ...previousProjects])
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    },
  )
  const updateProjectMutation = useMutation(
    async (project: EditedProject) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/project/${project.id}`,
        project,
      )
      return res.data
    },
    {
      onSuccess: (res, variables) => {
        const previousProjects = queryClient.getQueryData<Project[]>([
          'projects',
        ])
        if (previousProjects) {
          queryClient.setQueryData(
            ['projects'],
            previousProjects.map((project) =>
              project.id === res.id ? res : project,
            ),
          )
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    },
  )
  const deleteProjectMutation = useMutation(
    async (id: number) => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/project/${id}`)
    },
    {
      onSuccess: (_, variables) => {
        const previousProjects = queryClient.getQueryData<Project[]>([
          'projects',
        ])
        if (previousProjects) {
          queryClient.setQueryData(
            ['projects'],
            previousProjects.filter((project) => project.id !== variables),
          )
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    },
  )
  return { createProjectMutation, updateProjectMutation, deleteProjectMutation }
}
