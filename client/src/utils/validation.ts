import { UseFormClearErrors, UseFormSetError } from 'react-hook-form'

export const EMAIL_REGEXP =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const PHONE_NUMBER_REGEXP =
	/^(050|066|095|099|063|073|093|067|068|096|097|098|091|092|094)\d{3}\d{2}\d{2}$/

const acceptImageTypes = ['image/jpeg', 'image/jpg', 'image/png']

export const validateImage = (
	file: File,
	fieldName: string,
	setError: UseFormSetError<any>,
	clearError: UseFormClearErrors<any>
): boolean => {
	let isValid
	if (!acceptImageTypes.some(t => t === file.type)) {
		setError(fieldName, {
			type: 'filetype',
			message: 'Only png and jpeg files are valid.'
		})
		isValid = false
		return isValid
	}
	if (file.size > 5242880) {
		setError(fieldName, {
			type: 'filesize',
			message: 'Too large file size. Max file size is 5MB.'
		})
		isValid = false
		return isValid
	}

	clearError(fieldName)
	isValid = true

	return isValid
}
