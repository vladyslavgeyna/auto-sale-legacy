import { FieldError } from 'react-hook-form'
import FormErrorMessage from '../components/ui/form-error-message/FormErrorMessage'

export const useGetFormError = (className?: string) => {
	return function (field?: FieldError) {
		return (
			field && (
				<FormErrorMessage className={className}>
					{field.message || 'Validation error'}
				</FormErrorMessage>
			)
		)
	}
}
