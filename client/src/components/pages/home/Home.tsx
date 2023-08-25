import { useEffect, useState } from 'react'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import { FaFilter } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useGetCarAdsQuery } from '../../../store/api/car-ad.api'
import {
	useGetCarBrandsQuery,
	useGetOrderByOptionQuery,
	useGetRegionsQuery
} from '../../../store/api/car.api'
import Error from '../../Error/Error'
import BarLoader from '../../ui/bar-loader/BarLoader'
import PrimaryButton from '../../ui/primary-button/PrimaryButton'
import PrimaryTitle from '../../ui/primary-title/PrimaryTitle'
import styles from './Home.module.scss'
import CarAdItem from './car-ad-item/CarAdItem'
import { FilterSortingModal } from './filter-sorting-modal/FilterSortingModal'

const Home = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const { setCurrentPage } = useActions()

	const pageFromQueryParams = searchParams.get('page')

	const { currentPage, limit } = useTypedSelector(state => state.carAds)

	const { data, isLoading, error, isFetching } = useGetCarAdsQuery({
		limit,
		page: Number(pageFromQueryParams) || currentPage,
		carBrandId: Number(searchParams.get('carBrandId')) || undefined,
		carModelId: Number(searchParams.get('carModelId')) || undefined,
		orderBy: Number(searchParams.get('orderBy')) || undefined,
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
		region: Number(searchParams.get('region')) || undefined,
		yearFrom: Number(searchParams.get('yearFrom')) || undefined,
		yearTo: Number(searchParams.get('yearTo')) || undefined
	})
	console.log('data', data)

	const {
		data: regionsData,
		isLoading: areRegionsLoading,
		error: regionsError
	} = useGetRegionsQuery(null)

	const {
		data: carBrandsData,
		isLoading: areCarBrandsLoading,
		error: carBrandsError
	} = useGetCarBrandsQuery(null)

	const {
		data: orderByData,
		isLoading: isOrderByLoading,
		error: orderByError
	} = useGetOrderByOptionQuery(null)

	const [isModalActive, setIsModalActive] = useState(false)

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

	if (
		isLoading ||
		isFetching ||
		areRegionsLoading ||
		areCarBrandsLoading ||
		isOrderByLoading
	) {
		return <BarLoader text='Loading...' />
	}

	if (error) {
		return (
			<Error error={error} className={styles.serverError} Component='p' />
		)
	}

	if (regionsError) {
		return (
			<Error
				error={regionsError}
				className={styles.serverError}
				Component='p'
			/>
		)
	}

	if (carBrandsError) {
		return (
			<Error
				error={carBrandsError}
				className={styles.serverError}
				Component='p'
			/>
		)
	}

	if (orderByError) {
		return (
			<Error
				error={orderByError}
				className={styles.serverError}
				Component='p'
			/>
		)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<PrimaryButton
					onClick={() => setIsModalActive(true)}
					className={styles.filterButton}>
					<FaFilter />
					Filtering and sorting
				</PrimaryButton>
				<FilterSortingModal
					isModalActive={isModalActive}
					setIsModalActive={setIsModalActive}
					regions={regionsData || []}
					carBrands={carBrandsData || []}
					orderByOptions={orderByData || []}
				/>
				<div className={styles.topText}>
					Count of ads were found for your request: {data?.count || 0}
				</div>
			</div>
			{!data?.carAds.length ? (
				<PrimaryTitle className={styles.noAdsTitle}>
					At the moment there are no ads or they were not found
				</PrimaryTitle>
			) : (
				<div className={styles.rows}>
					{data.carAds.map(item => (
						<CarAdItem key={item.id} carAd={item} />
					))}
				</div>
			)}
			<div className={styles.paginationWrapper}>
				<PaginationControl
					page={Number(pageFromQueryParams) || currentPage}
					limit={limit}
					total={data?.count || 0}
					last={true}
					next={true}
					changePage={page => {
						setCurrentPage(page)

						updatePageQueryParam(page)
						// const fullURI = `${location.pathname}${location.search}`
					}}
				/>
			</div>
		</div>
	)
}

export default Home
