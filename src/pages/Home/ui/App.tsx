import FilterModal from '@/pages/Filter/Filter'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { create } from 'zustand'


interface FilterState {
	appliedFilters: { [id: string]: string[] }
	setFilters: (filters: { [id: string]: string[] }) => void
}

export const useFilterStore = create<FilterState>(set => ({
	appliedFilters: {},
	setFilters: filters => set({ appliedFilters: filters })
}))

export const App = () => {
	const { t } = useTranslation('filter')
	const [isOpen, setIsOpen] = useState(false)
	const appliedFilters = useFilterStore(state => state.appliedFilters)

	return (
		<>
			<section className="w-full h-dvh flex items-center justify-center relative">
				{/* eslint-disable-next-line i18next/no-literal-string */}
				<button
					className="bg-amber-400 px-10 py-4 rounded-2xl cursor-pointer text-white font-medium text-2xl"
					onClick={() => setIsOpen(true)}
				>
					{t('Filers')}
				</button>

				<pre className="text-left bg-gray-100 p-4 rounded w-7xl">
					{JSON.stringify(appliedFilters, null, 2)}
				</pre>
			</section>

			{isOpen && <FilterModal onClose={() => setIsOpen(false)} />}
		</>
	)
}
