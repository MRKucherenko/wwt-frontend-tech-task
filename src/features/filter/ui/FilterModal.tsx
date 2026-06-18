import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterType } from '@/shared/api/types/Filter'

import { useFilterStore } from '../store/filterStore'
import { useFilters } from '../useFilter'
import { ConfirmDialog } from './ConfirmDialog'
import { Modal } from './Modal'

type FilterModalProps = {
	onClose: () => void
}

const toggleInArray = (arr: string[], value: string): string[] => {
	if (arr.includes(value)) {
		return arr.filter(item => item !== value)
	}

	return [...arr, value]
}

export const FilterModal = ({ onClose }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const { data, isLoading, isError } = useFilters()
	const appliedFilters = useFilterStore(state => state.appliedFilters)
	const apply = useFilterStore(state => state.apply)
	const [draft, setDraft] = useState(appliedFilters)
	const [showConfirm, setShowConfirm] = useState(false)

	const isChecked = (groupId: string, optionId: string) =>
		draft.find(group => group.id === groupId)?.optionsIds.includes(optionId) ??
		false

	const toggleOption = (groupId: string, optionId: string) => {
		setDraft(prev => {
			const group = prev.find(entry => entry.id === groupId)
			const nextIds = toggleInArray(group?.optionsIds ?? [], optionId)

			if (!group) {
				return [
					...prev,
					{ id: groupId, type: FilterType.OPTION, optionsIds: nextIds }
				]
			}

			return prev.map(entry =>
				entry.id === groupId ? { ...entry, optionsIds: nextIds } : entry
			)
		})
	}

	const handleConfirm = () => {
		apply(draft.filter(entry => entry.optionsIds.length > 0))
		onClose()
	}

	return (
		<Modal onClose={onClose}>
			<h2 className="mb-3 text-center text-lg font-semibold">{t('title')}</h2>

			{isLoading && <p>{t('loading')}</p>}
			{isError && <p>{t('error')}</p>}

			{data && (
				<div className="divide-y divide-gray-200">
					{data.map(item => (
						<fieldset
							key={item.id}
							className="py-3"
						>
							<legend className="mb-1 font-semibold">{item.name}</legend>
							<div className="grid grid-cols-3 gap-x-4 gap-y-1">
								{item.options.map(option => (
									<label
										key={option.id}
										className="flex items-center gap-2 text-sm"
									>
										<input
											type="checkbox"
											checked={isChecked(item.id, option.id)}
											onChange={() => toggleOption(item.id, option.id)}
											className="accent-[#FF5F00]"
										/>
										<span>{option.name}</span>
									</label>
								))}
							</div>
						</fieldset>
					))}
				</div>
			)}

			<div className="grid grid-cols-3 items-center border-t border-gray-200 pt-4">
				<div />
				<button
					type="button"
					onClick={() => setShowConfirm(true)}
					className="justify-self-center rounded-lg bg-[#FF5F00] px-8 py-2 text-white"
				>
					{t('apply')}
				</button>
				<button
					type="button"
					onClick={() => setDraft([])}
					className="justify-self-end text-sm text-teal-600 underline"
				>
					{t('clearAll')}
				</button>
			</div>

			{showConfirm && (
				<ConfirmDialog
					onConfirm={handleConfirm}
					onCancel={() => setShowConfirm(false)}
				/>
			)}
		</Modal>
	)
}
