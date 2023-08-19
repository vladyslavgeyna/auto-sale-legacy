import { FC } from 'react'
import styles from './FloatInput.module.scss'

const FloatInput: FC<{
	label: string
	type?: React.HTMLInputTypeAttribute | undefined
	onChange?: () => void
	value?: string
	required?: boolean
}> = ({ label, type = 'text', onChange, value, required = false }) => {
	return (
		<div className={styles.wrapper}>
			<input
				required={required}
				value={value}
				onChange={onChange}
				className={styles.input}
				type={type}
				placeholder=' '
			/>
			<label className={styles.label}>{label}</label>
		</div>
	)
}

export default FloatInput
