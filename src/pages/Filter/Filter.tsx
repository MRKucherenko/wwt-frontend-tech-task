import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterItem, FilterType } from '@/shared/api/types/Filter'
import filterDataJson from '@/shared/temp/filterData.json'

import { useFilterStore } from '../Home/ui/App'

type FilterModalProps = {
	onClose: (op: boolean) => void
}

const FilterModal = ({ onClose }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const [filteredData, setFilteredData] = useState<
		(FilterItem & { selectedOptions: string[] })[] | null
	>(null)
	const appliedFilters = useFilterStore(state => state.appliedFilters)
	const setFilters = useFilterStore(state => state.setFilters)
	const [showConfirm, setShowConfirm] = useState(false)

	useEffect(() => {
		setFilteredData(
			filterDataJson.filterItems.map(item => ({
				...item,
				type: FilterType.OPTION,
				selectedOptions: [] as string[]
			}))
		)
	}, [appliedFilters])

	const clearAllOptions = () => {
		setFilteredData(
			prev =>
				prev?.map(item => ({
					...item,
					selectedOptions: []
				})) || null
		)
	}

	const toggleOption = (itemId: string, optionName: string) => {
		setFilteredData(
			prev =>
				prev?.map(item =>
					item.id === itemId
						? {
								...item,
								selectedOptions: item.selectedOptions.includes(optionName)
									? item.selectedOptions.filter(opt => opt !== optionName)
									: [...item.selectedOptions, optionName]
							}
						: item
				) || null
		)
	}

	const applyFilters = () => setShowConfirm(true)

	const confirmApply = () => {
		if (filteredData) {
			const dataSave: { [id: string]: string[] } = {}
			filteredData.forEach(item => {
				dataSave[item.id] = item.selectedOptions
			})
			setFilters(dataSave)
		}
		setShowConfirm(false)
		onClose(false)
	}

	return (
		<div
			className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-sm ${showConfirm ? '' : 'overflow-y-auto'}`}
		>
			<div
				className={`bg-white rounded-2xl w-7xl py-10 px-8 absolute top-20 right-1/2 translate-x-1/2`}
			>
				<div className="flex items-center justify-between border-b-2 border-[#B4B4B4] pb-6">
					<h1 className="text-[40px] font-medium flex-1 text-center">
						{t('title')}
					</h1>
					<img
						src="/img/close.png"
						alt="close icon"
						className="w-6 h-6 cursor-pointer"
						onClick={() => onClose(false)}
					/>
				</div>

				{filteredData?.map(item => (
					<article
						key={item.id}
						className="mt-8 border-b-2 border-[#B4B4B4] pb-6"
					>
						<h2 className="text-2xl font-medium text-[#31393C]">{item.name}</h2>
						<ul className="grid grid-cols-3 mt-6 gap-y-2">
							{item.options.map(opt => (
								<label
									key={opt.id}
									className="flex items-center gap-4 cursor-pointer"
									onClick={() => toggleOption(item.id, opt.name)}
								>
									<span
										className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center ${
											item.selectedOptions.includes(opt.name)
												? 'bg-white border-[#FF5F00]'
												: 'border-[#31393C]'
										}`}
									>
										{item.selectedOptions.includes(opt.name) && (
											<span className="w-3 h-3 bg-[#FF5F00] rounded-sm"></span>
										)}
									</span>
									<p>{opt.name}</p>
								</label>
							))}
						</ul>
					</article>
				))}

				<div className="flex justify-center mt-8 relative">
					<button
						onClick={applyFilters}
						className="bg-[#FF5F00] py-6 px-17 text-white font-semibold rounded-2xl cursor-pointer"
					>
						{t('Apply')}
					</button>
					<p
						onClick={clearAllOptions}
						className="absolute right-0 top-1/2 -translate-y-1/2 text-[#078691] font-medium text-[16px] underline cursor-pointer"
					>
						{t('Clear all parameters')}
					</p>
				</div>
			</div>

			{showConfirm && (
				<div className="fixed inset-0 z-60 flex items-center justify-center">
					<div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
					<div className="relative w-7xl bg-white rounded-2xl px-12 py-10 shadow-xl">
						<div className="flex items-center justify-between mb-12">
							<h2 className="text-[28px] font-medium text-center flex-1">
								{t('acceptModal.title')}
							</h2>
							<button
								onClick={() => setShowConfirm(false)}
								className="p-2"
							>
								<img
									src="/img/close.png"
									alt="close"
									className="w-6 h-6 cursor-pointer"
								/>
							</button>
						</div>
						<div className="flex items-center justify-center gap-8">
							<button
								onClick={() => setShowConfirm(false)}
								className="border-2 border-[#B4B4B4] bg-white py-4 px-14 rounded-2xl text-[#474747] font-medium cursor-pointer"
							>
								{t('acceptModal.oldFilter')}
							</button>
							<button
								onClick={confirmApply}
								className="border-2 border-[#FF5F00] bg-[#FF5F00] py-4 px-14 rounded-2xl text-white font-medium cursor-pointer"
							>
								{t('acceptModal.newFilter')}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default FilterModal
