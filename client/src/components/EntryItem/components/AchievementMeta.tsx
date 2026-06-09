import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { usePersonalization , Box, Flex, Icon, Text } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

dayjs.extend(relativeTime)

function AchievementMeta({
  title,
  thoughts,
  category,
  created
}: {
  category: string
  title: string
  thoughts: string
  created: string
}) {
  const { t } = useTranslation('apps.achievements')

  const { language } = usePersonalization()

  const categoriesQuery = useQuery(forgeAPI.categories.list.queryOptions())

  const categories = categoriesQuery.data || []

  const categoryData = useCallback(
    () => categories.find(cat => cat.id === category),
    [categories, category]
  )()

  return (
    <Box>
      <Flex
        align="center"
        gap="xs"
        mb="xs"
        mr={{ base: 'none', sm: 'md' }}
        wrap="wrap"
      >
        {categoryData && (
          <>
            <Text asChild color="muted" size="sm" weight="medium">
              <Flex align="center" as="p" gap="xs">
                <Box
                  p="xs"
                  r="sm"
                  style={{ backgroundColor: `${categoryData.color}20` }}
                >
                  <Icon
                    icon={categoryData.icon}
                    size="0.75em"
                    style={{ color: categoryData.color }}
                  />
                </Box>
                {categoryData.name}
              </Flex>
            </Text>
            <Text asChild color="muted">
              <Icon icon="tabler:circle-filled" size="4px" />
            </Text>
          </>
        )}
        <Text as="p" color="muted" size="sm">
          {t('accomplishedOn', {
            date: dayjs(created).locale(language).fromNow()
          })}
        </Text>
      </Flex>
      <Text
        as="h2"
        mb="xs"
        mr={{ base: 'none', sm: 'md' }}
        size="lg"
        weight="semibold"
      >
        {title}
      </Text>
      <Text as="p" color="muted" size="sm">
        {thoughts}
      </Text>
    </Box>
  )
}

export default AchievementMeta
