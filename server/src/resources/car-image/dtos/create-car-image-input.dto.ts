import { Car } from '@resources/car/car.entity'
import { Image } from '@resources/image/image.entity'

export default interface CreateCarImageInputDto {
	image: Image

	car: Car

	isMain: boolean
}
