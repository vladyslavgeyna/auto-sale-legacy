export interface ICreateUserReviewInput {
	title: string

	text: string

	userFromId: string

	userToId: string
}

export interface ICreateUserReviewOutput extends ICreateUserReviewInput {
	dateOfCreation: string
	id: number
}
