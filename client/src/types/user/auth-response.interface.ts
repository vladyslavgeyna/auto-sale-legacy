import { IRegisterResponse } from './register-response.interface'

export interface IAuthResponse extends IRegisterResponse {
	accessToken: string
	refreshToken: string
}
