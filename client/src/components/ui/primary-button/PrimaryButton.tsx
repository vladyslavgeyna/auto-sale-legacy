import { FC, PropsWithChildren } from 'react'
import styles from './PrimaryButton.module.scss'

const PrimaryButton: FC<
	PropsWithChildren<{
		type?: 'button' | 'submit' | 'reset' | undefined
		className?: string
		style?: React.CSSProperties
	}>
> = ({ type, children, className, style }) => {
	return (
		<button
			style={style}
			className={`${className} ${styles.button}`}
			type={type}>
			{children}
		</button>
	)
}

export default PrimaryButton
