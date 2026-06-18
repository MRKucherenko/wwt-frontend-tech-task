import { useQuery } from '@tanstack/react-query'

import type { FilterItem } from './../../shared/api/types/Filter/FilterItem'
import filterData from './../../shared/temp/filterData.json'

export const useFilters = () => {
	return useQuery({
		queryKey: ['filters'],
		queryFn: async () => {
			return filterData.filterItems as FilterItem[]
		}
	})
}
