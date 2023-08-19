import { IAuthResponse } from '../../types/auth-response.interface'
import { ILoginInput } from '../../types/login-input.interface'
import { api } from './api'

export const userApi = api.injectEndpoints({
	endpoints: builder => ({
		login: builder.mutation<IAuthResponse, ILoginInput>({
			query: credentials => ({
				url: '/account/login',
				method: 'POST',
				body: {
					...credentials
				}
			})
		})
	})
})

export const { useLoginMutation } = userApi
