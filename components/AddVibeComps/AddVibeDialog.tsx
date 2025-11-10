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

  const hideEmojiBar = () => setIsOpen(false)

  if (isOpen) {
    return <EmojiBar hideEmojiBar={hideEmojiBar} />
  }

  return (
    <button
      onClick={() => setIsOpen(true)}
      aria-label="Add a new vibe"
      className="fixed bottom-5 right-4 bg-gradient-to-r from-fuchsia-300 via-rose-200 to-amber-200 text-slate-900 rounded-full text-4xl p-3 shadow-[0_20px_35px_rgba(244,114,182,0.35)] sm:text-4xl transition hover:scale-105 active:translate-y-1 sm:sticky sm:ml-auto sm:block"
    >
      <RiAddFill />
    </button>
  )
}

const EmojiBar = ({ hideEmojiBar }: { hideEmojiBar: () => void }) => {
  const { data: session } = useSession()
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
    if (!session?.user) throw Error('No auth user found')
    setIsLoading(true)
    await createVibe({ id: session.user.user_id!, emoji })
    setIsLoading(false)
    hideEmojiBar()
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 mx-auto max-w-2xl bg-white/95 shadow-[0_-20px_40px_rgba(15,23,42,0.15)] px-4 pb-4 backdrop-blur"
      style={{
        borderTopLeftRadius: 'var(--radius-shell)',
        borderTopRightRadius: 'var(--radius-shell)',
      }}
    >
      <div className="flex items-center justify-between border-b border-slate-200 py-4">
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
              className="py-2 rounded-full font-semibold flex justify-center items-center gap-1 bg-slate-900 px-6 text-white transition hover:opacity-90 active:translate-y-0.5 disabled:opacity-60"
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
