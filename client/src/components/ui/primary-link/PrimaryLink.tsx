import { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import styles from './PrimaryLink.module.scss'

const PrimaryLink: FC<
	PropsWithChildren<{
		className?: string
		style?: React.CSSProperties
		to: string
	}>
> = ({ children, className, style, to }) => {
	return (
		<Link style={style} className={`${className} ${styles.button}`} to={to}>
			{children}
		</Link>
	)
}

export default PrimaryLink
