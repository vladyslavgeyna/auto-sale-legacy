import { CarAdDto } from './get-all-car-ads-response'

export interface GetByIdCarAdResponse extends Omit<CarAdDto, 'image'> {
	title: string
	text: string
	dateOfCreation: string
	price: number
	carBrand: string
	carModel: string
	yearOfProduction: number
	color: string
	numberOfSeats: number
	additionalOptions: string | null
	region: string
	images: string[]
	userId: string
}
