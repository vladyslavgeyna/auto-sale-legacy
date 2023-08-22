import { AppDataSource } from '@/data-source'
import { Repository } from 'typeorm'
import { Car } from './car.entity'
import CreateCarInputDto from './dtos/create-car-input.dto'

class CarService {
	private carRepository: Repository<Car>

	constructor() {
		this.carRepository = AppDataSource.getRepository(Car)
	}

	async create(car: CreateCarInputDto) {
		const newCar = this.carRepository.create(car)

		const createdCar = await this.carRepository.save(newCar)

		return createdCar
	}
}

export default new CarService()
