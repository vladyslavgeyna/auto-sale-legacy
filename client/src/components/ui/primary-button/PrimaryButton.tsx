import { FC, PropsWithChildren } from 'react'
import styles from './PrimaryButton.module.scss'

const PrimaryButton: FC<
	PropsWithChildren<{
		type?: 'button' | 'submit' | 'reset' | undefined
		className?: string
		style?: React.CSSProperties
		disabled?: boolean
	}>
> = ({ type, children, className, style, disabled = false }) => {
	return (
		<button
			disabled={disabled}
			style={style}
			className={`${className} ${styles.button}`}
			type={type}>
			{children}
		</button>
	)
}

export default PrimaryButton
