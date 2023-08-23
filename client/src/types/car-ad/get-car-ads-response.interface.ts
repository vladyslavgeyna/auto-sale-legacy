export interface ICarAdData {
	id: number
	title: string
	price: number
	currencySign: string
	mileage: number
	fuel: string
	engineCapacity: number
	wheelDrive: string
	transmission: string
	image: string
}

export interface IGetCarAdsResponse {
	count: number
	carAds: ICarAdData[]
}
