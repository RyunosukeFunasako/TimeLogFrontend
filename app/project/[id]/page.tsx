'use client'
import { useParams } from 'next/navigation'
import { Project } from '@/app/ui/project/ProjectById'

export default function Page() {
  const params = useParams()
  const id = params.id

  if (!id || Array.isArray(id)) {
    return <p>Invalid project ID</p>
  }

  return <Project id={id} />
}
