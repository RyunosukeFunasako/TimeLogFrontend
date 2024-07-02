'use client'
import { useQueryUser } from '@/app/lib/useQueryUser'

export const UserInfo = () => {
  const { data: user } = useQueryUser()
  return <p>{user?.email}</p>
}
