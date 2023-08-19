import { FC, PropsWithChildren } from 'react'
import styles from './FormErrorMessage.module.scss'

const FormErrorMessage: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	return <p className={`${styles.text} ${className}`}>{children}</p>
}

export default FormErrorMessage
