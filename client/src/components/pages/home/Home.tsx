import { useEffect } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import { useSearchParams } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useGetCarAdsQuery } from '../../../store/api/car-ad.api'
import Error from '../../Error/Error'
import BarLoader from '../../ui/bar-loader/BarLoader'
import PrimaryButton from '../../ui/primary-button/PrimaryButton'
import PrimaryTitle from '../../ui/primary-title/PrimaryTitle'
import styles from './Home.module.scss'
import CarAdItem from './car-ad-item/CarAdItem'

const Home = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const { setCurrentPage } = useActions()

	const pageFromQueryParams = searchParams.get('page')

	const { currentPage, limit } = useTypedSelector(state => state.carAds)

	const { data, isLoading, error, isFetching } = useGetCarAdsQuery({
		limit,
		page: Number(pageFromQueryParams) || currentPage
	})

	const updatePageQueryParam = (page: number) => {
		const existingSearchParams = Object.fromEntries(searchParams.entries())

		if (Object.keys(existingSearchParams).length === 0) {
			setSearchParams({ page: String(page) })
		} else {
			existingSearchParams.page = String(page)
			setSearchParams(existingSearchParams)
		}
	}

	useEffect(() => {
		return () => {
			setCurrentPage(1)
		}
	}, [])

	if (isLoading || isFetching) {
		return <BarLoader text='Loading...' />
	}

	if (error) {
		return (
			<Error error={error} className={styles.serverError} Component='p' />
		)
	}

	return (
		<div className={styles.wrapper}>
			{!data?.carAds.length ? (
				<PrimaryTitle>
					At the moment there are no ads or they were not found
				</PrimaryTitle>
			) : (
				<>
					<div className={styles.top}>
						<PrimaryButton>Filtration</PrimaryButton>
						<div className={styles.topText}>
							Count of ads were found for your request:{' '}
							{data.count}
						</div>
					</div>
					<div className={styles.rows}>
						{data.carAds.map(item => (
							<CarAdItem key={item.id} carAd={item} />
						))}
					</div>
					<div className={styles.paginationWrapper}>
						<PaginationControl
							page={Number(pageFromQueryParams) || currentPage}
							limit={limit}
							total={data.count}
							last={true}
							next={true}
							changePage={page => {
								setCurrentPage(page)

								updatePageQueryParam(page)
								// const fullURI = `${location.pathname}${location.search}`
							}}
						/>
					</div>
				</>
			)}
		</div>
	)
}

export default Home
