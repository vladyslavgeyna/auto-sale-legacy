import { IGetCarAdResponse } from '../../types/car-ad/get-car-ad-response.interface'
import { IGetCarAdsResponse } from '../../types/car-ad/get-car-ads-response.interface'
import { api } from './api'

interface IQueryParams {
	page?: number
	limit?: number
	carBrandId?: number
	carModelId?: number
	region?: number
	yearFrom?: number
	yearTo?: number
	priceFrom?: number
	priceTo?: number
	orderBy?: number
}

export const carAdApi = api.injectEndpoints({
	endpoints: builder => ({
		getCarAds: builder.query<IGetCarAdsResponse, IQueryParams>({
			query: params => {
				if (!params.page) {
					params.page = 1
				}

				if (!params.limit) {
					params.limit = 2
				}

				let url = `/car-ad?page=${params.page}&limit=${params.limit}`

				for (const key in params) {
					if (key in params && key !== 'page' && key !== 'limit') {
						if (params[key as keyof IQueryParams]) {
							url += `&${key}=${
								params[key as keyof IQueryParams]
							}`
						}
					}
				}

				return {
					url
				}
			}
		}),
		getCarAd: builder.query<IGetCarAdResponse, number>({
			query: carAdId => `/car-ad/${carAdId}`
		})
	})
})

export const { useGetCarAdsQuery, useGetCarAdQuery } = carAdApi
