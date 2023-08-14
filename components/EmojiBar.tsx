'use client'

import { createVibe } from '@/actions/vibe.actions'
import { EmojiClickData } from 'emoji-picker-react'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { RiAddFill, RiCloseLine } from 'react-icons/ri'
import { toast } from 'sonner'

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
  const [emoji, setEmoji] = useState<string | undefined>()

  const selectEmoji = async (emoji: string) => {
    toast.promise(addVibeToDB(emoji), {
      error: 'Something went please try again!',
      loading: 'Adding your vibe...',
      success: 'Your Vibe added',
    })
  }
  const addVibeToDB = async (emoji: string) => {
    try {
      if (!session?.user) throw Error('No auth user found')
      await createVibe({ id: session.user.user_id!, emoji })
    } catch (error) {
      console.log('Creating Vibe', error)
    }
  }

  return (
    <div className="fixed bottom-0 left-1 right-1 max-w-xl mx-auto bg-teal-50 shadow-xl rounded-t-md px-1 ">
      <div className="flex items-center justify-between px-4 h-14 ">
        <button
          onClick={hideEmojiBar}
          className="py-1 rounded-md text-teal-950 font-medium flex justify-center items-center gap-1 w-20 bg-teal-100"
        >
          Close
        </button>
        {emoji ? (
          <>
            <p className="text-3xl">{emoji}</p>
            <button className="py-1 rounded-md text-teal-950 font-medium flex justify-center items-center gap-1 bg-teal-700 w-20 text-teal-50">
              Add
            </button>
          </>
        ) : null}
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
        onEmojiClick={(data) => setEmoji(data.emoji)}
      />
    </div>
  )
}
