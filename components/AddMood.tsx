'use client'

import { RiAddFill } from 'react-icons/ri'
import { useState } from 'react'
import EmojiBar from './EmojiBar'

export default function AddMood() {
  const [isOpen, setIsOpen] = useState(false)

  const hideEmojiBar = () => setIsOpen(false)

  return (
    <>
      {isOpen ? (
        <EmojiBar hideEmojiBar={hideEmojiBar} />
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-3 bg-teal-100 text-teal-900 rounded-full text-5xl p-3 shadow-lg sm:text-4xl transition hover:bg-slate-300 active:translate-y-1"
        >
          <RiAddFill />
        </button>
      )}
    </>
  )
}
