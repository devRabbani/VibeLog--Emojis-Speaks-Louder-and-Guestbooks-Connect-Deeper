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

export default function AddMood() {
  const [isOpen, setIsOpen] = useState(false)

  const hideEmojiBar = () => setIsOpen(false)

  if (isOpen) {
    return <EmojiBar hideEmojiBar={hideEmojiBar} />
  }

  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-4 right-3 bg-teal-100 text-teal-900 rounded-full text-5xl p-3 shadow-lg sm:text-4xl transition hover:bg-slate-300 active:translate-y-1"
    >
      <RiAddFill />
    </button>
  )
}

const EmojiBar = ({ hideEmojiBar }: { hideEmojiBar: () => void }) => {
  const { data: session } = useSession()
  const [emoji, setEmoji] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const selectEmoji = (emoji: string) => {
    toast.promise(addVibeToDB(emoji), {
      error: 'Something went please try again!',
      loading: 'Adding your vibe...',
      success: 'Your Vibe added',
    })
  }
  const addVibeToDB = async (emoji: string) => {
    try {
      if (!session?.user) throw Error('No auth user found')
      setIsLoading(true)
      await createVibe({ id: session.user.user_id!, emoji })
      setIsLoading(false)
      hideEmojiBar()
    } catch (error) {
      console.log('Creating Vibe', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-0 left-1 right-1 max-w-xl mx-auto bg-teal-50 shadow-xl rounded-t-md px-1 ">
      <div className="flex items-center justify-between px-4 h-14 ">
        <button
          disabled={isLoading}
          onClick={hideEmojiBar}
          className="py-1 rounded-md text-teal-950 font-medium flex justify-center items-center gap-1 w-20 transition bg-teal-100 hover:bg-teal-200 active:translate-y-0.5"
        >
          Close
        </button>
        {emoji ? (
          <>
            <p className="text-4xl">{emoji}</p>
            <button
              disabled={isLoading}
              onClick={() => selectEmoji(emoji)}
              className="py-1 rounded-md font-medium flex justify-center items-center gap-1 bg-teal-700 w-20 text-teal-50 transition hover:bg-teal-800 active:translate-y-0.5 "
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
        searchPlaceHolder="Whats your current mood"
        onEmojiClick={(data) => setEmoji(data.emoji)}
        emojiStyle={EmojiStyle.NATIVE}
      />
    </div>
  )
}
