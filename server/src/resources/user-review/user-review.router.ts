import checkValidationMiddleware from '@/middlewares/check-validation.middleware'
import requireAuthMiddleware from '@/middlewares/require-auth.middleware'
import { Router } from 'express'
import userReviewController from './user-review.controller'
import { createUserReviewValidation } from './validation/create-user-review.validation'

const router = Router()

router.post(
	'/',
	requireAuthMiddleware,
	createUserReviewValidation,
	checkValidationMiddleware,
	userReviewController.create
)

export default router
