export interface CarAdDto {
	id: number
	title: string
	price: number
	mileage: number
	fuel: string
	engineCapacity: number
	wheelDrive: string
	transmission: string
	image: string
}

export interface GetAllCarAdsResponse {
	carAds: CarAdDto[]
	count: number
}
