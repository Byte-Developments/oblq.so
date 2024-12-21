import { mysqlTable, varchar, timestamp, text, boolean } from 'drizzle-orm/mysql-core';

export const urls = mysqlTable('urls', {
  code: varchar('code', { length: 6 }).primaryKey(),
  url: varchar('url', { length: 2048 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const pastes = mysqlTable('pastes', {
  id: varchar('id', { length: 16 }).primaryKey(),
  content: text('content').notNull(),
  title: varchar('title', { length: 255 }),
  language: varchar('language', { length: 50 }).default('plaintext'),
  expiresAt: timestamp('expires_at'),
  burnAfterRead: boolean('burn_after_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  viewed: boolean('viewed').default(false),
});