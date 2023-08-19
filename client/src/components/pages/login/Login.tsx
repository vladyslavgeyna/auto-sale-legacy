import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { useGetFormError } from '../../../hooks/useGetFormError'
import { useLoginMutation } from '../../../store/api/user.api'
import { IHttpError } from '../../../types/http-error.interface'
import { ILoginInput } from '../../../types/login-input.interface'
import { EMAIL_REGEXP } from '../../../utils/validation'
import FloatInput from '../../ui/float-input/FloatInput'
import FormErrorMessage from '../../ui/form-error-message/FormErrorMessage'
import PrimaryButton from '../../ui/primary-button/PrimaryButton'
import PrimaryTitle from '../../ui/primary-title/PrimaryTitle'
import styles from './Login.module.scss'

const Login = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isValid, isDirty },
		reset
	} = useForm<ILoginInput>({
		mode: 'onChange'
	})
	const [login, { error, data, isLoading, isSuccess }] = useLoginMutation()

	const navigate = useNavigate()

	const { setCredentials } = useActions()

	const onSubmit: SubmitHandler<ILoginInput> = async loginInputData => {
		try {
			await login(loginInputData)
		} catch (error) {
			console.log(error)
		}
		reset()
	}

	useEffect(() => {
		if (data && isSuccess) {
			setCredentials(data)
			navigate('/')
		}
	}, [data, isSuccess])

	const getError = useGetFormError(styles.errorMessage)

	return (
		<div className={styles.wrapper}>
			<PrimaryTitle className={styles.title}>Authorization</PrimaryTitle>
			{isLoading ? (
				<p>Loading...</p>
			) : error ? (
				<FormErrorMessage className={styles.serverError}>
					{(error as IHttpError).data.message}
				</FormErrorMessage>
			) : (
				''
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
				method='post'>
				<div>
					<FloatInput
						className={styles.input}
						register={register('email', {
							required: 'Email is required',
							pattern: {
								value: EMAIL_REGEXP,
								message: 'Please enter a valid email'
							}
						})}
						type='text'
						label='Email'
					/>
					{getError(errors.email)}
				</div>
				<div>
					<FloatInput
						register={register('password', {
							required: 'Password is required'
						})}
						type='password'
						label='Password'
					/>
					{getError(errors.password)}
				</div>
				<PrimaryButton
					disabled={!isValid && isDirty}
					className={styles.button}
					type='submit'>
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
