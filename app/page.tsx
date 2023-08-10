import VibesList from '@/components/VibesList'

export default function Home() {
  return (
    <div className="bg-teal-700 rounded-md shadow-sm p-2 feedHeight">
      <h3 className="text-lg border-b border-teal-800 opacity-80 pb-1">
        Recents Vibes
      </h3>
      <VibesList vibes={emojis} isFeed={true} />
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
