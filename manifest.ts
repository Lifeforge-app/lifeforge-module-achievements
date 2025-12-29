import { lazy } from 'react'
import type { ModuleConfig } from 'shared'

export default {
  name: 'Achievements',
  icon: 'tabler:award',
  routes: {
    '/': lazy(() => import('@'))
  },
  category: 'Lifestyle'
} satisfies ModuleConfig
