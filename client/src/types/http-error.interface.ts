interface IErrorData {
	message: string
	errors?: Array<any>
}

export interface IHttpError {
	data: IErrorData
	status: number
}
