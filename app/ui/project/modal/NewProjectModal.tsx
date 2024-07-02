import { Card, Button, TextInput, Space, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import React from 'react'

export const NewProjectModal = () => {
  const form = useForm({
    initialValues: {
      projectName: '',
      description: '',
    },
  })
  const [opened, { open, close }] = useDisclosure(false)

  const handleClose = () => {
    form.reset()
    close()
  }

  return (
    <>
      <Modal opened={opened} onClose={handleClose} centered>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className="mb-4 cursor-pointer hover:shadow-lg"
        >
          <form
            onSubmit={form.onSubmit((values) => {
              console.log(values)
              handleClose()
            })}
            style={{ textAlign: 'center' }}
          >
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
            <Space h="xl" />
            <Button type="submit">追加</Button>
          </form>
        </Card>
      </Modal>
      <div className="flex justify-center mb-4">
        <Button onClick={open}>プロジェクト追加</Button>
      </div>
    </>
  )
}
