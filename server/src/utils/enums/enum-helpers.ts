import { CarSimpleOutput } from '@resources/car/dtos/car-simple-output'

export function hasEnumValue(value: number, enumType: object) {
	if (!(value in enumType)) {
		return false
	}
	return true
}

export function getMaxOfEnum(enumType: object) {
	const values = Object.keys(enumType)
		.map(k => (k === '' ? NaN : +k))
		.filter(k => !isNaN(k))
	return Math.max(...values)
}

export function getMinOfEnum(enumType: object) {
	const values = Object.keys(enumType)
		.map(k => (k === '' ? NaN : +k))
		.filter(k => !isNaN(k))
	return Math.min(...values)
}

export function getEnumAsCarSimpleOutputArray(enumType: any) {
	const values: CarSimpleOutput[] = []
	const maxEnumValue = getMaxOfEnum(enumType)
	const minEnumValue = getMinOfEnum(enumType)
	for (let i = minEnumValue; i <= maxEnumValue; i++) {
		values.push({
			value: enumType[i],
			id: i
		})
	}
	return values
}
