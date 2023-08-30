import requireAuthMiddleware from '@/middlewares/require-auth.middleware'
import { Router } from 'express'
import favoriteAdController from './favorite-ad.controller'

const router = Router()

router.get('/count-by-car-ad/:carAdId', favoriteAdController.getCountByCarAdId)

router.post('/toggle', favoriteAdController.toggle)

router.get(
	'/has-user-by-car-ad/:carAdId',
	requireAuthMiddleware,
	favoriteAdController.hasUserByCarAdId
)

export default router
