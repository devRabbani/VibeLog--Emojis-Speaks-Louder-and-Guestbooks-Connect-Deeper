import type { GeneratedAlways } from 'kysely'

export interface Database {
  User: User
  Account: Account
  Session: Session
  VerificationToken: VerificationToken
}

interface User {
  id: GeneratedAlways<string>
  name: string | null
  uuid: string | null
}

interface Account {
  id: GeneratedAlways<string>
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
}

interface Session {
  id: GeneratedAlways<string>
  userId: string
  sessionToken: string
  expires: Date
}

interface VerificationToken {
  identifier: string
  token: string
  expires: Date
}
