'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { PAGE_LIMIT_GUEST } from '@/lib/constant'
import { useParams } from 'next/navigation'
import { delay } from '@/lib/utils'
import type { GuestMessagesType } from '@/types/utility'
import { MessagesMap } from './MessagesList'
import { getMoreMessages } from '@/actions/guestbook.actions'
import Spinner from '../spinner'

export default function LoadMoreMessages() {
  // Local States
  const [isLoading, setIsLoading] = useState(false)
  const [isNoData, setIsNoData] = useState(false)
  const [messages, setMessages] = useState<GuestMessagesType[]>([])

  // Hooks for Infinite Scroll
  const { inView, ref } = useInView()

  const { userId } = useParams()

  const skip = messages?.length + PAGE_LIMIT_GUEST

  const loadMoreFn = async () => {
    try {
      setIsLoading(true)
      await delay(1000)
      // If feed type then use join query otherwise normal
      const results = await getMoreMessages({ user_id: Number(userId), skip })

      // When there is no data or datas are less than limit
      if (!results.length || results.length < PAGE_LIMIT_GUEST) {
        setIsNoData(true)
      }
      setMessages((prev) => [...prev, ...results])
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
      {!!messages.length ? <MessagesMap messages={messages} /> : null}

      {isLoading ? (
        <div className="flex justify-center mt-4">
          <Spinner size={38} color="light" />
        </div>
      ) : isNoData ? (
        <p className="text-center col-span-full opacity-80 mt-4">
          Ohh congrats!, you are at the end
        </p>
      ) : (
        <p
          onClick={loadMoreFn}
          ref={ref}
          className="text-center col-span-full mt-4 opacity-80"
        >
          Load more
        </p>
      )}
    </>
  )
}
