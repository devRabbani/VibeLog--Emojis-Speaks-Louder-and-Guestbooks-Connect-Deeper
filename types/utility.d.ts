import { Timestamp } from './db'

export type VibesTypes = {
  emoji: string
  created_at: Timestamp
  name?: string | null
  user_id?: number
}

export type GuestMessagesType = {
  message: string
  created_at: Timestamp
  name: string | null
  guest_id: number
}
