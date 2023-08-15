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
  const currentDate = moment()
  const createdAt = moment(message.created_at)

  const difference = currentDate.diff(createdAt, 'hours')

  return (
    <div className="border-b border-teal-800 py-3">
      <div className="flex items-baseline gap-1 flex-wrap">
        <Link
          className="font-semibold capitalize text-xs opacity-80"
          href={`/profile/${message.guest_id}`}
        >
          {message.name}
        </Link>
        <p className="opacity-60 text-xs font-light">
          {difference > 16
            ? `on ${createdAt.format('DD MMM, YY')}`
            : createdAt.fromNow()}
        </p>
      </div>

      <p className="mt-1 ">{message.message}</p>
    </div>
  )
}
