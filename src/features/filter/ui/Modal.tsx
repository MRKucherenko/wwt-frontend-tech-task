import { MouseEvent, ReactNode, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type ModalProps = {
	onClose: () => void
	children: ReactNode
}

export const Modal = ({ onClose, children }: ModalProps) => {
	const { t } = useTranslation('filter')
	useEffect(() => {
		const closeByEscape = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				onClose()
			}
		}

		window.addEventListener('keydown', closeByEscape)
		return () => {
			window.removeEventListener('keydown', closeByEscape)
		}
	}, [onClose])

	const closeByClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	return (
		<div
			onClick={closeByClick}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		>
			<div
				role="dialog"
				aria-modal="true"
				className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-white"
			>
				<button
					type="button"
					onClick={onClose}
					aria-label={t('close')}
					className="absolute right-4 top-4 z-10 text-gray-400"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					>
						<line
							x1="6"
							y1="6"
							x2="18"
							y2="18"
						/>
						<line
							x1="18"
							y1="6"
							x2="6"
							y2="18"
						/>
					</svg>
				</button>

				<div className="max-h-[85vh] overflow-y-auto p-6 no-scrollbar">
					{children}
				</div>
			</div>
		</div>
	)
}
