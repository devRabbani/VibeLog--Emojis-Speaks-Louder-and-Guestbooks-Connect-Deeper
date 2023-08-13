'use server'

import db from '@/lib/db'
import { User } from '@/types/db'

export const createUser = async ({
  name,
  uuid,
}: {
  name: string | null
  uuid: string | null
}) => {
  const userExist = await db
    .selectFrom('User')
    .select('uuid')
    .where('uuid', '=', uuid)
    .executeTakeFirst()
  if (userExist) return true
  await db.insertInto('User').values({ name, uuid }).execute()
}
