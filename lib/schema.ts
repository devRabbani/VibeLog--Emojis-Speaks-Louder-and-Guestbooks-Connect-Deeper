import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('User')
    .addColumn('id', 'serial', (col) => col.notNull().primaryKey())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('uuid', 'varchar(50)', (col) => col.notNull())
    .execute()

  await db.schema
    .createTable('Vibe')
    .addColumn('id', 'serial', (col) => col.notNull().primaryKey())
    .addColumn('emoji', 'varchar(50)', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('user_id', 'serial', (col) =>
      col.references('User.id').onDelete('cascade').notNull()
    )
    .execute()

  await db.schema
    .createTable('Guestbook')
    .addColumn('id', 'serial', (col) => col.notNull().primaryKey())
    .addColumn('guest_id', 'serial', (col) =>
      col.references('User.id').onDelete('cascade').notNull()
    )
    .addColumn('user_id', 'serial', (col) =>
      col.references('User.id').onDelete('cascade').notNull()
    )
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('message', 'varchar(300)', (col) => col.notNull())
    .execute()
  await db.schema
    .createIndex('Account_userId_index')
    .on('Account')
    .column('userId')
    .execute()
  await db.schema
    .createIndex('Session_userId_index')
    .on('Session')
    .column('userId')
    .execute()

  await db.schema
    .createIndex('User_uuid_index')
    .on('User')
    .column('uuid')
    .execute()
  await db.schema
    .createIndex('Vibe_userid_and_createdat_index')
    .on('Vibe')
    .columns(['user_id', 'created_at desc'])
    .execute()

  await db.schema
    .createIndex('Guestbook_userid_and_createdat_index')
    .on('Guestbook')
    .columns(['user_id', 'created_at desc'])
    .execute()

  await db.schema
    .createIndex('Guestbook_guestid')
    .on('Guestbook')
    .column('guest_id')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('User').ifExists().execute()
  await db.schema.dropTable('Vibe').ifExists().execute()
  await db.schema.dropTable('Guestbook').ifExists().execute()
}
