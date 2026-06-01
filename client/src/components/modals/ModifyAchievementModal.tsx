import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import z from 'zod'

import { FormModal, TAILWIND_PALETTE, TextAreaField, TextField, ListboxField, createDefaultValues } from '@lifeforge/ui'

import useFilter from '@/hooks/useFilter'
import forgeAPI from '@/utils/forgeAPI'

import type { Achievement } from '../..'

const difficulties = [
  ['easy', 'green'],
  ['medium', 'yellow'],
  ['hard', 'red'],
  ['impossible', 'purple']
] as const

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  thoughts: z.string().min(1, 'Thoughts are required'),
  difficulty: z.enum(['easy', 'medium', 'hard', 'impossible']),
  category: z.string().optional()
})

function ModifyAchievementModal({
  data: { modifyType, initialData },
  onClose
}: {
  data: {
    modifyType: 'create' | 'update'
    initialData?: Achievement
  }
  onClose: () => void
}) {
  const { t } = useTranslation('apps.achievements')

  const { filter } = useFilter()

  const categoriesQuery = useQuery(forgeAPI.categories.list.queryOptions())

  const categories = categoriesQuery.data || []

  const queryClient = useQueryClient()

  const mutation = useMutation(
    (modifyType === 'create'
      ? forgeAPI.entries.create
      : forgeAPI.entries.update.input({
          id: initialData?.id || ''
        })
    ).mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['achievements']
        })
      }
    })
  )

  const form = useForm({
    defaultValues: {
      ...createDefaultValues(schema),
      ...initialData,
      difficulty:
        initialData?.difficulty ||
        (filter.difficulty as Achievement['difficulty'])
    },
    mode: 'all',
    resolver: zodResolver(schema)
  })

  const difficultyOptions = difficulties.map(([name, color]) => ({
    text: t(`difficulties.${name}`),
    value: name as Achievement['difficulty'],
    color: TAILWIND_PALETTE[color as keyof typeof TAILWIND_PALETTE][500]
  }))

  const categoryOptions = categories.map(category => ({
    text: category.name,
    color: category.color,
    icon: category.icon,
    value: category.id
  }))

  return (
    <FormModal
      form={form}
      submissionConfig={{
        handler: mutation.mutateAsync,
        template: modifyType
      }}
      uiConfig={{
        icon: modifyType === 'create' ? 'tabler:plus' : 'tabler:pencil',
        loading: categoriesQuery.isLoading,
        namespace: 'apps.achievements',
        title: `achievement.${modifyType}`,
        onClose
      }}
    >
      <TextField
        required
        control={form.control}
        icon="tabler:award"
        label="Achievement title"
        name="title"
        placeholder="My achievement"
      />
      <TextAreaField
        required
        control={form.control}
        icon="tabler:bubble-text"
        label="Achievement thoughts"
        name="thoughts"
        placeholder="My thoughts"
      />
      <ListboxField
        required
        control={form.control}
        icon="tabler:circle-dot"
        label="Achievement difficulty"
        name="difficulty"
        options={difficultyOptions}
      />
      <ListboxField
        control={form.control}
        icon="tabler:category"
        label="Achievement category"
        name="category"
        options={categoryOptions}
      />
    </FormModal>
  )
}

export default ModifyAchievementModal
