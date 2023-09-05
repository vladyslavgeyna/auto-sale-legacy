import { RequestWithBody } from '@utils/types/request.type'
import { NextFunction, Response } from 'express'
import CreateUserReviewInputDto from './dtos/create-user-review-input.dto'
import userReviewService from './user-review.service'

class UserReviewController {
	async create(
		req: RequestWithBody<CreateUserReviewInputDto>,
		res: Response,
		next: NextFunction
	) {
		try {
			const userReview = await userReviewService.create(req.body)
			res.json(userReview)
		} catch (error) {
			next(error)
		}
	}
}

export default new UserReviewController()
