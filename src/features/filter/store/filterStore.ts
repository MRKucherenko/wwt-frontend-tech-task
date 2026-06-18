import { create } from 'zustand'

import type { SearchRequestFilter } from '../../../shared/api/types/SearchRequest/SearchRequestFilter'

type FilterState = {
	appliedFilters: SearchRequestFilter
	apply: (filters: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterState>(set => ({
	appliedFilters: [],
	apply: filters => set({ appliedFilters: filters })
}))
