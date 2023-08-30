import { FC, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import styles from './Heart.module.scss'

const Heart: FC<{ isActive: boolean; onClick: () => void }> = ({
	isActive,
	onClick
}) => {
	const [isHeartActive, setIsHeartActive] = useState(isActive)

	const handleOnMouseEnter = () => {
		setIsHeartActive(!isActive)
	}

	const handleOnMouseLeave = () => {
		setIsHeartActive(isActive)
	}

	return isHeartActive ? (
		<FaHeart
			onClick={onClick}
			className={styles.heart}
			onMouseEnter={handleOnMouseEnter}
			onMouseLeave={handleOnMouseLeave}
		/>
	) : (
		<FaRegHeart
			onClick={onClick}
			className={styles.heart}
			onMouseEnter={handleOnMouseEnter}
			onMouseLeave={handleOnMouseLeave}
		/>
	)
}

export default Heart
