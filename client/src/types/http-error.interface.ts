interface IErrorArrayItemData {
	type: string
	value: string
	msg: string
	path: string
	location: string
}

interface IErrorData {
	message: string
	errors?: Array<IErrorArrayItemData>
}

export interface IHttpError {
	data: IErrorData
	status: number
}
