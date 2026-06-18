import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterStore } from '../../../features/filter/store/filterStore'
import { FilterModal } from './../../../features/filter/ui/FilterModal'

export const App = () => {
	const { t, i18n } = useTranslation('filter')
	const [isOpen, setIsOpen] = useState(false)
	const appliedFilters = useFilterStore(state => state.appliedFilters)

	const handleOpen = () => {
		setIsOpen(!isOpen)
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === 'en' ? 'ua' : 'en')
	}

	return (
		<div className="mx-auto max-w-2xl p-6">
			<div className="mb-4 flex gap-3">
				<button
					type="button"
					onClick={handleOpen}
					className="rounded-lg bg-[#FF5F00] px-6 py-2 text-white"
				>
					{t('open')}
				</button>
				<button
					type="button"
					onClick={toggleLanguage}
					className="rounded-lg border border-gray-300 px-4 py-2"
				>
					{i18n.language === 'en' ? 'UA' : 'EN'}
				</button>
			</div>

			<pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 text-sm">
				{JSON.stringify(appliedFilters, null, 2)}
			</pre>

			{isOpen && <FilterModal onClose={handleClose} />}
		</div>
	)
}
