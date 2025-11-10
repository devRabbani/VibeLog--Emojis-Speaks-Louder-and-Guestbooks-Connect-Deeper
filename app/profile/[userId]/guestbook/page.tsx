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
    <>
      <InputForm username={username} />
      <h3 className="text-lg font-semibold text-slate-900 border-b border-slate-200 pb-3 mb-4 px-1.5 sm:px-2">
        Recent messages
      </h3>
      <MessagesList messages={guestMessages} />
    </>
  )
}
