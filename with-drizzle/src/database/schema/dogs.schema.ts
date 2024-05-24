import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const $dogs = pgTable('dogs', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  breed: text('breed').notNull(),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
