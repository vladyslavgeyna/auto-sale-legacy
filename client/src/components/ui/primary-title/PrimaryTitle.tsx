import { FC, PropsWithChildren } from 'react'

const PrimaryTitle: FC<
	PropsWithChildren<{
		className?: string
	}>
> = ({ children, className }) => {
	return (
		<h1
			className={className}
			style={{
				fontSize: '50px',
				fontWeight: 'bold'
			}}>
			{children}
		</h1>
	)
}

export default PrimaryTitle
