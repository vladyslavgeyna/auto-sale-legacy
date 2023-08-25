import { AppDataSource } from '@/data-source'
import { CarAdsOrderByOptions } from '@resources/car-ad/enums/car-ad-order-by-options.enum'
import { CarBrand } from '@resources/car-brand/car-brand.entity'
import { CarModel } from '@resources/car-model/car-model.entity'
import { getEnumAsCarSimpleOutputArray } from '@utils/enums/enum-helpers'
import { Repository } from 'typeorm'
import { Car } from './car.entity'
import { CarSimpleOutput } from './dtos/car-simple-output'
import CreateCarInputDto from './dtos/create-car-input.dto'
import { Region } from './enums/region.enum'

class CarService {
	private carRepository: Repository<Car>
	private carBrandRepository: Repository<CarBrand>
	private carModelRepository: Repository<CarModel>

	constructor() {
		this.carRepository = AppDataSource.getRepository(Car)
		this.carBrandRepository = AppDataSource.getRepository(CarBrand)
		this.carModelRepository = AppDataSource.getRepository(CarModel)
	}

	async create(car: CreateCarInputDto) {
		const newCar = this.carRepository.create(car)

		const createdCar = await this.carRepository.save(newCar)

		return createdCar
	}

	getRegions(): CarSimpleOutput[] {
		const regionsData = getEnumAsCarSimpleOutputArray(Region)
		return regionsData
	}

	async getBrands(): Promise<CarSimpleOutput[]> {
		const carBrands = await this.carBrandRepository.find()
		return carBrands.map(item => ({ id: item.id, value: item.name }))
	}

	async getModels(carBrandId?: number): Promise<CarSimpleOutput[]> {
		const carModels = await this.carModelRepository.find(
			carBrandId ? { where: { carBrand: { id: carBrandId } } } : {}
		)

		return carModels.map(item => ({ id: item.id, value: item.name }))
	}

	getOrderByOptions(): CarSimpleOutput[] {
		const orderByOptions =
			getEnumAsCarSimpleOutputArray(CarAdsOrderByOptions)
		return orderByOptions
	}
}

export default new CarService()
