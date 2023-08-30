import requireAuthMiddleware from '@/middlewares/require-auth.middleware'
import { Router } from 'express'
import carComparisonController from './car-comparison.controller'

const router = Router()

router.post('/toggle', carComparisonController.toggle)

router.get(
	'/has-user-by-car-ad/:carAdId',
	requireAuthMiddleware,
	carComparisonController.hasUserByCarAdId
)

export default router
