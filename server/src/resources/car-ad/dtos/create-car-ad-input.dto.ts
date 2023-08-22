import { Color } from '@resources/car/enums/color.enum'
import { Fuel } from '@resources/car/enums/fuel.enum'
import { Region } from '@resources/car/enums/region.enum'
import { Transmission } from '@resources/car/enums/transmission.enum'
import { WheelDrive } from '@resources/car/enums/wheel-drive.enum'

export default interface CreateCarAdInputDto {
	title: string

	text: string

	dateOfCreation: Date

	userId: string

	carBrandId: number

	carModelId: number

	yearOfProduction: number

	engineCapacity: number

	fuel: Fuel

	color: Color

	transmission: Transmission

	region: Region

	price: number

	currencyId: number

	wheelDrive: WheelDrive

	numberOfSeats: number

	mileage: number

	additionalOptions: string | null

	/**
	 * Original image name got from client
	 */
	mainImageName: string
}
