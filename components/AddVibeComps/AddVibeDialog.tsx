'use client'

import { RiAddFill } from 'react-icons/ri'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { createVibe } from '@/actions/vibe.actions'
import dynamic from 'next/dynamic'
import { EmojiStyle } from 'emoji-picker-react'

const EmojiPicker = dynamic(() => import('emoji-picker-react'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[60vh] grid items-center text-center">
      <p className="text-slate-400 text-lg">Getting Emoji Bar...</p>
    </div>
  ),
})

export default function AddVibeDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  const sessionUserId = session?.user?.user_id

  const hideEmojiBar = () => setIsOpen(false)

  const handleOpen = () => {
    if (!sessionUserId) {
      toast.error('Sign in required', {
        description: 'You need to sign in to add a vibe.',
      })
      return
    }
    setIsOpen(true)
  }

  return (
    <>
      {isOpen && sessionUserId ? (
        <EmojiBar hideEmojiBar={hideEmojiBar} userId={sessionUserId} />
      ) : null}

      <button
        onClick={handleOpen}
        aria-label="Add a new vibe"
        className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-teal-600 text-white text-4xl p-4 shadow-[0_18px_30px_rgba(13,148,136,0.35)] transition hover:bg-teal-700 active:translate-y-1 sm:text-4xl sm:p-5"
      >
        <RiAddFill />
      </button>
    </>
  )
}

const EmojiBar = ({
  hideEmojiBar,
  userId,
}: {
  hideEmojiBar: () => void
  userId: number
}) => {
  const [emoji, setEmoji] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const selectEmoji = () => {
    toast.promise(addVibeToDB(emoji), {
      error: 'Something went please try again!',
      loading: 'Adding your vibe...',
      success: 'Your Vibe added',
    })
  }
  const addVibeToDB = async (emoji: string) => {
    setIsLoading(true)
    await createVibe({ id: userId, emoji })
    setIsLoading(false)
    hideEmojiBar()
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 mx-auto max-w-2xl bg-white/95 shadow-[0_-20px_40px_rgba(15,23,42,0.15)] z-40 px-4 pb-4 backdrop-blur"
      style={{
        borderTopLeftRadius: 'var(--radius-shell)',
        borderTopRightRadius: 'var(--radius-shell)',
      }}
    >
      <div className="flex items-center justify-between pt-4 pb-3.5">
        <button
          disabled={isLoading}
          onClick={hideEmojiBar}
          className="py-2 rounded-full text-slate-700 font-medium flex justify-center items-center gap-1 px-5 transition bg-slate-100 hover:bg-slate-200 active:translate-y-0.5 disabled:opacity-60"
        >
          Close
        </button>
        {emoji ? (
          <>
            <p className="text-4xl">{emoji}</p>
            <button
              disabled={isLoading}
              onClick={selectEmoji}
              className="p-2 rounded-full font-semibold flex justify-center items-center gap-1 bg-teal-600 w-24 text-white transition hover:bg-teal-700 active:translate-y-0.5 disabled:opacity-60"
            >
              {isLoading ? 'Adding' : 'Add'}
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
        searchPlaceHolder="Search an emoji that describes your vibe"
        onEmojiClick={(data) => setEmoji(data.emoji)}
        emojiStyle={EmojiStyle.NATIVE}
      />
    </div>
  )
}
