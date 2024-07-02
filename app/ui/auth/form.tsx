'use client'
import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

interface FormProps {
  handleSubmit: (values: { email: string; password: string }) => void
}

export default function Form({ handleSubmit }: FormProps) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : '適切なメールアドレスにしてください',
      password: (value) =>
        value.length < 5 ? 'パスワードは5文字以上にしてください' : null,
    },
  })

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <TextInput
          withAsterisk
          label="password"
          placeholder="5文字以上"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </div>
  )
}
