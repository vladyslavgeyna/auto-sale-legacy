import HttpStatusCode from '@utils/enums/http-status-code'
import HttpError from '@utils/exceptions/http.error'
import { RequestWithBody } from '@utils/types/request.type'
import { NextFunction, Request, Response } from 'express'
import favoriteAdService from './favorite-ad.service'

class FavoriteAdController {
	async getCountByCarAdId(req: Request, res: Response, next: NextFunction) {
		try {
			const count = await favoriteAdService.getCountByCarAdId(
				Number(req.params.carAdId)
			)
			res.json(count)
		} catch (error) {
			next(error)
		}
	}

	async toggle(
		req: RequestWithBody<{ userId: string; carAdId: number }>,
		res: Response,
		next: NextFunction
	) {
		try {
			await favoriteAdService.toggle(req.body.userId, req.body.carAdId)
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
			const favoriteAd = await favoriteAdService.getByUserIdAndCarAdId(
				req.user.id,
				Number(req.params.carAdId)
			)
			res.json(favoriteAd ? true : false)
		} catch (error) {
			next(error)
		}
	}
}

export default new FavoriteAdController()
