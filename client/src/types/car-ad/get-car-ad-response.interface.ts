import { ICarAdData } from './get-car-ads-response.interface'

export interface IGetCarAdResponse extends Omit<ICarAdData, 'image'> {
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
