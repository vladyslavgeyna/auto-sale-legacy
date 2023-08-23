import { IGetCarAdsResponse } from '../../types/car-ad/get-car-ads-response.interface'
import { api } from './api'

export const carAdApi = api.injectEndpoints({
	endpoints: builder => ({
		// login: builder.mutation<IAuthResponse, ILoginInput>({
		// 	query: credentials => ({
		// 		url: '/account/login',
		// 		method: 'POST',
		// 		body: {
		// 			...credentials
		// 		}
		// 	})
		// }),
		getCarAds: builder.query<IGetCarAdsResponse[], any>({
			query: () => '/car-ad'
		})
	})
})

export const { useGetCarAdsQuery } = carAdApi
