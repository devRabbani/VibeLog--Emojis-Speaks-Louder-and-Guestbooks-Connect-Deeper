'use client'

import { createVibe } from '@/actions/vibe.actions'
import { EmojiClickData } from 'emoji-picker-react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { RiAddFill, RiCloseLine } from 'react-icons/ri'

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[60vh] grid items-center text-center">
      <p className="text-slate-400 text-lg">Getting Emoji Bar...</p>
    </div>
  ),
})

export default function EmojiBar({
  hideEmojiBar,
}: {
  hideEmojiBar: () => void
}) {
  const { data: session } = useSession()

  const selectEmoji = async (emoji: string) => {
    try {
      if (!session?.user) throw Error('No auth user found')
      await createVibe({ id: session.user.user_id!, emoji })
    } catch (error) {
      alert('Something went wrong')
      console.log('Creating Vibe', error)
    }
  }

  return (
    <div className="fixed bottom-0 left-1 right-1 max-w-xl mx-auto bg-teal-50 shadow-xl rounded-t-md px-1 ">
      <div className="flex">
        <button
          onClick={hideEmojiBar}
          className="w-full py-3 rounded-md text-teal-950 text-lg flex justify-center items-center gap-1"
        >
          Close
        </button>
      </div>
      <EmojiPicker
        lazyLoadEmojis={true}
        width="100%"
        height="60vh"
        skinTonesDisabled={true}
        autoFocusSearch={false}
        previewConfig={{
          showPreview: false,
        }}
        onEmojiClick={(data) => selectEmoji(data.emoji)}
      />
    </div>
  )
}
