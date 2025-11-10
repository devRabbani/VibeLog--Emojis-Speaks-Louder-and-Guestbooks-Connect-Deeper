'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'
import Filter from 'bad-words'
import { useSession } from 'next-auth/react'
import Spinner from '../spinner'
import { useParams } from 'next/navigation'
import { addGuestMessage } from '@/actions/guestbook.actions'
import { RiSendPlane2Line } from 'react-icons/ri'

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
    <form
      className="mb-6 rounded-card border border-teal-600/20 bg-white p-4 shadow-sm"
      onSubmit={handleMessage}
    >
      <label className="text-sm text-slate-600" htmlFor="guest-message">
        Leave a note for{' '}
        <span className="font-semibold capitalize text-slate-900">
          {username}
        </span>
      </label>
      <textarea
        ref={messageRef}
        className="mt-3 mb-3 w-full rounded-card border border-teal-600/30 bg-white p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200/70"
        id="guest-message"
        rows={3}
        placeholder="Tell them how awesome they are..."
      />
      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-card border border-teal-600/40 bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 hover:border-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 disabled:opacity-70"
      >
        {isLoading ? (
          <>
            <Spinner color="light" /> Sending
          </>
        ) : (
          <>
            <RiSendPlane2Line /> Add note
          </>
        )}
      </button>
    </form>
  )
}
