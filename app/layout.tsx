import '@mantine/core/styles.css'
import '@/app/globals.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { QueryProvider } from '@/app/components/QueryProvider'

export const metadata = {
  title: 'Time Log',
  description: 'I have followed setup instructions carefully',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryProvider>
          <MantineProvider>{children}</MantineProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
