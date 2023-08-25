import { ICarSimpleResponse } from '../../types/car/car-simple-response'
import { api } from './api'

export const carApi = api.injectEndpoints({
	endpoints: builder => ({
		getRegions: builder.query<ICarSimpleResponse[], null>({
			query: () => `/car/region`
		}),
		getCarBrands: builder.query<ICarSimpleResponse[], null>({
			query: () => `/car/brand`
		}),
		getCarModels: builder.query<ICarSimpleResponse[], number>({
			query: carBrandId => `/car/model?carBrandId=${carBrandId}`
		}),
		getOrderByOption: builder.query<ICarSimpleResponse[], null>({
			query: () => `/car/order-by-options`
		})
	})
})

export const {
	useGetRegionsQuery,
	useGetCarBrandsQuery,
	useGetCarModelsQuery,
	useGetOrderByOptionQuery
} = carApi
