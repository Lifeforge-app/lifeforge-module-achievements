import z from 'zod'

import forge from '../forge'
import achievementsSchemas from '../schema'

export const list = forge
  .query()
  .description(
    'Get the list of achievement entries with optional filtering by difficulty, category, or search query'
  )
  .input({
    query: z.object({
      difficulty: achievementsSchemas.entries.shape.difficulty
        .optional()
        .nullable(),
      category: z.string().optional().nullable(),
      query: z.string().optional()
    })
  })
  .existenceCheck('query', {
    category: '[categories]'
  })
  .callback(async ({ pb, query: { difficulty, category, query } }) =>
    pb.getFullList
      .collection('entries')
      .filter([
        difficulty && {
          field: 'difficulty',
          operator: '=',
          value: difficulty
        },
        category
          ? {
              field: 'category',
              operator: '=',
              value: category
            }
          : undefined,
        query
          ? {
              combination: '||',
              filters: [
                {
                  field: 'title',
                  operator: '~',
                  value: query
                },
                {
                  field: 'thoughts',
                  operator: '~',
                  value: query
                }
              ]
            }
          : undefined
      ])
      .sort(['-created'])
      .execute()
  )

export const difficultiesCount = forge
  .query()
  .description('Get the count of achievement entries grouped by difficulty')
  .input({})
  .callback(
    async ({ pb }) =>
      Object.fromEntries(
        (
          await pb.getFullList.collection('difficulties_aggregated').execute()
        ).map(item => [item.difficulty, item.count])
      ) as Record<string, number>
  )

export const create = forge
  .mutation()
  .description('Create a new achievements entry')
  .input({
    body: achievementsSchemas.entries
      .omit({
        created: true,
        updated: true
      })
      .extend({
        category: z.string().optional()
      })
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create.collection('entries').data(body).execute()
  )

export const update = forge
  .mutation()
  .description('Update an existing achievements entry')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: achievementsSchemas.entries
      .omit({
        created: true,
        updated: true
      })
      .extend({
        category: z.string().optional()
      })
  })
  .existenceCheck('query', {
    id: 'entries'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('entries').id(id).data(body).execute()
  )

export const remove = forge
  .mutation()
  .description('Delete an achievements entry')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'entries'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('entries').id(id).execute()
  )
