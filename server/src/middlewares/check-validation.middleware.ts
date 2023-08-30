import HttpError from '@utils/exceptions/http.error'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

const checkValidationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return next(HttpError.BadRequest('Validation error', errors.array()))
	}

	next()
}

export default checkValidationMiddleware
