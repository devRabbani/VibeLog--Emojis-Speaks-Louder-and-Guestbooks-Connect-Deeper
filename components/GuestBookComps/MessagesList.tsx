import type { GuestMessagesType } from '@/types/utility'
import moment from 'moment'
import Link from 'next/link'
import MessagesBottomDiv from './MessagesBottomDiv'

type Props = {
  messages: GuestMessagesType[]
}

export default function MessagesList({ messages }: Props) {
  if (!messages?.length) {
    return (
      <p className="text-center mt-[20vh] opacity-50">No one signed it yet</p>
    )
  }

  return (
    <div>
      <MessagesMap messages={messages} />
      <MessagesBottomDiv messagesLength={messages?.length} />
    </div>
  )
}

export const MessagesMap = ({ messages }: Props) => {
  return messages.map((message, id) => (
    <MessageCard key={id} message={message} />
  ))
}

const MessageCard = ({ message }: { message: GuestMessagesType }) => {
  return (
    <div className="border-b border-teal-800 py-3">
      <Link
        className="font-semibold capitalize text-sm opacity-70"
        href={`/profile/${message.guest_id}`}
      >
        {message.name} :
      </Link>

      <p className="text-sm mb-1">{message.message}</p>
      <p className="opacity-60 text-xs ">
        Written on {moment(message.created_at).format('DD MMM, YY')}
      </p>
    </div>
  )
}
