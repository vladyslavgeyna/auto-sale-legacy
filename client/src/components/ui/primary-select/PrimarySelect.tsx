import { FC, PropsWithChildren } from 'react'
import styles from './PrimarySelect.module.scss'

const PrimarySelect: FC<
	PropsWithChildren<{
		defaultValue?: string
		onChange?: (value: string) => void
		value?: string
		register?: any
		name?: string
	}>
> = ({ children, defaultValue, onChange, value, register, name }) => {
	return (
		<select
			value={value}
			onChange={onChange && (e => onChange(e.target.value))}
			className={styles.select}
			name={name}
			{...register}>
			{children}
		</select>
	)
}

export default PrimarySelect
