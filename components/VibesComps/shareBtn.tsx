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
      className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow hover:scale-[1.02] transition disabled:opacity-60 active:translate-y-0.5"
    >
      Share profile
      <RiShareBoxFill className="text-lg" />
    </button>
  )
}
