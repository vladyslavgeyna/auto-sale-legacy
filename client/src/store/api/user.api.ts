import { api } from './api'

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation({
			query: credentials => ({
				url: '/account/login',
				method: 'POST',
				body: {
					...credentials
				}
			})
		})
		// checkAuth: builder.query<IAuthResponse, undefined>({
		// 	query: () => ({
		// 		url: '/account/refresh',
		// 		method: 'GET'
		// 	})
		// })
	})
})

export const { useLoginMutation } = userApi
