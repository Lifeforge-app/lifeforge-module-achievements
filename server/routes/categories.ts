import { forgeController, forgeRouter } from '@functions/routes'
import { SCHEMAS } from '@schema'
import z from 'zod'

const list = forgeController
  .query()
  .description('List achievement categories')
  .input({})
  .callback(async ({ pb }) =>
    pb.getFullList.collection('achievements__categories_aggregated').execute()
  )

const create = forgeController
  .mutation()
  .description('Create a new achievement category')
  .input({
    body: SCHEMAS.achievements.categories.schema
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create.collection('achievements__categories').data(body).execute()
  )

const update = forgeController
  .mutation()
  .description('Update an existing achievement category')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: SCHEMAS.achievements.categories.schema
  })
  .existenceCheck('query', {
    id: 'achievements__categories'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('achievements__categories').id(id).data(body).execute()
  )

const remove = forgeController
  .mutation()
  .description('Delete an achievement category')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'achievements__categories'
  })
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('achievements__categories').id(id).execute()
  )

export default forgeRouter({ list, create, update, remove })
