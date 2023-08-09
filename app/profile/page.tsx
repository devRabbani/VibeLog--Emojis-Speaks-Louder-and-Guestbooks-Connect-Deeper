import AddMood from '@/components/AddMood'
import Link from 'next/link'
import { RiShareLine } from 'react-icons/ri'

export default function Profile() {
  return (
    <div className="bg-teal-700 mt-1 rounded-md shadow-sm p-2 items-baseline profileHeight">
      <div className="flex justify-between gap-1">
        <p>Posted by Golam Rabbani</p>
        <button className="flex items-center gap-1 text-xl">
          <RiShareLine />
        </button>
      </div>
      <AddMood />
    </div>
  )
}
