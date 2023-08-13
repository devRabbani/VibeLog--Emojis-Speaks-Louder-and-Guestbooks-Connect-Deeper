'use server'

import db from '@/lib/db'
import { User } from '@/types/db'

export const createUser = async ({
  name,
  uuid,
}: {
  name: string
  uuid: string
}) => {
  const userExist = await db
    .selectFrom('User')
    .select('id')
    .where('uuid', '=', uuid)
    .executeTakeFirst()
  if (userExist) return userExist.id

  const result = await db
    .insertInto('User')
    .values({ name, uuid })
    .returning('id')
    .executeTakeFirst()

  return result?.id
}

export const getUserData = async (user_id: string) => {
  const result = await db
    .selectFrom('User')
    .select('name')
    .where('id', '=', Number(user_id))
    .executeTakeFirstOrThrow()

  return result.name
}
