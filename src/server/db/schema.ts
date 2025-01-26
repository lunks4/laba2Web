import { relations } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer().primaryKey(),
  firstname: text().notNull(),
  lastname: text().notNull(),
  middlename: text().notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  passwordHash: text().notNull(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export const icons = ['Home', 'Car', 'Heart', 'Shield'] as const
export type Icon = typeof icons[number]

export const categories = sqliteTable('categories', {
  id: integer().primaryKey(),
  title: text().notNull(),
  slug: text().unique().notNull(),
  icon: text({ enum: icons }).notNull(),
})

export type Category = typeof categories.$inferSelect
export type NewCategory = typeof categories.$inferInsert

export const categoriesRelations = relations(categories, ({ many }) => ({
  services: many(services)
}))

export const services = sqliteTable('services', {
  categoryId: integer().notNull().references(() => categories.id),
  id: integer().primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
  price: integer().notNull(),
  img: text().notNull(),
  slug: text().unique().notNull(),
})

export type Service = typeof services.$inferSelect
export type NewService = typeof services.$inferInsert

export const servisesRelations = relations(services, ({ one }) => ({
  category: one(categories, {
    fields: [services.categoryId],
    references: [categories.id],
  }),
}))

export const orders = sqliteTable('orders', {
  id: integer().primaryKey(),
  userId: integer().notNull().references(() => users.id),
  serviceId: integer().notNull().references(() => services.id),
  quantity: integer().notNull(),
})

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

export const feedbacks = sqliteTable('feedback', {
  id: integer().primaryKey(),
  userId: integer().notNull().references(() => users.id),
  serviceId: integer().notNull().references(() => services.id),
  subject: text().notNull(),
  message: text().notNull(),
})

export type Feedback = typeof feedbacks.$inferSelect
export type NewFeedback = typeof feedbacks.$inferInsert

export const banners = sqliteTable('banners', {
  id: integer().primaryKey(),
  title: text().notNull(),
  alt: text().notNull(),
  img: text().notNull(),
  url: text().notNull(),
})


export type Banner = typeof banners.$inferSelect
export type NewBanner = typeof banners.$inferInsert