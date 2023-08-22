export function hasEnumValue(value: number, enumType: object) {
	if (!(value in enumType)) {
		return false
	}
	return true
}
