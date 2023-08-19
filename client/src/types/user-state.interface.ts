import { IUser } from './user.interface'

export interface IUserState {
	isLoading: boolean
	error: any
	user: IUser
	isAuthenticated: boolean
}
