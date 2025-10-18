import { DIFFICULTIES } from '@'
import { useDebounce } from '@uidotdev/usehooks'
import {
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
  useQueryStates
} from 'shared'

export default function useFilter() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    parseAsString.withDefault('')
  )

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const [filter, setFilter] = useQueryStates({
    difficulty: parseAsStringEnum(Object.keys(DIFFICULTIES)).withDefault(''),
    favourite: parseAsBoolean.withDefault(false),
    category: parseAsString.withDefault('')
  })

  const updateFilter = (key: keyof typeof filter, value: any) => {
    setFilter(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return {
    searchQuery,
    debouncedSearchQuery,
    setSearchQuery,
    ...filter,
    updateFilter
  }
}
