'use client'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { PAGE_LIMIT } from '@/lib/constant'
import { useSession } from 'next-auth/react'
import LoadMoreVibes from './loadMoreVibes'
import { useParams } from 'next/navigation'

export default function VibesBottomBar({
  vibesLength,
  isFeed,
}: {
  vibesLength: number
  isFeed: boolean
}) {
  const { status } = useSession()
  const params = useParams()

  if (status === 'loading') return

  if (vibesLength < PAGE_LIMIT) return

  if (status === 'unauthenticated')
    return (
      <p className="col-span-full text-center opacity-75">
        Sign in to see more
      </p>
    )

  return (
    <LoadMoreVibes
      isFeed={isFeed}
      user_id={isFeed ? '' : (params?.userId as string)}
    />
  )
}
