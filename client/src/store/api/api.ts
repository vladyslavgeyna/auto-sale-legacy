import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../../config'
import { IAuthResponse } from '../../types/auth-response.interface'
import { userActions } from '../user/user.slice'

const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	credentials: 'include',
	prepareHeaders: headers => {
		const token = localStorage.getItem('token')
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	}
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 401) {
		const refreshResult = await baseQuery(
			'/account/refresh',
			api,
			extraOptions
		)
		if (refreshResult?.data) {
			api.dispatch(
				userActions.setCredentials({
					...(refreshResult.data as IAuthResponse)
				})
			)
			result = await baseQuery(args, api, extraOptions)
		} else {
			api.dispatch(userActions.logoutLocally())
		}
	}

	return result
}

export const api = createApi({
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({})
})
