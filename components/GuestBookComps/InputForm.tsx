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
    <form
      className="mb-6 rounded-card bg-gradient-to-br from-rose-50 via-white to-sky-50 p-5 shadow-inner"
      onSubmit={handleMessage}
    >
      <label className="text-xs uppercase tracking-[0.3em] text-slate-400" htmlFor="comment">
        Some words for{' '}
        <span className="font-semibold capitalize text-slate-700">
          {username}
        </span>
      </label>
      <textarea
        ref={messageRef}
        className="bg-white/80 w-full mt-2 mb-3 p-3 rounded-control border border-slate-200 placeholder:opacity-60 focus:border-slate-500 focus:outline-none shadow-[inset_0_2px_8px_rgba(15,23,42,0.08)]"
        id="comment"
        rows={2}
        placeholder="Tell them how awesome they are..."
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-gradient-to-r from-teal-300 via-sky-300 to-indigo-300 text-slate-900 px-6 py-2 rounded-full flex items-center justify-center gap-1 font-semibold transition active:translate-y-1 hover:scale-[1.02] disabled:opacity-70"
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
