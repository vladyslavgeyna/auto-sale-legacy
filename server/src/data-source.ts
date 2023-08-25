import { CarAd } from '@resources/car-ad/car-ad.entity'
import { CarBrand } from '@resources/car-brand/car-brand.entity'
import { CarComparison } from '@resources/car-comparison/car-comparison.entity'
import { CarImage } from '@resources/car-image/car-image.entity'
import { CarModel } from '@resources/car-model/car-model.entity'
import { Car } from '@resources/car/car.entity'
import { FavoriteAd } from '@resources/favorite-ad/favorite-ad.entity'
import { Image } from '@resources/image/image.entity'
import { Token } from '@resources/token/token.entity'
import { UserReview } from '@resources/user-review/user-review.entity'
import { User } from '@resources/user/user.entity'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'root',
	database: 'auto-sale',
	synchronize: true,
	logging: false,
	entities: [
		User,
		Token,
		Image,
		Car,
		CarAd,
		CarModel,
		CarBrand,
		CarImage,
		UserReview,
		FavoriteAd,
		CarComparison
	],
	migrations: [],
	subscribers: []
})
