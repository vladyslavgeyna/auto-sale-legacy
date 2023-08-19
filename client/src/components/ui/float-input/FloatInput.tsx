import { FC } from 'react'
import styles from './FloatInput.module.scss'

const FloatInput: FC<{
	label: string
	type?: React.HTMLInputTypeAttribute | undefined
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
	required?: boolean
	register?: any
	className?: string
}> = ({
	label,
	type = 'text',
	onChange,
	value,
	required = false,
	register,
	className
}) => {
	return (
		<>
			<div className={styles.wrapper}>
				<input
					required={required}
					value={value}
					onChange={onChange}
					className={`${styles.input} ${className}`}
					type={type}
					placeholder=' '
					{...register}
				/>
				<label className={styles.label}>{label}</label>
			</div>
		</>
	)
}

export default FloatInput
