import { defineRelations } from 'drizzle-orm'
import { pgTable, uuid, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard', 'impossible'])

export const achievementsCategories = pgTable('achievements__categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  color: varchar('color', { length: 255 }).notNull(),
  icon: varchar('icon', { length: 255 }).notNull()
})

export const achievementsEntries = pgTable('achievements__entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  thoughts: text('thoughts').notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  categoryId: uuid('category_id')
    .references(() => achievementsCategories.id),
  created: timestamp('created', { mode: 'date' }).defaultNow().notNull(),
  updated: timestamp('updated', { mode: 'date' }).defaultNow().notNull()
})

export const achievementsRelations = defineRelations(
  { achievementsCategories, achievementsEntries },
  (r) => ({
    achievementsCategories: {
      entries: r.many.achievementsEntries()
    },
    achievementsEntries: {
      category: r.one.achievementsCategories({
        from: r.achievementsEntries.categoryId,
        to: r.achievementsCategories.id
      })
    }
  })
)
