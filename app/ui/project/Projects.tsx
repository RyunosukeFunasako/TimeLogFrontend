'use client'
import { List, Card, Text, Stack, Button, Group } from '@mantine/core'
import { IconEdit, IconBackspace } from '@tabler/icons-react'
import Link from 'next/link'
import { useQueryProject } from '@/app/lib/project/useQueryProject'
import { NewProjectModal } from '@/app/ui/project/modal/NewProjectModal'

export const Projects = () => {
  const { data: projects, isLoading, error } = useQueryProject()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading projects</p>

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <List spacing="sm" className="w-full max-w-md">
        <NewProjectModal />
        {projects?.map((project) => (
          <Card
            key={project.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className="mb-4 cursor-pointer hover:shadow-lg"
          >
            <Stack align="center" justify="center" gap="md">
              <Text size="lg">{project.name}</Text>
              <Text size="sm">説明：{project.description}</Text>
            </Stack>
            <Group justify="center">
              <Button
                leftSection={<IconEdit size={14} />}
                variant="filled"
                component={Link}
                href={`/project/${project.id}`}
              >
                編集
              </Button>
              <Button
                rightSection={<IconBackspace size={14} />}
                variant="filled"
                color="red"
              >
                削除
              </Button>
            </Group>
          </Card>
        ))}
      </List>
    </div>
  )
}
