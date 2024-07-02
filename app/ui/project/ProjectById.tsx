'use client'
import { Card, TextInput, Button, Space } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import { useQueryProjectById } from '@/app/lib/project/useQueryProjectById'

interface ProjectProps {
  id: string
}

export const Project = ({ id }: ProjectProps) => {
  const { data: project, isLoading, error } = useQueryProjectById(id)
  const form = useForm({
    initialValues: {
      projectName: '',
      description: '',
    },
  })

  useEffect(() => {
    if (project) {
      form.setValues({
        projectName: project.name || '',
        description: project.description || '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading projects</p>

  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="mb-4 cursor-pointer hover:shadow-lg"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            withAsterisk
            label="プロジェクト名"
            placeholder="プロジェクト名"
            {...form.getInputProps('projectName')}
          />
          <Space h="lg" />
          <TextInput
            label="説明"
            placeholder="説明"
            {...form.getInputProps('description')}
          />
        </form>
        <Space h="xl" />
        <Button>更新</Button>
      </Card>
    </div>
  )
}
