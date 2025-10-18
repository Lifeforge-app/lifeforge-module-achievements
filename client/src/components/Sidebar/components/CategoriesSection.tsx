import ModifyCategoriesModal from '@/components/modals/ModifyCategoriesModal'
import useFilter from '@/hooks/useFilter'
import forgeAPI from '@/utils/forgeAPI'
import {
  EmptyStateScreen,
  SidebarItem,
  SidebarTitle,
  WithQueryData,
  useModalStore
} from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { usePersonalization } from 'shared'

import CategoryItem from './CategoryItem'

function CategoriesSection() {
  const { t } = useTranslation('apps.achievements')

  const { bgTempPalette } = usePersonalization()

  const { updateFilter, category: selectedCategory } = useFilter()

  const open = useModalStore(state => state.open)

  return (
    <>
      <SidebarTitle
        actionButtonIcon="tabler:plus"
        actionButtonOnClick={() => {
          open(ModifyCategoriesModal, { modifyType: 'create' })
        }}
        label={t('sidebar.categories')}
      />
      <WithQueryData controller={forgeAPI.achievements.categories.list}>
        {data =>
          data.length === 0 ? (
            <EmptyStateScreen
              smaller
              className="h-min"
              icon="tabler:apps-off"
              name="categories"
              namespace="apps.achievements"
            />
          ) : (
            <>
              <SidebarItem
                active={!selectedCategory}
                icon="tabler:category"
                label={t('sidebar.allCategories')}
                sideStripColor={bgTempPalette[500]}
                onClick={() => {
                  updateFilter('category', null)
                }}
              />
              {data.map(category => (
                <CategoryItem key={category.id} category={category} />
              ))}
            </>
          )
        }
      </WithQueryData>
    </>
  )
}

export default CategoriesSection
