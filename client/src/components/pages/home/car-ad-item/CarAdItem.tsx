import { FC } from 'react'
import { AiTwotoneThunderbolt } from 'react-icons/ai'
import {
	BsFuelPumpFill,
	BsGearWide,
	BsSpeedometer,
	BsVinylFill
} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { ICarAdData } from '../../../../types/car-ad/get-car-ads-response.interface'
import PrimaryLink from '../../../ui/primary-link/PrimaryLink'
import styles from './CarAdItem.module.scss'

const CarAdItem: FC<{ carAd: ICarAdData }> = ({ carAd }) => {
	return (
		<div className={styles.column}>
			<div className={styles.item}>
				<div className={styles.imageWrapper}>
					<Link to={`/car-ad/view/${carAd.id}`}>
						<img
							src={carAd.image}
							alt={carAd.title}
							className={styles.image}
						/>
					</Link>
				</div>
				<div className={styles.about}>
					<h3 className={styles.title}>
						<Link to={`/car-ad/view/${carAd.id}`}>
							{carAd.title}
						</Link>
					</h3>
					<div className={styles.price}>{carAd.price} $</div>
					<div className={styles.infoWrapper}>
						<div className={styles.info}>
							<BsSpeedometer />
							<div>{carAd.mileage} thousand km.</div>
						</div>
						<div className={styles.info}>
							{carAd.fuel === 'Electric' ? (
								<>
									<AiTwotoneThunderbolt />
									<div>
										{carAd.fuel}, {carAd.engineCapacity} kW
									</div>
								</>
							) : (
								<>
									<BsFuelPumpFill />
									<div>
										{carAd.fuel}, {carAd.engineCapacity}{' '}
										liters
									</div>
								</>
							)}
						</div>
						<div className={styles.info}>
							<BsGearWide />
							<div>{carAd.transmission}</div>
						</div>
						<div className={styles.info}>
							<BsVinylFill />
							<div>{carAd.wheelDrive}</div>
						</div>
					</div>
				</div>
				<PrimaryLink
					className={styles.link}
					to={`/car-ad/view/${carAd.id}`}>
					View
				</PrimaryLink>
			</div>
		</div>
	)
}

export default CarAdItem
