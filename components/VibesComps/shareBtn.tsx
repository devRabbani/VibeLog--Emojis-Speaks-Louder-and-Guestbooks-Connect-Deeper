'use client'

import { useState } from 'react'
import { RiShareBoxFill } from 'react-icons/ri'
import { toast } from 'sonner'

export default function ShareBtn({
  username,
  user_id,
}: {
  username: string
  user_id: string
}) {
  const [isLoading, setIsLoading] = useState(false)

  const share = async () => {
    setIsLoading(true)
    const shareData = {
      title: `VibeLogs of ${username}`,
      text: `Checkout vibes of ${username} and leave words for him`,
      url: `https://vibelog.canwebe.in/profile/${user_id}`,
    }
    if (navigator.canShare(shareData)) {
      await navigator.share(shareData)
    } else {
      throw Error('Not sharable')
    }

    setIsLoading(false)
  }

  const handleShareToast = () => {
    toast.promise(share, {
      success: 'Successfull',
      error: 'Something went wrong',
      loading: 'Sharing...',
    })
  }

  return (
    <button
      disabled={isLoading}
      onClick={handleShareToast}
      className="inline-flex items-center gap-2 rounded-card border border-teal-600/30 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow transition-colors duration-200 hover:border-teal-600 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200 disabled:opacity-60"
    >
      Share profile
      <RiShareBoxFill className="text-lg" />
    </button>
  )
}
