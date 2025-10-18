import { forgeController, forgeRouter } from '@functions/routes'
import { SCHEMAS } from '@schema'
import z from 'zod'

const list = forgeController
  .query()
  .description('Get all achievements entries by difficulty')
  .input({
    query: z.object({
      difficulty:
        SCHEMAS.achievements.entries.schema.shape.difficulty.optional(),
      category: z.string().optional()
    })
  })
  .existenceCheck('query', {
    category: '[achievements__categories]'
  })
  .callback(async ({ pb, query: { difficulty, category } }) =>
    pb.getFullList
      .collection('achievements__entries')
      .filter([
        difficulty && {
          field: 'difficulty',
          operator: '=',
          value: difficulty
        },
        !!category && {
          field: 'category',
          operator: '=',
          value: category
        }
      ])
      .execute()
  )

const difficultiesCount = forgeController
  .query()
  .description('Get the entries count grouped by difficulties')
  .input({})
  .callback(
    async ({ pb }) =>
      Object.fromEntries(
        (
          await pb.getFullList
            .collection('achievements__difficulties_aggregated')
            .execute()
        ).map(item => [item.difficulty, item.count])
      ) as Record<string, number>
  )

const create = forgeController
  .mutation()
  .description('Create a new achievements entry')
  .input({
    body: SCHEMAS.achievements.entries.schema
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
    pb.create.collection('achievements__entries').data(body).execute()
  )

const update = forgeController
  .mutation()
  .description('Update an existing achievements entry')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: SCHEMAS.achievements.entries.schema
      .omit({
        created: true,
        updated: true
      })
      .extend({
        category: z.string().optional()
      })
  })
  .existenceCheck('query', {
    id: 'achievements__entries'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('achievements__entries').id(id).data(body).execute()
  )

const remove = forgeController
  .mutation()
  .description('Delete an existing achievements entry')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'achievements__entries'
  })
  .statusCode(204)
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('achievements__entries').id(id).execute()
  )

export default forgeRouter({
  list,
  difficultiesCount,
  create,
  update,
  remove
})
