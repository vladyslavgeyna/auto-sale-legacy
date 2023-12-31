import { FC } from 'react'
import styles from './PrimaryInput.module.scss'

const PrimaryInput: FC<{
	type?: React.HTMLInputTypeAttribute | undefined
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
	value?: string
	required?: boolean
	register?: any
	className?: string
	placeholder?: string
	name?: string
	id?: string
}> = ({
	type = 'text',
	onChange,
	value,
	required = false,
	register,
	className,
	placeholder,
	name,
	onBlur,
	id
}) => {
	return (
		<>
			<input
				onBlur={onBlur}
				required={required}
				value={value}
				name={name}
				onChange={onChange}
				className={`${styles.input} ${className}`}
				type={type}
				placeholder={placeholder}
				id={id}
				{...register}
			/>
		</>
	)
}

export default PrimaryInput
