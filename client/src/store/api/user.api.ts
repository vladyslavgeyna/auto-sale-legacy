import { IAuthResponse } from '../../types/user/auth-response.interface'
import { ILoginInput } from '../../types/user/login-input.interface'
import { IRegisterInput } from '../../types/user/register-input.interface'
import { IRegisterResponse } from '../../types/user/register-response.interface'
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
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/account/logout',
				method: 'POST'
			})
		}),
		register: builder.mutation<IRegisterResponse, IRegisterInput>({
			query: credentials => {
				const formData = new FormData()

				if (credentials?.avatar && credentials?.avatar.length) {
					formData.append('avatar', credentials.avatar[0])
				}

				formData.append('name', credentials.name)
				formData.append('surname', credentials.surname)
				formData.append('email', credentials.email)
				formData.append('password', credentials.password)
				formData.append('passwordConfirm', credentials.passwordConfirm)
				formData.append('phone', credentials.phone)

				return {
					url: '/account/register',
					method: 'POST',
					body: formData,
					formData: true
				}
			}
		})
	})
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
	userApi
