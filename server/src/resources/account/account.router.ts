import checkValidationMiddleware from '@/middlewares/check-validation.middleware'
import { imageExtensionValidation } from '@resources/image/validation/image-extension.validation'
import { imageSizeValidation } from '@resources/image/validation/image-size.validation'
import HttpError from '@utils/exceptions/http.error'
import { NextFunction, Request, Response, Router } from 'express'
import multer from 'multer'
import accountController from './account.controller'
import { accountLoginValidation } from './validation/account-login.validation'
import { accountRegisterValidation } from './validation/account-register.validation'

const router = Router()

const upload = multer({ storage: multer.memoryStorage() })

router.post(
	'/register',
	upload.single('avatar'),
	accountRegisterValidation,
	imageSizeValidation(5),
	imageExtensionValidation,
	checkValidationMiddleware,
	accountController.register
)

router.post(
	'/login',
	accountLoginValidation,
	checkValidationMiddleware,
	accountController.login
)

router.get('/verify/:userId', accountController.verify)

router.get('/refresh', accountController.refresh)

router.get('/test', (req: Request, res: Response, next: NextFunction) => {
	return next(HttpError.NotFound('NOT FOUND!@#'))
})

router.post('/logout', accountController.logout)

export default router
