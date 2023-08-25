import React, { FC, PropsWithChildren } from 'react'
import './Modal.css'

const Modal: FC<
	PropsWithChildren<{
		isActive: boolean
		setIsActive: React.Dispatch<React.SetStateAction<boolean>>
	}>
> = ({ children, isActive, setIsActive }) => {
	return (
		<div
			className={isActive ? `modal active` : 'modal'}
			onClick={() => setIsActive(false)}>
			<div className={'content'} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

export default Modal
