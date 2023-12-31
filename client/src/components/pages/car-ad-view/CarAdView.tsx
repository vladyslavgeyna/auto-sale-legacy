import {
	FaEnvelope,
	FaPhone,
	FaRegComment,
	FaRegComments
} from 'react-icons/fa'
import { RiScalesFill } from 'react-icons/ri'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useGetCarAdQuery } from '../../../store/api/car-ad.api'
import {
	useHasCurrentUserCarComparisonByCarAdIdQuery,
	useToggleToComparisonMutation
} from '../../../store/api/car-comparison.api'
import {
	useGetCountOfFavoriteAdByCarAdIdQuery,
	useHasCurrentUserFavoriteAdByCarAdIdQuery,
	useToggleToFavoritesMutation
} from '../../../store/api/favorite-ad.api'
import { useGetUserQuery } from '../../../store/api/user.api'
import Error from '../../error/Error'
import BarLoader from '../../ui/bar-loader/BarLoader'
import PrimaryButton from '../../ui/primary-button/PrimaryButton'
import PrimaryLink from '../../ui/primary-link/PrimaryLink'
import NotFound from '../not-found/NotFound'
import styles from './CarAdView.module.scss'
import Heart from './heart/Heart'
import Slider from './slider/Slider'

const CarAdView = () => {
	const { user: currentUser, isAuthenticated } = useTypedSelector(
		state => state.user
	)

	const { data, isLoading, error } = useGetCarAdQuery(Number(useParams().id))

	const [toggleToFavorites] = useToggleToFavoritesMutation()

	const [toggleToComparison] = useToggleToComparisonMutation()

	const {
		data: userData,
		isLoading: isUserLoading,
		error: userError
	} = useGetUserQuery(data?.userId || '', {
		skip: !data || isLoading
	})

	const {
		data: favoriteAdCountData,
		isLoading: isFavoriteAdCountLoading,
		error: favoriteAdCountError
	} = useGetCountOfFavoriteAdByCarAdIdQuery(Number(useParams().id))

	const {
		data: hasCurrentUserFavoriteAdData,
		isLoading: isHasCurrentUserFavoriteAdLoading,
		error: hasCurrentUserFavoriteAdError
	} = useHasCurrentUserFavoriteAdByCarAdIdQuery(Number(useParams().id), {
		skip: !isAuthenticated
	})

	const {
		data: hasCurrentUserCarComparisonData,
		isLoading: isHasCurrentUserCarComparisonLoading,
		error: hasCurrentUserCarComparisonError
	} = useHasCurrentUserCarComparisonByCarAdIdQuery(Number(useParams().id), {
		skip: !isAuthenticated
	})

	if (
		isLoading ||
		isUserLoading ||
		isFavoriteAdCountLoading ||
		isHasCurrentUserFavoriteAdLoading ||
		isHasCurrentUserCarComparisonLoading
	) {
		return <BarLoader text='Loading...' />
	}

	if (error) {
		if (
			(error as any)?.status === 404 ||
			(error as any)?.originalStatus === 404
		) {
			return <NotFound />
		}
		return (
			<Error error={error} className={styles.serverError} Component='p' />
		)
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

	if (favoriteAdCountError) {
		return (
			<Error
				error={favoriteAdCountError}
				className={styles.serverError}
				Component='p'
			/>
		)
	}

	if (hasCurrentUserFavoriteAdError) {
		if (
			(hasCurrentUserFavoriteAdError as any)?.status !== 404 &&
			(hasCurrentUserFavoriteAdError as any)?.originalStatus !== 404
		) {
			return (
				<Error
					error={hasCurrentUserFavoriteAdError}
					className={styles.serverError}
					Component='p'
				/>
			)
		}
	}

	if (hasCurrentUserCarComparisonError) {
		if (
			(hasCurrentUserCarComparisonError as any)?.status !== 404 &&
			(hasCurrentUserCarComparisonError as any)?.originalStatus !== 404
		) {
			return (
				<Error
					error={hasCurrentUserCarComparisonError}
					className={styles.serverError}
					Component='p'
				/>
			)
		}
	}

	if (!data || !userData) {
		return <NotFound />
	}

	const isUserAuthAndNotUserAd =
		isAuthenticated && currentUser.id !== data.userId

	const handleToggleToFavorites = async () => {
		await toggleToFavorites({ userId: currentUser.id, carAdId: data.id })
	}

	const handleToggleToComparison = async () => {
		await toggleToComparison({ userId: currentUser.id, carAdId: data.id })
	}

	return (
		<div>
			<div className={styles.titleBlock}>
				{isUserAuthAndNotUserAd && (
					<Heart
						onClick={handleToggleToFavorites}
						isActive={hasCurrentUserFavoriteAdData || false}
					/>
				)}
				<h1 className={styles.title}>{data.title}</h1>
			</div>
			<div className={styles.mainBlock}>
				<div className={styles.left}>
					<div className={styles.price}>{data.price} $</div>
					<div className={styles.seller}>
						<div className={styles.sellerImage}>
							<img
								src={
									userData.avatarPath ||
									'/images/default_avatar.svg'
								}
								alt="User's avatar"
							/>
						</div>
						<div className={styles.sellerInfo}>
							<p>
								<strong>
									Seller{' '}
									{isAuthenticated &&
										currentUser.id === data.userId &&
										'(You)'}
								</strong>
							</p>
							<p>
								{userData.name} {userData.surname}
							</p>
							<p>
								<a href={'tel:+38' + userData.phone}>
									<FaPhone
										style={{
											transform: 'rotateY(180deg)'
										}}
									/>
									{userData.phone}
								</a>
							</p>
							<p>
								<a href={'mailto:' + userData.email}>
									<FaEnvelope />
									{userData.email}
								</a>
							</p>
						</div>
					</div>
					<div className={styles.links}>
						<div>
							<PrimaryLink className={styles.button} to={'/'}>
								<FaRegComments />
								All reviews
							</PrimaryLink>
						</div>
						{isUserAuthAndNotUserAd && (
							<>
								<div>
									<PrimaryLink
										className={styles.button}
										to={`/user-review/create/${data.userId}`}>
										<FaRegComment />
										Leave a review
									</PrimaryLink>
								</div>
								<div>
									<PrimaryButton
										onClick={handleToggleToComparison}
										className={styles.button}>
										<RiScalesFill />
										{hasCurrentUserCarComparisonData
											? 'Remove car from comparison'
											: 'Add car to comparison'}
									</PrimaryButton>
								</div>
							</>
						)}
					</div>
					<div className={styles.additionalInfo}>
						<div>
							The ad has been created at:{' '}
							<strong>{data.dateOfCreation}</strong>
						</div>
						<div>
							Saved to favorites:{' '}
							<strong>{favoriteAdCountData}</strong>
						</div>
					</div>
				</div>
				<div className={styles.right}>
					<div>
						<Slider images={data.images} />
					</div>
					<div className={styles.aboutTitle}>About the car:</div>
					<table className={styles.table}>
						<tbody>
							<tr>
								<th scope='row'>Brand</th>
								<td>{data.carBrand}</td>
							</tr>
							<tr>
								<th scope='row'>Model</th>
								<td>{data.carModel}</td>
							</tr>
							<tr>
								<th scope='row'>Year of production</th>
								<td>{data.yearOfProduction}</td>
							</tr>
							<tr>
								<th scope='row'>Mileage</th>
								<td>{data.mileage} thousand km.</td>
							</tr>
							<tr>
								<th scope='row'>Transmission</th>
								<td>{data.transmission}</td>
							</tr>
							<tr>
								<th scope='row'>Fuel</th>
								<td>{data.fuel}</td>
							</tr>
							<tr>
								<th scope='row'>Engine capacity</th>
								<td>
									{data.engineCapacity}{' '}
									{data.fuel === 'Electric' ? 'kW' : 'liters'}
								</td>
							</tr>
							<tr>
								<th scope='row'>Wheel drive</th>
								<td>{data.wheelDrive}</td>
							</tr>
							<tr>
								<th scope='row'>Color</th>
								<td
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: '10px'
									}}>
									{data.color}{' '}
									<span
										style={{
											width: '15px',
											height: '15px',
											backgroundColor:
												data.color === 'Multicolored'
													? 'white'
													: data.color
										}}></span>
								</td>
							</tr>
							<tr>
								<th scope='row'>Number of seats</th>
								<td>{data.numberOfSeats}</td>
							</tr>
							<tr>
								<th scope='row'>Additional options</th>
								<td>
									{data.additionalOptions || 'Not specified'}
								</td>
							</tr>
							<tr>
								<th scope='row'>Location</th>
								<td>{data.region}</td>
							</tr>
						</tbody>
					</table>
					<div className={styles.aboutTitle}>
						Description of the car from the seller:
					</div>
					<div className={styles.adText}>{data.text}</div>
				</div>
			</div>
		</div>
	)
}

export default CarAdView
