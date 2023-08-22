import { AppDataSource } from '@/data-source'
import carImageService from '@resources/car-image/car-image.service'
import CreateCarImageInputDto from '@resources/car-image/dtos/create-car-image-input.dto'
import carService from '@resources/car/car.service'
import CreateCarInputDto from '@resources/car/dtos/create-car-input.dto'
import imageService from '@resources/image/image.service'
import { Repository } from 'typeorm'
import { CarAd } from './car-ad.entity'
import CreateCarAdInputDto from './dtos/create-car-ad-input.dto'
import CreateCarAdOutputDto from './dtos/create-car-ad-output.dto'

class CarAdService {
	private carAdRepository: Repository<CarAd>

	constructor() {
		this.carAdRepository = AppDataSource.getRepository(CarAd)
	}

	async create(
		carAd: CreateCarAdInputDto,
		images: Express.Multer.File[]
	): Promise<CreateCarAdOutputDto> {
		let additionalOptions: string | null = carAd.additionalOptions
		if (!carAd.additionalOptions) {
			additionalOptions = null
		}
		const createCarInputDto: CreateCarInputDto = {
			carBrand: { id: carAd.carBrandId },
			carModel: { id: carAd.carBrandId },
			color: carAd.color,
			region: carAd.region,
			currency: { id: carAd.currencyId },
			fuel: carAd.fuel,
			engineCapacity: carAd.engineCapacity,
			mileage: carAd.mileage,
			numberOfSeats: carAd.numberOfSeats,
			wheelDrive: carAd.wheelDrive,
			transmission: carAd.transmission,
			yearOfProduction: carAd.yearOfProduction,
			price: carAd.price,
			additionalOptions
		}

		const createdCar = await carService.create(createCarInputDto)

		const newCarAd = this.carAdRepository.create({
			car: createdCar,
			text: carAd.text,
			title: carAd.title,
			user: { id: carAd.userId },
			dateOfCreation: new Date()
		})

		const createdCarAd = await this.carAdRepository.save(newCarAd)

		for (const image of images) {
			const createdImage = await imageService.save(image)

			const createCarImageInputDto: CreateCarImageInputDto = {
				car: createdCar,
				image: createdImage,
				isMain: carAd.mainImageName === image.originalname
			}

			await carImageService.create(createCarImageInputDto)
		}

		return { carAd: createdCarAd }
	}
}

export default new CarAdService()
