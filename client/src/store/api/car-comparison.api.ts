import { api } from './api'

export const carComparisonApi = api.injectEndpoints({
	endpoints: builder => ({
		hasCurrentUserCarComparisonByCarAdId: builder.query<boolean, number>({
			query: carAdId => `/car-comparison/has-user-by-car-ad/${carAdId}`,
			providesTags: (result, error, carAdId) => [
				{
					type: 'CarComparison',
					id: carAdId
				}
			]
		}),
		toggleToComparison: builder.mutation<
			null,
			{ userId: string; carAdId: number }
		>({
			query: data => ({
				url: '/car-comparison/toggle',
				method: 'POST',
				body: {
					...data
				}
			}),
			invalidatesTags: (result, error, data) => [
				{
					type: 'CarComparison',
					id: data.carAdId
				}
			]
		})
	})
})

export const {
	useHasCurrentUserCarComparisonByCarAdIdQuery,
	useToggleToComparisonMutation
} = carComparisonApi
