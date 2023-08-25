import { RequestWithQuery } from '@utils/types/request.type'
import { NextFunction, Request, Response } from 'express'
import carService from './car.service'

class CarController {
	getRegions(req: Request, res: Response, next: NextFunction) {
		res.json(carService.getRegions())
	}

	async getBrands(req: Request, res: Response, next: NextFunction) {
		const brands = await carService.getBrands()
		res.json(brands)
	}

	async getModels(
		req: RequestWithQuery<{ carBrandId?: string }>,
		res: Response,
		next: NextFunction
	) {
		let carBrandIdNumber = req.query.carBrandId
			? Number(req.query.carBrandId)
			: undefined
		const models = await carService.getModels(carBrandIdNumber)
		res.json(models)
	}

	getOrderByOptions(req: Request, res: Response, next: NextFunction) {
		res.json(carService.getOrderByOptions())
	}
}

export default new CarController()
