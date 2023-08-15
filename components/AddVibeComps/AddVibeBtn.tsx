'use client'

import { useSession } from 'next-auth/react'
import AddVibeDialog from './AddVibeDialog'

export default function AddVibeBtn({ paramsId }: { paramsId: string }) {
  const { data: session, status } = useSession()

  if (status === 'loading') return

  if (session?.user.user_id === Number(paramsId)) {
    return <AddVibeDialog />
  }
  return <AddVibeDialog />
}
