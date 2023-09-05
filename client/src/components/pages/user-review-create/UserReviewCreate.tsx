import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetFormError } from '../../../hooks/useGetFormError'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useCreateUserReviewMutation } from '../../../store/api/user-review.api'
import { useGetUserQuery } from '../../../store/api/user.api'
import Error from '../../error/Error'
import BarLoader from '../../ui/bar-loader/BarLoader'
import FormErrorMessage from '../../ui/form-error-message/FormErrorMessage'
import PrimaryButton from '../../ui/primary-button/PrimaryButton'
import PrimaryInput from '../../ui/primary-input/PrimaryInput'
import PrimaryTextarea from '../../ui/primary-textarea/PrimaryTextarea'
import PrimaryTitle from '../../ui/primary-title/PrimaryTitle'
import NotFound from '../not-found/NotFound'
import styles from './UserReviewCreate.module.scss'

const UserReviewCreate = () => {
	const { id: userToId } = useParams()

	const navigate = useNavigate()

	if (!userToId) {
		navigate('/')
	}

	const { user: currentUser } = useTypedSelector(state => state.user)

	const [createUserReview, { isLoading, error, isSuccess }] =
		useCreateUserReviewMutation()

	const {
		handleSubmit,
		formState: { errors, isValid, isDirty },
		reset,
		register
	} = useForm<{ text: string; title: string }>({
		mode: 'onChange'
	})

	const {
		error: userError,
		data: userData,
		isLoading: isUserLoading
	} = useGetUserQuery(String(userToId))

	if (isUserLoading) {
		return <BarLoader text='Loading...' />
	}

	if (userError) {
		if (
			(userError as any)?.status === 404 ||
			(userError as any)?.originalStatus === 404
		) {
			return <NotFound />
		}
		return (
			<Error
				error={userError}
				className={styles.serverError}
				Component='p'
			/>
		)
	}

	if (!userData) {
		return <NotFound />
	}

	const getError = useGetFormError(styles.formError)

	const onFormSubmit: SubmitHandler<{
		text: string
		title: string
	}> = async data => {
		await createUserReview({
			...data,
			userFromId: currentUser.id,
			userToId: String(userToId)
		})
	}

	useEffect(() => {
		if (isSuccess) {
			reset()
			navigate('/')
		}
	}, [isSuccess])

	return (
		<div>
			<PrimaryTitle className={styles.title}>
				Review of the seller:{' '}
				<span className={styles.sellerName}>
					{userData.name} {userData.surname}
				</span>
			</PrimaryTitle>

			<form
				className={styles.form}
				method='post'
				onSubmit={handleSubmit(onFormSubmit)}>
				{isLoading ? (
					<BarLoader text='Loading...' />
				) : error ? (
					<Error
						error={error}
						Component={FormErrorMessage}
						className={styles.formError}
					/>
				) : (
					''
				)}
				<div>
					<label className={styles.label} htmlFor='title'>
						Review title
					</label>
					<PrimaryInput
						id='title'
						register={register('title', {
							required: 'Title is required',
							maxLength: {
								message:
									'Title length should be maximum 50 characters long',
								value: 50
							},
							minLength: {
								message:
									'Title should be at least 5 characters long',
								value: 5
							}
						})}
					/>
					{getError(errors.title)}
				</div>
				<div>
					<label className={styles.label} htmlFor='text'>
						Review title
					</label>
					<PrimaryTextarea
						className={styles.textarea}
						id='text'
						register={register('text', {
							required: 'Text is required',
							maxLength: {
								message:
									'Text length should be maximum 300 characters long',
								value: 300
							},
							minLength: {
								message:
									'Text should be at least 10 characters long',
								value: 10
							}
						})}
					/>
					{getError(errors.text)}
				</div>
				<PrimaryButton disabled={!isValid && isDirty} type='submit'>
					Leave a review
				</PrimaryButton>
			</form>
		</div>
	)
}

export default UserReviewCreate
