import { IGetCarAdsResponse } from '../../types/car-ad/get-car-ads-response.interface'
import { api } from './api'

export const carAdApi = api.injectEndpoints({
	endpoints: builder => ({
		getCarAds: builder.query<
			IGetCarAdsResponse,
			{ page?: number; limit?: number }
		>({
			query: ({ page = 1, limit = 2 }) =>
				`/car-ad?page=${page}&limit=${limit}`
		})
	})
})

export const { useGetCarAdsQuery } = carAdApi
