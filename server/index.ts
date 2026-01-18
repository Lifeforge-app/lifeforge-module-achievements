import { forgeRouter } from '@lifeforge/server-utils'

import * as categoriesRoutes from './routes/categories'
import * as entriesRoutes from './routes/entries'

const routes = forgeRouter({
  entries: entriesRoutes,
  categories: categoriesRoutes
})

export type routesType = typeof routes

export default routes
