import type { GeneratedAlways, Generated } from 'kysely'

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface Database {
  User: User
  Vibe: Vibe
}

interface User {
  id: GeneratedAlways<number>
  name: string
  uuid: string
}

interface Vibe {
  id: GeneratedAlways<number>
  emoji: string
  created_at: GeneratedAlways<Timestamp | null>
  user_id: number
}
