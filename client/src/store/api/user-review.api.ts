import {
	ICreateUserReviewInput,
	ICreateUserReviewOutput
} from '../../types/user-review/create-user-review.interface'
import { api } from './api'

export const userReviewApi = api.injectEndpoints({
	endpoints: builder => ({
		createUserReview: builder.mutation<
			ICreateUserReviewOutput,
			ICreateUserReviewInput
		>({
			query: data => ({
				url: '/user-review',
				method: 'POST',
				body: {
					...data
				}
			})
		})
	})
})

export const { useCreateUserReviewMutation } = userReviewApi
