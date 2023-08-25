import { Router } from 'express'
import carController from './car.controller'

const router = Router()

router.get('/region', carController.getRegions)
router.get('/brand', carController.getBrands)
router.get('/model', carController.getModels)
router.get('/order-by-options', carController.getOrderByOptions)

export default router
