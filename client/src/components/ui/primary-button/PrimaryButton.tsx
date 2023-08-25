import { FC, PropsWithChildren } from 'react'
import styles from './PrimaryButton.module.scss'

const PrimaryButton: FC<
	PropsWithChildren<{
		type?: 'button' | 'submit' | 'reset' | undefined
		className?: string
		style?: React.CSSProperties
		disabled?: boolean
		onClick?: () => void
	}>
> = ({ type, children, className, style, onClick, disabled = false }) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			style={style}
			className={`${className} ${styles.button}`}
			type={type}>
			{children}
		</button>
	)
}

export default PrimaryButton
