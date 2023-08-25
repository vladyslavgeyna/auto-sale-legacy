import HttpError from '@utils/exceptions/http.error'
import { RequestWithBody, RequestWithQuery } from '@utils/types/request.type'
import { NextFunction, Response } from 'express'
import carAdService from './car-ad.service'
import CreateCarAdInputDto from './dtos/create-car-ad-input.dto'
import { GetAllCarAdsInputDto } from './dtos/get-all-car-ad-input.dto'

class CarAdController {
	async create(
		req: RequestWithBody<CreateCarAdInputDto>,
		res: Response,
		next: NextFunction
	) {
		try {
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

	async getAll(
		req: RequestWithQuery<GetAllCarAdsInputDto>,
		res: Response,
		next: NextFunction
	) {
		let {
			limit,
			page,
			carBrandId,
			carModelId,
			orderBy,
			priceFrom,
			priceTo,
			region,
			yearFrom,
			yearTo
		} = req.query

		page = page || '1'
		limit = limit || '9'
		let offset = Number(page) * Number(limit) - Number(limit)
		const ads = await carAdService.getAll(
			Number(limit),
			offset,
			Number(carBrandId) || undefined,
			Number(carModelId) || undefined,
			Number(orderBy) || undefined,
			Number(priceFrom) || undefined,
			Number(priceTo) || undefined,
			Number(region) || undefined,
			Number(yearFrom) || undefined,
			Number(yearTo) || undefined
		)

		res.json(ads)
	}
}

export default new CarAdController()
