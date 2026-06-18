import { useTranslation } from 'react-i18next'

import { Modal } from './Modal'

type ConfirmDialogProps = {
	onConfirm: () => void
	onCancel: () => void
}

export const ConfirmDialog = ({ onConfirm, onCancel }: ConfirmDialogProps) => {
	const { t } = useTranslation('filter')

	return (
		<Modal onClose={onCancel}>
			<p className="mb-10 text-center text-2xl font-semibold">
				{t('confirmText')}
			</p>
			<div className="mx-auto flex max-w-md gap-3">
				<button
					type="button"
					onClick={onCancel}
					className="flex-1 rounded-lg border border-gray-300 px-6 py-2.5"
				>
					{t('useOld')}
				</button>
				<button
					type="button"
					onClick={onConfirm}
					className="flex-1 rounded-lg bg-[#FF5F00] px-6 py-2.5 text-white"
				>
					{t('applyNew')}
				</button>
			</div>
		</Modal>
	)
}
