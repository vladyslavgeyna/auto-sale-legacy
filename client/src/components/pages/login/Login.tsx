import { Link } from 'react-router-dom'
import FloatInput from '../../ui/float-input/FloatInput'
import PrimaryButton from '../../ui/primary-button/PrimaryButton'
import PrimaryTitle from '../../ui/primary-title/PrimaryTitle'
import styles from './Login.module.scss'

const Login = () => {
	return (
		<div className={styles.wrapper}>
			<PrimaryTitle className={styles.title}>Authorization</PrimaryTitle>
			<form className={styles.form} method='post'>
				<div>
					<FloatInput required={true} type='email' label='Email' />
				</div>
				<div>
					<FloatInput
						type='password'
						required={true}
						label='Password'
					/>
				</div>
				<PrimaryButton className={styles.button} type='submit'>
					Log in
				</PrimaryButton>
			</form>
			<div className={styles.textBlock}>
				<p>
					Don't have account yet?{' '}
					<Link to={'/account/register'}>Sign up</Link>
				</p>
			</div>
		</div>
	)
}

export default Login
