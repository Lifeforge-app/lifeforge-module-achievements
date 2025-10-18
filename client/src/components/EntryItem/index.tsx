import { ItemWrapper } from 'lifeforge-ui'

import type { Achievement } from '../..'
import AchievementMeta from './components/AchievementMeta'
import ActionMenu from './components/ActionMenu'
import AwardIcon from './components/AwardIcon'

function EntryItem({ entry }: { entry: Achievement }) {
  return (
    <ItemWrapper as="li" className="flex items-start justify-between gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <AwardIcon difficulty={entry.difficulty} />
        <AchievementMeta
          category={entry.category}
          thoughts={entry.thoughts}
          title={entry.title}
          created={entry.created}
        />
      </div>
      <ActionMenu entry={entry} />
    </ItemWrapper>
  )
}

export default EntryItem
