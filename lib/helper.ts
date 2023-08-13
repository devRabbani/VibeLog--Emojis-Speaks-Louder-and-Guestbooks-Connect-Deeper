'use server'

import db from './db'
import { down, up } from './schema'

export const showData = async () => {
  try {
    await up(db)
    console.log('done')
  } catch (error) {
    console.log(error)
  }
}

export const migrateData = async () => {
  try {
    await up(db)
  } catch (error) {
    console.log(error)
  }
}
