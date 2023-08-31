import { AppDataSource } from '@/data-source'
import carImageService from '@resources/car-image/car-image.service'
import CreateCarImageInputDto from '@resources/car-image/dtos/create-car-image-input.dto'
import carService from '@resources/car/car.service'
import CreateCarInputDto from '@resources/car/dtos/create-car-input.dto'
import { Color } from '@resources/car/enums/color.enum'
import { Fuel } from '@resources/car/enums/fuel.enum'
import { Region } from '@resources/car/enums/region.enum'
import { Transmission } from '@resources/car/enums/transmission.enum'
import { WheelDrive } from '@resources/car/enums/wheel-drive.enum'
import imageService from '@resources/image/image.service'
import HttpError from '@utils/exceptions/http.error'
import { getFormattedDate } from '@utils/utils'
import {
	Between,
	FindManyOptions,
	FindOptionsWhere,
	LessThanOrEqual,
	MoreThanOrEqual,
	Repository
} from 'typeorm'
import { CarAd } from './car-ad.entity'
import CreateCarAdInputDto from './dtos/create-car-ad-input.dto'
import { CarAdDto, GetAllCarAdsResponse } from './dtos/get-all-car-ads-response'
import { GetByIdCarAdResponse } from './dtos/get-by-id-car-ad-response'
import { CarAdsOrderByOptions } from './enums/car-ad-order-by-options.enum'

class CarAdService {
	private carAdRepository: Repository<CarAd>

	constructor() {
		this.carAdRepository = AppDataSource.getRepository(CarAd)
	}

	async create(
		carAd: CreateCarAdInputDto,
		images: Express.Multer.File[]
	): Promise<CarAd> {
		let additionalOptions: string | null = carAd.additionalOptions
		if (!carAd.additionalOptions) {
			additionalOptions = null
		}
		const createCarInputDto: CreateCarInputDto = {
			carBrand: { id: carAd.carBrandId },
			carModel: { id: carAd.carBrandId },
			color: carAd.color,
			region: carAd.region,
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

		return createdCarAd
	}

	async getById(id: number): Promise<GetByIdCarAdResponse> {
		const carAdFromDb = await this.carAdRepository.findOne({
			where: {
				id
			},
			relations: {
				car: {
					carBrand: true,
					carModel: true,
					carImages: {
						image: true
					}
				},
				user: {
					image: true
				}
			},
			order: {
				car: {
					carImages: {
						isMain: 'DESC'
					}
				}
			},
			select: {
				id: true,
				title: true,
				text: true,
				dateOfCreation: true,
				user: {
					id: true
				},
				car: {
					carBrand: {
						name: true
					},
					carModel: {
						name: true
					},
					color: true,
					region: true,
					yearOfProduction: true,
					numberOfSeats: true,
					additionalOptions: true,
					engineCapacity: true,
					price: true,
					transmission: true,
					wheelDrive: true,
					fuel: true,
					mileage: true,
					carImages: {
						id: true,
						isMain: true,
						image: {
							name: true
						}
					}
				}
			}
		})

		if (!carAdFromDb) {
			throw HttpError.NotFound(`Car ad with id ${id} was not found`)
		}

		const carAd: GetByIdCarAdResponse = {
			id: carAdFromDb.id,
			additionalOptions: carAdFromDb.car.additionalOptions,
			carBrand: carAdFromDb.car.carBrand.name,
			carModel: carAdFromDb.car.carModel.name,
			engineCapacity: carAdFromDb.car.engineCapacity,
			fuel: Fuel[carAdFromDb.car.fuel],
			transmission: Transmission[carAdFromDb.car.transmission],
			wheelDrive: WheelDrive[carAdFromDb.car.wheelDrive],
			color: Color[carAdFromDb.car.color],
			region: Region[carAdFromDb.car.region],
			mileage: carAdFromDb.car.mileage,
			title: carAdFromDb.title,
			text: carAdFromDb.text,
			price: carAdFromDb.car.price,
			images: carAdFromDb.car.carImages.map(
				carImage =>
					`${process.env.API_URL}/images/${carImage.image.name}`
			),
			yearOfProduction: carAdFromDb.car.yearOfProduction,
			numberOfSeats: carAdFromDb.car.numberOfSeats,
			dateOfCreation: getFormattedDate(carAdFromDb.dateOfCreation),
			userId: carAdFromDb.user.id
		}

		return carAd
	}

	async getAll(
		limit: number,
		offset: number,
		carBrandId?: number,
		carModelId?: number,
		orderBy?: number,
		priceFrom?: number,
		priceTo?: number,
		region?: number,
		yearFrom?: number,
		yearTo?: number
	): Promise<GetAllCarAdsResponse> {
		let findOptions: FindManyOptions<CarAd> | undefined = {
			relations: {
				car: {
					carImages: {
						image: true
					}
				}
			},

			select: {
				id: true,
				title: true,
				car: {
					engineCapacity: true,
					price: true,
					transmission: true,
					wheelDrive: true,
					fuel: true,
					mileage: true,
					carImages: true
				}
			},
			skip: offset,
			take: limit
		}

		let whereOptions:
			| FindOptionsWhere<CarAd>
			| FindOptionsWhere<CarAd>[]
			| undefined = {
			car: {
				carImages: {
					isMain: true
				}
			}
		}

		if (carBrandId) {
			whereOptions = {
				car: {
					...(whereOptions.car as object),
					carBrand: { id: carBrandId }
				}
			}
		}
		if (carModelId) {
			whereOptions = {
				car: {
					...(whereOptions.car as object),
					carModel: { id: carModelId }
				}
			}
		}

		if (region) {
			whereOptions = {
				car: {
					...(whereOptions.car as object),
					region: region
				}
			}
		}

		if (yearFrom && yearTo) {
			whereOptions = {
				car: {
					...(whereOptions.car as object),
					yearOfProduction: Between(yearFrom, yearTo)
				}
			}
		} else if (yearTo && !yearFrom) {
			whereOptions = {
				car: {
					...(whereOptions.car as object),
					yearOfProduction: LessThanOrEqual(yearTo)
				}
			}
		} else if (!yearTo && yearFrom) {
			whereOptions = {
				car: {
					...(whereOptions.car as object),
					yearOfProduction: MoreThanOrEqual(yearFrom)
				}
			}
		}

		if (priceFrom && priceTo) {
			whereOptions = {
				car: {
					...(whereOptions.car as object),
					price: Between(priceFrom, priceTo)
				}
			}
		} else if (priceTo && !priceFrom) {
			whereOptions = {
				car: {
					...(whereOptions.car as object),
					price: LessThanOrEqual(priceTo)
				}
			}
		} else if (!priceTo && priceFrom) {
			whereOptions = {
				car: {
					...(whereOptions.car as object),
					price: MoreThanOrEqual(priceFrom)
				}
			}
		}

		if (orderBy) {
			if (orderBy === CarAdsOrderByOptions['From cheap to expensive']) {
				findOptions = {
					...findOptions,
					order: {
						car: {
							price: 'ASC'
						}
					}
				}
			} else if (
				orderBy === CarAdsOrderByOptions['From expensive to cheap']
			) {
				findOptions = {
					...findOptions,
					order: {
						car: {
							price: 'DESC'
						}
					}
				}
			} else if (orderBy === CarAdsOrderByOptions['Mileage, ascending']) {
				findOptions = {
					...findOptions,
					order: {
						car: {
							mileage: 'ASC'
						}
					}
				}
			} else if (
				orderBy === CarAdsOrderByOptions['Mileage, descending']
			) {
				findOptions = {
					...findOptions,
					order: {
						car: {
							mileage: 'DESC'
						}
					}
				}
			} else if (
				orderBy ===
				CarAdsOrderByOptions['Year of production, ascending']
			) {
				findOptions = {
					...findOptions,
					order: {
						car: {
							yearOfProduction: 'ASC'
						}
					}
				}
			} else if (
				orderBy ===
				CarAdsOrderByOptions['Year of production, descending']
			) {
				findOptions = {
					...findOptions,
					order: {
						car: {
							yearOfProduction: 'DESC'
						}
					}
				}
			}
		}

		const carAdsFromDb = await this.carAdRepository.findAndCount({
			...findOptions,
			where: whereOptions
		})

		const carAds: CarAdDto[] = carAdsFromDb[0].map(item => {
			return {
				id: item.id,
				title: item.title,
				price: item.car.price,
				image: `${process.env.API_URL}/images/${item.car.carImages[0].image.name}`,
				engineCapacity: item.car.engineCapacity,
				fuel: Fuel[item.car.fuel],
				transmission: Transmission[item.car.transmission],
				wheelDrive: WheelDrive[item.car.wheelDrive],
				mileage: item.car.mileage
			}
		})

		return { carAds, count: carAdsFromDb[1] }
	}
}

export default new CarAdService()
