import { eq, sql, type TableFilter } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

import forge from '../forge'
import { achievementsEntries } from '../schema.drizzle'

const entryDifficultyDto =
  createSelectSchema(achievementsEntries).shape.difficulty

const entryDto = createSelectSchema(achievementsEntries)
  .omit({ categoryId: true })
  .extend({
    difficulty: entryDifficultyDto,
    category: z.string().optional().nullable(),
    created: z.string(),
    updated: z.string()
  })

const entryInputDto = createInsertSchema(achievementsEntries)
  .pick({
    title: true,
    thoughts: true,
    difficulty: true
  })
  .extend({
    category: z.string().optional().nullable()
  })

export const list = forge
  .query({
    description:
      'Get the list of achievement entries with optional filtering by difficulty, category, or search query',
    input: {
      query: z.object({
        difficulty: entryDifficultyDto.optional().nullable(),
        category: z.string().optional(),
        query: z.string().optional()
      })
    },
    output: {
      OK: z.array(entryDto),
      NOT_FOUND: true
    }
  })
  .callback(
    async ({ query: { difficulty, category, query }, response, db }) => {
      if (category) {
        const exists = await db.query.achievementsCategories.findFirst({
          where: { id: category }
        })

        if (!exists) {
          return response.notFound()
        }
      }

      const filters: TableFilter<typeof achievementsEntries>[] = [
        ...(difficulty ? [{ difficulty }] : []),
        ...(category ? [{ categoryId: category }] : []),
        ...(query
          ? [
              {
                OR: [
                  { title: { ilike: `%${query}%` } },
                  { thoughts: { ilike: `%${query}%` } }
                ]
              }
            ]
          : [])
      ]

      const result = await db.query.achievementsEntries.findMany({
        where: filters.length > 0 ? { AND: filters } : undefined,
        orderBy: { created: 'desc' }
      })

      return response.ok(
        result.map(entry => ({
          id: entry.id,
          title: entry.title,
          thoughts: entry.thoughts,
          difficulty: entry.difficulty,
          category: entry.categoryId ?? null,
          created: entry.created.toISOString(),
          updated: entry.updated.toISOString()
        }))
      )
    }
  )

export const difficultiesCount = forge
  .query({
    description: 'Get the count of achievement entries grouped by difficulty',
    output: {
      OK: z.record(z.string(), z.number())
    }
  })
  .callback(async ({ response, db }) => {
    const listItems = await db
      .select({
        difficulty: achievementsEntries.difficulty,
        count: sql<number>`CAST(COUNT(*) AS INTEGER)`.mapWith(Number)
      })
      .from(achievementsEntries)
      .groupBy(achievementsEntries.difficulty)

    const counts: Record<string, number> = {
      easy: 0,
      medium: 0,
      hard: 0,
      impossible: 0
    }

    for (const item of listItems) {
      if (item.difficulty in counts) {
        counts[item.difficulty] = item.count
      }
    }

    return response.ok(counts)
  })

export const create = forge
  .mutation({
    description: 'Create a new achievements entry',
    input: {
      body: entryInputDto
    },
    output: {
      NO_CONTENT: true,
      NOT_FOUND: true
    }
  })
  .callback(async ({ db, body, response }) => {
    if (body.category) {
      const exists = await db.query.achievementsCategories.findFirst({
        where: { id: body.category }
      })

      if (!exists) {
        return response.notFound()
      }
    }

    await db.insert(achievementsEntries).values({
      title: body.title,
      thoughts: body.thoughts ?? '',
      difficulty: body.difficulty,
      categoryId: body.category || null
    })

    return response.noContent()
  })

export const update = forge
  .mutation({
    description: 'Update an existing achievements entry',
    input: {
      query: z.object({
        id: z.string()
      }),
      body: entryInputDto
    },
    output: {
      NO_CONTENT: true,
      NOT_FOUND: true
    }
  })
  .callback(async ({ db, query: { id }, body, response }) => {
    if (body.category) {
      const exists = await db.query.achievementsCategories.findFirst({
        where: { id: body.category }
      })

      if (!exists) {
        return response.notFound()
      }
    }

    const [updated] = await db
      .update(achievementsEntries)
      .set({
        title: body.title,
        thoughts: body.thoughts ?? '',
        difficulty: body.difficulty,
        categoryId: body.category || null,
        updated: new Date()
      })
      .where(eq(achievementsEntries.id, id))
      .returning()

    if (!updated) {
      return response.notFound()
    }

    return response.noContent()
  })

export const remove = forge
  .mutation({
    description: 'Delete an achievements entry',
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
      .delete(achievementsEntries)
      .where(eq(achievementsEntries.id, id))
      .returning()

    if (!deleted) {
      return response.notFound()
    }

    return response.noContent()
  })
