import { api } from './api'

export const favoriteAdApi = api.injectEndpoints({
	endpoints: builder => ({
		getCountOfFavoriteAdByCarAdId: builder.query<number, number>({
			query: carAdId => `/favorite-ad/count-by-car-ad/${carAdId}`,
			providesTags: (result, error, carAdId) => [
				{
					type: 'FavoriteAd',
					id: carAdId
				}
			]
		}),
		hasCurrentUserFavoriteAdByCarAdId: builder.query<boolean, number>({
			query: carAdId => `/favorite-ad/has-user-by-car-ad/${carAdId}`,
			providesTags: (result, error, carAdId) => [
				{
					type: 'FavoriteAd',
					id: carAdId
				}
			]
		}),
		toggleToFavorites: builder.mutation<
			null,
			{ userId: string; carAdId: number }
		>({
			query: data => ({
				url: '/favorite-ad/toggle',
				method: 'POST',
				body: {
					...data
				}
			}),
			invalidatesTags: (result, error, data) => [
				{
					type: 'FavoriteAd',
					id: data.carAdId
				}
			]
		})
	})
})

export const {
	useGetCountOfFavoriteAdByCarAdIdQuery,
	useHasCurrentUserFavoriteAdByCarAdIdQuery,
	useToggleToFavoritesMutation
} = favoriteAdApi
