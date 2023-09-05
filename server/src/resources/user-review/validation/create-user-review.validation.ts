import { body } from 'express-validator'

export const createUserReviewValidation = [
	body('title')
		.trim()
		.notEmpty()
		.escape()
		.isLength({ min: 5, max: 50 })
		.withMessage('Title length should be 5 - 50 characters'),
	body('text')
		.trim()
		.notEmpty()
		.escape()
		.isLength({ min: 10, max: 300 })
		.withMessage(`Text length should be 10 - 300 characters`),
	body('userFromId')
		.trim()
		.notEmpty()
		.escape()
		.withMessage(`Invalid 'user from' data`),
	body('userToId')
		.trim()
		.notEmpty()
		.escape()
		.withMessage(`Invalid 'user to' data`)
]
