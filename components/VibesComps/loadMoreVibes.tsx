'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { PAGE_LIMIT } from '@/lib/constant'
import { VibesMap } from './VibesList'
import { getMoreFeedVibes, getMoreVibes } from '@/actions/vibe.actions'
import { useParams } from 'next/navigation'
import { Timestamp } from '@/types/db'
import { delay } from '@/lib/utils'
import { VibesTypes } from '@/types/utility'

export default function LoadMoreVibes({
  isFeed,
  user_id,
}: {
  isFeed: boolean
  user_id: string
}) {
  // Local States
  const [isLoading, setIsLoading] = useState(false)
  const [isNoData, setIsNoData] = useState(false)
  const [vibes, setVibes] = useState<VibesTypes[]>([])

  // Hooks for Infinite Scroll
  const { inView, ref } = useInView()

  const skip = vibes?.length + PAGE_LIMIT
  console.log(user_id, 'user id')

  const loadMoreFn = async () => {
    try {
      setIsLoading(true)
      await delay(1000)
      // If feed type then use join query otherwise normal
      const results = isFeed
        ? await getMoreFeedVibes(skip)
        : await getMoreVibes({
            user_id,
            skip,
          })

      // When there is no data or datas are less than limit
      if (!results.length || results.length < PAGE_LIMIT) {
        setIsNoData(true)
      }
      setVibes((prev) => [...prev, ...results])

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (inView) loadMoreFn()
  }, [inView])

  return (
    <>
      {!!vibes.length ? <VibesMap vibes={vibes} /> : null}

      {isLoading ? (
        <p className="text-center col-span-full opacity-80">Getting data....</p>
      ) : isNoData ? (
        <p className="text-center col-span-full opacity-80">
          Ohh congrats!, you are at the end
        </p>
      ) : (
        <p ref={ref} className="text-center col-span-full opacity-80">
          Load more
        </p>
      )}
    </>
  )
}
