import { Color } from '@resources/car/enums/color.enum'
import { Fuel } from '@resources/car/enums/fuel.enum'
import { Region } from '@resources/car/enums/region.enum'
import { Transmission } from '@resources/car/enums/transmission.enum'
import { WheelDrive } from '@resources/car/enums/wheel-drive.enum'
import { hasEnumValue } from '@utils/enums/enum-helpers'
import { getCurrentYear } from '@utils/utils'
import { body } from 'express-validator'

export const createCarAdValidation = [
	body('title')
		.trim()
		.notEmpty()
		.escape()
		.isLength({ min: 3, max: 50 })
		.withMessage('Title length should be 3 - 50 characters'),
	body('text')
		.trim()
		.notEmpty()
		.escape()
		.isLength({ min: 10, max: 700 })
		.withMessage(`Text length should be 5 - 700 characters`),
	body('additionalOptions')
		.trim()
		.escape()
		.isLength({ max: 150 })
		.withMessage(
			`Additional options should be less than 150 characters long`
		),
	body('yearOfProduction')
		.trim()
		.notEmpty()
		.isInt({ min: 1900, max: getCurrentYear })
		.withMessage(
			`Year of production should be from 1900 to ${getCurrentYear}`
		),
	body('color')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.custom(value => {
			if (!hasEnumValue(Number(value), Color)) {
				throw new Error('Invalid color')
			}
			return true
		}),
	body('fuel')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.custom(value => {
			if (!hasEnumValue(Number(value), Fuel)) {
				throw new Error('Invalid fuel')
			}
			return true
		}),
	body('transmission')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.custom(value => {
			if (!hasEnumValue(Number(value), Transmission)) {
				throw new Error('Invalid transmission')
			}
			return true
		}),
	body('wheelDrive')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.custom(value => {
			if (!hasEnumValue(Number(value), WheelDrive)) {
				throw new Error('Invalid wheelDrive')
			}
			return true
		}),
	body('region')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.custom(value => {
			if (!hasEnumValue(Number(value), Region)) {
				throw new Error('Invalid region')
			}
			return true
		}),
	body('price').trim().notEmpty().escape().withMessage('Invalid price'),
	body('userId').trim().notEmpty().escape().withMessage('Invalid user'),
	body('carBrandId')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.withMessage('Invalid car brand'),
	body('carModelId')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.withMessage('Invalid car model'),
	body('engineCapacity')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Invalid engine capacity'),
	body('numberOfSeats')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.withMessage('Invalid number of seats')
		.custom(value => {
			if (Number(value) < 1 || Number(value) > 60) {
				throw new Error(`Number of seats should be from 1 to 60`)
			}
			return true
		}),
	body('mileage')
		.trim()
		.notEmpty()
		.escape()
		.isInt()
		.withMessage('Invalid mileage')
		.custom(value => {
			if (Number(value) < 0 || Number(value) > 999) {
				throw new Error(`Mileage should be from 0 to 999`)
			}
			return true
		}),
	body('mainImageName')
		.trim()
		.notEmpty()
		.escape()
		.withMessage('Invalid main image'),
	(req: any, res: any, next: any) => {
		console.log('createCarAdValidation')
		next()
	}
]
