import HttpStatusCode from '@utils/enums/http-status-code'
import HttpError from '@utils/exceptions/http.error'
import { RequestWithBody } from '@utils/types/request.type'
import { NextFunction, Request, Response } from 'express'
import carComparisonService from './car-comparison.service'

class CarComparisonController {
	async toggle(
		req: RequestWithBody<{ userId: string; carAdId: number }>,
		res: Response,
		next: NextFunction
	) {
		try {
			await carComparisonService.toggle(req.body.userId, req.body.carAdId)
			res.sendStatus(HttpStatusCode.NO_CONTENT_204)
		} catch (error) {
			next(error)
		}
	}

	async hasUserByCarAdId(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.user) {
				throw HttpError.UnauthorizedError()
			}
			const carComparison =
				await carComparisonService.getByUserIdAndCarAdId(
					req.user.id,
					Number(req.params.carAdId)
				)
			res.json(carComparison ? true : false)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarComparisonController()
