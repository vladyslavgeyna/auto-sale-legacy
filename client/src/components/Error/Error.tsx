import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { FC } from 'react'
import { IHttpError } from '../../types/error/http-error.interface'

const Error: FC<{
	error: FetchBaseQueryError | SerializedError | undefined
	Component: any
	className?: string
}> = ({ error, Component, className }) => {
	if (
		(error as any)?.status >= 500 ||
		(error as any)?.originalStatus >= 500
	) {
		return (
			<Component className={className}>Internal server error</Component>
		)
	} else if (error) {
		if ((error as IHttpError).data.errors?.length) {
			return (error as IHttpError).data.errors?.map((err, index) => (
				<Component key={index} className={className}>
					{err.msg}
				</Component>
			))
		} else {
			return (
				<Component className={className}>
					{(error as IHttpError).data.message}
				</Component>
			)
		}
	} else {
		return ''
	}
}

export default Error
