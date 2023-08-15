import { getGuestMessages } from '@/actions/guestbook.actions'
import { getUserData } from '@/actions/users.actions'
import InputForm from '@/components/GuestBookComps/InputForm'
import MessagesList from '@/components/GuestBookComps/MessagesList'

export const revalidate = 120

export default async function Guestbook({
  params: { userId },
}: {
  params: { userId: string }
}) {
  const usernamePromise = getUserData(Number(userId))
  const guestMessagesPromise = getGuestMessages(Number(userId))

  const [username, guestMessages] = await Promise.all([
    usernamePromise,
    guestMessagesPromise,
  ])

  return (
    <div className="bg-teal-700 mt-1 rounded-md shadow-sm pt-2 pb-4 px-3 profileHeight">
      <InputForm username={username} />
      <h3 className="text-lg border-b border-teal-800 opacity-80 pb-1">
        Recent messages
      </h3>
      <MessagesList messages={guestMessages} />
    </div>
  )
}
