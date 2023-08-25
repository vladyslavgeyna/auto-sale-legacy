import { AppDataSource } from '@/data-source'
import { Repository } from 'typeorm'
import { CarImage } from './car-image.entity'
import CreateCarImageInputDto from './dtos/create-car-image-input.dto'

class CarImageService {
	private carImageRepository: Repository<CarImage>

	constructor() {
		this.carImageRepository = AppDataSource.getRepository(CarImage)
	}

	async create(carImage: CreateCarImageInputDto) {
		const newCarImage = this.carImageRepository.create(carImage)

		const createdCarImage = await this.carImageRepository.save(newCarImage)

		return createdCarImage
	}

	async getMainCarImageByCarId(carId: number) {
		const carImage = await this.carImageRepository.findOneBy({
			car: { id: carId }
		})

		return carImage
	}
}

export default new CarImageService()
