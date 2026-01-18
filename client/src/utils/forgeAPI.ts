import { type APIRoutes } from '@server/routes.types'
import { createForgeProxy } from 'shared'

if (!(window as any).VITE_API_HOST) {
  throw new Error('VITE_API_HOST is not defined')
}

const forgeAPI = createForgeProxy<APIRoutes>(
  import.meta.env.VITE_API_HOST || (window as any).VITE_API_HOST,
  'achievements'
)

export default forgeAPI
