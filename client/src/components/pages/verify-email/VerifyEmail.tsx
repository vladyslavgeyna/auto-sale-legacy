import { FC } from 'react'
import PrimaryTitle from '../../ui/primary-title/PrimaryTitle'
import styles from './VerifyEmail.module.scss'

const VerifyEmail: FC<{ email: string }> = ({ email }) => {
	return (
		<div className={styles.wrapper}>
			<PrimaryTitle>You have registered successfully</PrimaryTitle>
			<p className={styles.text}>
				Please, check out your <strong>{email}</strong> email address to
				verify email
			</p>
			<p className={styles.textSmall}>* You can leave this page</p>
		</div>
	)
}

export default VerifyEmail
