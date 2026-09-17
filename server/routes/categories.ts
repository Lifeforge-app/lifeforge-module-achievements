import { eq, sql } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

import forge from '../forge'
import { achievementsCategories, achievementsEntries } from '../schema.drizzle'

const categoryInputDto = createInsertSchema(achievementsCategories).pick({
  name: true,
  icon: true,
  color: true
})

export const list = forge
  .query({
    description: 'Get the list of achievement categories',
    output: {
      OK: z.array(
        createSelectSchema(achievementsCategories).extend({
          amount: z.number()
        })
      )
    }
  })
  .callback(async ({ response, db }) => {
    const result = await db
      .select({
        id: achievementsCategories.id,
        name: achievementsCategories.name,
        icon: achievementsCategories.icon,
        color: achievementsCategories.color,
        amount:
          sql<number>`CAST(COUNT(${achievementsEntries.id}) AS INTEGER)`.mapWith(
            Number
          )
      })
      .from(achievementsCategories)
      .leftJoin(
        achievementsEntries,
        eq(achievementsCategories.id, achievementsEntries.categoryId)
      )
      .groupBy(achievementsCategories.id)

    return response.ok(result)
  })

export const create = forge
  .mutation({
    description: 'Create a new achievement category',
    input: {
      body: categoryInputDto
    },
    output: {
      NO_CONTENT: true,
      CONFLICT: true
    }
  })
  .callback(async ({ db, body, response }) => {
    const existingCategory = await db.query.achievementsCategories.findFirst({
      where: { name: body.name }
    })

    if (existingCategory) {
      return response.conflict()
    }

    await db.insert(achievementsCategories).values(body)

    return response.noContent()
  })

export const update = forge
  .mutation({
    description: 'Update an existing achievement category',
    input: {
      query: z.object({
        id: z.uuid()
      }),
      body: categoryInputDto
    },
    output: {
      NO_CONTENT: true,
      CONFLICT: true,
      NOT_FOUND: true
    }
  })
  .callback(async ({ db, query: { id }, body, response }) => {
    const existingCategory = await db.query.achievementsCategories.findFirst({
      where: {
        name: body.name,
        id: { ne: id }
      }
    })

    if (existingCategory) {
      return response.conflict()
    }

    const [category] = await db
      .update(achievementsCategories)
      .set(body)
      .where(eq(achievementsCategories.id, id))
      .returning()

    if (!category) {
      return response.notFound()
    }

    return response.noContent()
  })

export const remove = forge
  .mutation({
    description: 'Delete an achievement category',
    input: {
      query: z.object({
        id: z.string()
      })
    },
    output: {
      NO_CONTENT: true,
      NOT_FOUND: true
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const [deleted] = await db
      .delete(achievementsCategories)
      .where(eq(achievementsCategories.id, id))
      .returning()

    if (!deleted) {
      return response.notFound()
    }

    return response.noContent()
  })
