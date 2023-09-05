import CreateUserReviewInputDto from './create-user-review-input.dto'

export default interface CreateUserReviewOutputDto
	extends CreateUserReviewInputDto {
	dateOfCreation: string
	id: number
}
