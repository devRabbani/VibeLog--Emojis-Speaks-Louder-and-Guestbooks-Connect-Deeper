import { RiAddFill } from 'react-icons/ri'

export default function AddMood() {
  return (
    <div>
      <button className="fixed bottom-4 right-3 bg-slate-600 text-slate-100 rounded-full text-5xl p-3 shadow-lg sm:text-4xl">
        <RiAddFill />
      </button>
    </div>
  )
}
