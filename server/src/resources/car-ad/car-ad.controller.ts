import HttpError from '@utils/exceptions/http.error'
import { RequestWithBody } from '@utils/types/request.type'
import { NextFunction, Response } from 'express'
import carAdService from './car-ad.service'
import CreateCarAdInputDto from './dtos/create-car-ad-input.dto'

class CarAdController {
	async create(
		req: RequestWithBody<CreateCarAdInputDto>,
		res: Response,
		next: NextFunction
	) {
		try {
			console.log('req.body json', JSON.stringify(req.body))
			console.log('req.body', req.body)
			console.log('req.files', req.files)

			const images = req.files
			if (!images || !images.length || !(images instanceof Array)) {
				return next(HttpError.BadRequest(`Car images are required`))
			}

			const createdCarAd = await carAdService.create(req.body, images)

			return res.json(createdCarAd)
		} catch (error) {
			next(error)
		}
	}
}

export default new CarAdController()
