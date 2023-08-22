import checkValidationMiddleware from '@/middlewares/check-validation.middleware'
import { imageUploadMiddleware } from '@/middlewares/image-upload.middleware'
import { imagesExtensionValidation } from '@resources/image/validation/images-extension.validation'
import { imagesSizeValidation } from '@resources/image/validation/images-size.validation'
import { imagesCountValidation } from '@resources/image/validation/images.count.validation'
import { Router } from 'express'
import carAdController from './car-ad.controller'
import { createCarAdValidation } from './validation/create-car-ad.validation'

const router = Router()

router.post(
	'/',
	imageUploadMiddleware.array('images'),
	imagesExtensionValidation,
	imagesSizeValidation(5),
	imagesCountValidation(3),
	createCarAdValidation,
	checkValidationMiddleware,
	carAdController.create
)

export default router
