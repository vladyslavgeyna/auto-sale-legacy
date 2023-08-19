import { SiProbot } from 'react-icons/si'
import PrimaryTitle from '../../ui/primary-title/PrimaryTitle'
import styles from './NotFound.module.scss'

const NotFound = () => {
	return (
		<>
			<PrimaryTitle className={styles.title}>Not found</PrimaryTitle>
			<div className={styles.robot}>
				<SiProbot />
			</div>
		</>
	)
}

export default NotFound
