import tokenService from '@resources/token/token.service'
import { NextFunction, Request, Response } from 'express'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return next()
		}

		const accessToken = authHeader.split(' ')[1]
		if (!accessToken) {
			return next()
		}

		const userData = tokenService.validateAccessToken(accessToken)
		if (!userData) {
			return next()
		}

		req.user = userData

		next()
	} catch (error) {
		return next()
	}
}

export default authMiddleware
