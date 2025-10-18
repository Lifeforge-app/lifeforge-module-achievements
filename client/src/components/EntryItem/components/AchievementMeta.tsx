import forgeAPI from '@/utils/forgeAPI'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'

function AchievementMeta({
  title,
  thoughts,
  category
}: {
  category: string
  title: string
  thoughts: string
}) {
  const categoriesQuery = useQuery(
    forgeAPI.achievements.categories.list.queryOptions()
  )

  const categories = categoriesQuery.data || []

  const categoryData = useCallback(
    () => categories.find(cat => cat.id === category),
    [categories, category]
  )()

  return (
    <div>
      {categoryData && (
        <p className="text-bg-600 dark:text-bg-400 mb-1 flex items-center gap-1 text-sm font-medium">
          <div
            className="rounded-sm p-1"
            style={{ backgroundColor: categoryData.color + '20' }}
          >
            <Icon
              className="h-4 w-4"
              icon={categoryData.icon}
              style={{ color: categoryData.color }}
            />
          </div>
          {categoryData.name}
        </p>
      )}
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-bg-500 mt-1 whitespace-pre-wrap text-sm">{thoughts}</p>
    </div>
  )
}

export default AchievementMeta
