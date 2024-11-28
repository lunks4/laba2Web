import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer().primaryKey(),
  name: text().notNull(),
  email: text().notNull(),
  passwordHash: text().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export const icons = ['Home', 'Car', 'Heart', 'Shield'] as const
export type Icon = typeof icons[number]

export const services = sqliteTable('services', {
  id: integer().primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
  price: integer().notNull(),
  icon: text({ enum: icons }).notNull(),
  slug: text().unique().notNull(),
})

export type Service = typeof services.$inferSelect
export type NewService = typeof services.$inferInsert

// export const orders = sqliteTable('orders', {
//   id: integer().primaryKey(),
//   userId: integer().notNull().references(() => users.id),
//   serviceId: integer().notNull().references(() => services.id),
//   quantity: integer().notNull(),
// })

// export type Order = typeof orders.$inferSelect
// export type NewOrder = typeof orders.$inferInsert

export const feedbacks = sqliteTable('feedback', {
  id: integer().primaryKey(),
  userId: integer().notNull().references(() => users.id),
  serviceId: integer().notNull().references(() => services.id),
  subject: text().notNull(),
  message: text().notNull(),
})

export type Feedback = typeof feedbacks.$inferSelect
export type NewFeedback = typeof feedbacks.$inferInsert