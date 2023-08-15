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
      className="flex items-center gap-1 text-2xl transition disabled:opacity-60 active:translate-y-0.5 hover:text-teal-100"
    >
      <RiShareBoxFill />
    </button>
  )
}
