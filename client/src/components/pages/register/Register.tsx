import { useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useGetFormError } from '../../../hooks/useGetFormError'
import { useRegisterMutation } from '../../../store/api/user.api'
import { IHttpError } from '../../../types/http-error.interface'
import { IRegisterInput } from '../../../types/register-input.interface'
import { formatFileName } from '../../../utils/utils'
import {
	EMAIL_REGEXP,
	PHONE_NUMBER_REGEXP,
	validateImage
} from '../../../utils/validation'
import BarLoader from '../../ui/bar-loader/BarLoader'
import FloatInput from '../../ui/float-input/FloatInput'
import FormErrorMessage from '../../ui/form-error-message/FormErrorMessage'
import PrimaryButton from '../../ui/primary-button/PrimaryButton'
import PrimaryTitle from '../../ui/primary-title/PrimaryTitle'
import VerifyEmail from '../verify-email/VerifyEmail'
import styles from './Register.module.scss'

const Register = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isValid, isDirty },
		reset,
		setError,
		clearErrors,
		watch,
		getValues
	} = useForm<IRegisterInput>({
		mode: 'onChange'
	})
	const [registration, { error, data, isLoading, isSuccess }] =
		useRegisterMutation()

	const chosenFileNameRef = useRef<HTMLSpanElement>(null)

	const [isButtonDisabled, setIsButtonDisabled] = useState(false)

	const [isRegisterComplete, setIsRegisterComplete] = useState(false)

	const [selectedImage, setSelectedImage] = useState<FileList | null>(null)

	const [email, setEmail] = useState('')

	useEffect(() => {
		setIsButtonDisabled(!isValid && isDirty)
	}, [isDirty, isValid])

	const onSubmit: SubmitHandler<IRegisterInput> = async registerInputData => {
		try {
			registerInputData.avatar = selectedImage
			await registration(registerInputData)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (data && isSuccess) {
			setIsRegisterComplete(true)
			setEmail(getValues('email'))
			reset()
		}
	}, [data, isSuccess])

	useEffect(() => {
		if (error) {
			setIsButtonDisabled(false)
		}
	}, [error])

	const getError = useGetFormError(styles.errorMessage)

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const file = e.target.files[0]

			const isValidFromValidateImage = validateImage(
				file,
				'avatar',
				setError,
				clearErrors
			)

			setIsButtonDisabled(!isValidFromValidateImage)

			if (chosenFileNameRef.current) {
				let fileName = formatFileName(file.name, 15)
				chosenFileNameRef.current.innerHTML = fileName
			}

			setSelectedImage(e.target.files)
		} else {
			clearErrors('avatar')
			setIsButtonDisabled(false)
			if (chosenFileNameRef.current) {
				chosenFileNameRef.current.innerHTML = ''
			}
			setSelectedImage(null)
		}
	}

	if (isRegisterComplete) {
		return <VerifyEmail email={email} />
	}

	return (
		<div className={styles.wrapper}>
			<PrimaryTitle className={styles.title}>Registration</PrimaryTitle>
			{isLoading ? (
				<BarLoader text='Loading...' />
			) : error ? (
				(error as IHttpError).data.errors?.length ? (
					(error as IHttpError).data.errors?.map(err => (
						<FormErrorMessage className={styles.serverError}>
							{err.msg}
						</FormErrorMessage>
					))
				) : (
					<FormErrorMessage className={styles.serverError}>
						{(error as IHttpError).data.message}
					</FormErrorMessage>
				)
			) : (
				''
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={styles.form}
				encType='multipart/form-data'
				method='post'>
				<div>
					<FloatInput
						className={styles.input}
						register={register('name', {
							required: 'Name is required',
							minLength: {
								value: 2,
								message: 'Name should be at least 2 symbols'
							},
							maxLength: {
								value: 100,
								message: 'Max name length is 100 symbols'
							}
						})}
						type='text'
						label='Name'
					/>
					{getError(errors.name)}
				</div>
				<div>
					<FloatInput
						register={register('surname', {
							required: 'Surname is required',
							minLength: {
								value: 2,
								message: 'Name should be at least 2 symbols'
							},
							maxLength: {
								value: 100,
								message: 'Maximum name length is 100 symbols'
							}
						})}
						type='text'
						label='Surname'
					/>
					{getError(errors.surname)}
				</div>
				<div>
					<FloatInput
						className={styles.input}
						register={register('email', {
							required: 'Email is required',
							minLength: {
								value: 6,
								message:
									'Password length should be at least 6 symbols'
							},
							maxLength: {
								value: 50,
								message: 'Maximum name length is 50 symbols'
							},

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
				<div>
					<FloatInput
						register={register('passwordConfirm', {
							required: 'Confirm password is required',
							validate: (value: string) => {
								if (watch('password') !== value) {
									return "Passwords don't match"
								}
							}
						})}
						type='password'
						label='Confirm password'
					/>
					{getError(errors.passwordConfirm)}
				</div>
				<div className={styles.phoneNumberInputWrapper}>
					<FloatInput
						register={register('phone', {
							required: 'Phone is required',
							pattern: {
								value: PHONE_NUMBER_REGEXP,
								message: 'Please enter a valid phone number'
							}
						})}
						type='text'
						label='Phone'
					/>

					{getError(errors.phone)}
				</div>
				<div>
					<input
						{...register('avatar', {})}
						onChange={e => handleFileSelect(e)}
						accept='image/png, image/jpeg, image/jpg'
						type='file'
						id='avatar'
						className={styles.fileInput}
					/>
					<label className={styles.labelFileInput} htmlFor='avatar'>
						Choose avatar {'('}optional{')'}{' '}
						<span ref={chosenFileNameRef}></span>
					</label>
					{getError(errors.avatar)}
				</div>
				<PrimaryButton
					disabled={isButtonDisabled}
					className={styles.button}
					type='submit'>
					Register
				</PrimaryButton>
			</form>
			<div className={styles.textBlock}>
				<p>
					Already registered?{' '}
					<Link to={'/account/login'}>Sign in</Link>
				</p>
			</div>
		</div>
	)
}

export default Register
