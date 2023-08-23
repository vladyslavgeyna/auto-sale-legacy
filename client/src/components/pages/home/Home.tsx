import { useGetCarAdsQuery } from '../../../store/api/car-ad.api'
import Error from '../../Error/Error'
import BarLoader from '../../ui/bar-loader/BarLoader'
import styles from './Home.module.scss'

const Home = () => {
	const { data, isLoading, error, isError } = useGetCarAdsQuery(null)

	if (isLoading) {
		return <BarLoader text='Loading...' />
	}

	if (error) {
		return (
			<Error error={error} className={styles.serverError} Component='p' />
		)
	}

	return <div>Home</div>

	// return {data.map(carAd => <CarAdItem carAd={carAd}/>)}
}

export default Home
