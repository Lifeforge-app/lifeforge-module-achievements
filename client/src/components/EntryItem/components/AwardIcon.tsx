import { Icon } from '@iconify/react/dist/iconify.js'
import { Box } from 'lifeforge-ui'

import type { Achievement } from '../../..'

const DIFFICULTY_COLORS = {
  easy: '#22c55e',
  medium: '#eab308',
  hard: '#ef4444',
  impossible: '#a855f7'
} as const

function AwardIcon({ difficulty }: { difficulty: Achievement['difficulty'] }) {
  return (
    <Box>
      <Box
        p="sm"
        rounded="md"
        style={{
          borderWidth: '1.5px',
          borderColor: DIFFICULTY_COLORS[difficulty],
          backgroundColor: `${DIFFICULTY_COLORS[difficulty]}20`,
          color: DIFFICULTY_COLORS[difficulty],
          width: 'min-content'
        }}
      >
        <Icon height={24} icon="tabler:award" width={24} />
      </Box>
    </Box>
  )
}

export default AwardIcon
