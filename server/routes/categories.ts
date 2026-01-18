import z from 'zod'

import forge from '../forge'
import achievementsSchemas from '../schema'

export const list = forge
  .query()
  .description('Get the list of achievement categories')
  .input({})
  .callback(async ({ pb }) =>
    pb.getFullList.collection('categories_aggregated').execute()
  )

export const create = forge
  .mutation()
  .description('Create a new achievement category')
  .input({
    body: achievementsSchemas.categories
  })
  .statusCode(201)
  .callback(({ pb, body }) =>
    pb.create.collection('categories').data(body).execute()
  )

export const update = forge
  .mutation()
  .description('Update an existing achievement category')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: achievementsSchemas.categories
  })
  .existenceCheck('query', {
    id: 'categories'
  })
  .callback(({ pb, query: { id }, body }) =>
    pb.update.collection('categories').id(id).data(body).execute()
  )

export const remove = forge
  .mutation()
  .description('Delete an achievement category')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'categories'
  })
  .callback(({ pb, query: { id } }) =>
    pb.delete.collection('categories').id(id).execute()
  )
