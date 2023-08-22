import checkValidationMiddleware from '@/middlewares/check-validation.middleware'
import { imageUploadMiddleware } from '@/middlewares/image-upload.middleware'
import { imageExtensionValidation } from '@resources/image/validation/image-extension.validation'
import { imageSizeValidation } from '@resources/image/validation/image-size.validation'
import { Router } from 'express'
import accountController from './account.controller'
import { accountLoginValidation } from './validation/account-login.validation'
import { accountRegisterValidation } from './validation/account-register.validation'

const router = Router()

router.post(
	'/register',
	imageUploadMiddleware.single('avatar'),
	accountRegisterValidation,
	imageSizeValidation(5, false),
	imageExtensionValidation(false),
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

router.post('/logout', accountController.logout)

export default router
