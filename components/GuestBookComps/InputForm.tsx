'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'
import Filter from 'bad-words'
import { useSession } from 'next-auth/react'
import Spinner from '../spinner'
import { useParams } from 'next/navigation'
import { addGuestMessage } from '@/actions/guestbook.actions'

export default function InputForm({ username }: { username: string }) {
  // Local States for loading
  const [isLoading, setIsLoading] = useState(false)

  // Ref for textarea
  const messageRef = useRef<HTMLTextAreaElement>(null)

  // Getting User user_id for the guest
  const { data: session } = useSession()

  const { userId } = useParams()

  const submitMessage = async (message: string) => {
    setIsLoading(true)
    const filter = new Filter()
    const cleanedMessage = filter.clean(message)
    await addGuestMessage({
      message: cleanedMessage,
      user_id: Number(userId),
      guest_id: session?.user.user_id!,
    })
    if (messageRef.current) {
      messageRef.current.value = ''
    }

    setIsLoading(false)
  }

  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const message = messageRef.current?.value
    if (!message?.length) {
      toast.error('Adding Message', {
        description: 'You need to type atleast 10 characters',
      })
      return
    }
    if (!session?.user.user_id) {
      toast.error('Adding Message', {
        description: 'You need to sign in first!',
      })
      return
    }

    toast.promise(submitMessage(message), {
      loading: 'Signing to the guestbook..',
      error: 'Adding message failed, Try Again!',
      success: 'Successfully added the message',
    })
  }

  if (Number(userId) === session?.user.user_id) {
    return
  }

  return (
    <form className="mb-4" onSubmit={handleMessage}>
      <label className="text-sm opacity-85" htmlFor="comment">
        Some words for{' '}
        <span className="font-semibold capitalize">{username}</span>
      </label>
      <textarea
        ref={messageRef}
        className="bg-teal-800 w-full mt-2 mb-1 p-2 rounded-md border border-teal-800 placeholder:opacity-60 focus:border-teal-950 focus:outline-0"
        id="comment"
        rows={2}
        placeholder="Type something about...."
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-teal-100 text-teal-900 w-28 rounded-md p-2 flex items-center justify-center gap-1 transition active:translate-y-1 hover:bg-teal-200 disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Spinner color="deep" /> Adding
          </>
        ) : (
          ' Add'
        )}
      </button>
    </form>
  )
}
