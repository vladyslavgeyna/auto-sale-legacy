import HttpError from '@utils/exceptions/http.error'
import { NextFunction, Request, Response } from 'express'
import path from 'path'

const whiteList = ['image/png', 'image/jpeg', 'image/jpg']

export const imagesExtensionValidation = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log('imagesExtensionValidation')

	const images = req.files

	if (!images || images.length === 0 || !(images instanceof Array)) {
		return next(HttpError.BadRequest('Images are required '))
	}

	for (const image of images) {
		if (!whiteList.includes(image.mimetype)) {
			throw HttpError.BadRequest(
				`Only .png, .jpg, and .jpeg formats allowed, but one of received images has ${path.extname(
					image.originalname
				)} extension`
			)
		}
	}

	next()
}
