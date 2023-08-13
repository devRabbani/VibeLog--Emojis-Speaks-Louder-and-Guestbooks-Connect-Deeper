import AddMood from '@/components/AddMood'
import VibesList from '@/components/VibesList'
import Link from 'next/link'
import { RiShareLine } from 'react-icons/ri'

export default function Profile() {
  console.count('Profile')
  return (
    <div className="bg-teal-700 mt-1 rounded-md shadow-sm p-2 items-baseline pt-3 profileHeight">
      <div className="flex justify-between gap-1 mb-2 border-b border-teal-800 pb-2">
        <p>
          Vibes of <span className="font-semibold">Golam Rabbani</span>
        </p>
        <button className="flex items-center gap-1 text-xl">
          <RiShareLine />
        </button>
      </div>
      <VibesList vibes={emojis} isFeed={false} />
      <AddMood />
    </div>
  )
}

const emojis = [
  {
    desc: 'grinning face',
    tags: ['face', 'grin'],
    code: '1f600',
    urls: {
      svg: 'https://storage.googleapis.com/teamoji-app.appspot.com/emoji/svg/emoji_u1f600.svg',
    },
  },
  {
    desc: 'grinning face with smiling eyes',
    tags: ['eye', 'face', 'grin', 'smile'],
    code: '1f601',
    urls: {
      svg: 'https://storage.googleapis.com/teamoji-app.appspot.com/emoji/svg/emoji_u1f601.svg',
    },
  },
  {
    desc: 'face with tears of joy',
    tags: ['face', 'joy', 'laugh', 'tear'],
    code: '1f602',
    urls: {
      svg: 'https://storage.googleapis.com/teamoji-app.appspot.com/emoji/svg/emoji_u1f602.svg',
    },
  },
  {
    desc: 'smiling face with open mouth',
    tags: ['face', 'mouth', 'open', 'smile'],
    code: '1f603',
    urls: {
      svg: 'https://storage.googleapis.com/teamoji-app.appspot.com/emoji/svg/emoji_u1f603.svg',
    },
  },
  {
    desc: 'smiling face with open mouth and smiling eyes',
    tags: ['eye', 'face', 'mouth', 'open', 'smile'],
    code: '1f604',
    urls: {
      svg: 'https://storage.googleapis.com/teamoji-app.appspot.com/emoji/svg/emoji_u1f604.svg',
    },
  },
  {
    desc: 'smiling face with open mouth and cold sweat',
    tags: ['cold', 'face', 'open', 'smile', 'sweat'],
    code: '1f605',
    urls: {
      svg: 'https://storage.googleapis.com/teamoji-app.appspot.com/emoji/svg/emoji_u1f605.svg',
    },
  },
  {
    desc: 'smiling face with open mouth and tightly-closed eyes',
    tags: ['face', 'laugh', 'mouth', 'open', 'satisfied', 'smile'],
    code: '1f606',
    urls: {
      svg: 'https://storage.googleapis.com/teamoji-app.appspot.com/emoji/svg/emoji_u1f606.svg',
    },
  },
  {
    desc: 'winking face',
    tags: ['face', 'wink'],
    code: '1f609',
    urls: {
      svg: 'https://storage.googleapis.com/teamoji-app.appspot.com/emoji/svg/emoji_u1f609.svg',
    },
  },
]
