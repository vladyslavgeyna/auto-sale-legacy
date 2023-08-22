import HttpError from '@utils/exceptions/http.error'
import { NextFunction, Request, Response } from 'express'
import path from 'path'

const whiteList = ['image/png', 'image/jpeg', 'image/jpg']

export const imageExtensionValidation =
	(isImageRequired: boolean) =>
	(req: Request, res: Response, next: NextFunction) => {
		const image = req.file

		if (!image) {
			if (isImageRequired) {
				return next(HttpError.BadRequest('Image is required'))
			}
			return next()
		}

		if (!whiteList.includes(image.mimetype)) {
			throw HttpError.BadRequest(
				`Only .png, .jpg and .jpeg formats allowed, but received image has ${path.extname(
					image.originalname
				)} extension`
			)
		}

		next()
	}
