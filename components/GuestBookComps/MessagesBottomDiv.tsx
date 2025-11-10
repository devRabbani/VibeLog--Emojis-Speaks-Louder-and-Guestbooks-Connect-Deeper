'use client'

import { PAGE_LIMIT_GUEST } from '@/lib/constant'
import { useSession } from 'next-auth/react'
import LoadMoreMessages from './LoadMoreMessages'

export default function MessagesBottomDiv({
  messagesLength,
}: {
  messagesLength: number
}) {
  const { data: session, status } = useSession()
  if (status === 'loading') return

  if (messagesLength < PAGE_LIMIT_GUEST) return

  if (status === 'unauthenticated')
    return (
      <p className="col-span-full text-center text-sm text-slate-400">
        Sign in to see more ✨
      </p>
    )

  return <LoadMoreMessages />
}
