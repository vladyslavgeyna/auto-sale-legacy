import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuthResponse } from '../../types/user/auth-response.interface'
import { IUserState } from '../../types/user/user-state.interface'
import { IUser } from '../../types/user/user.interface'
import { checkAuth } from './user.actions'

const initialState: IUserState = {
	isLoading: false,
	error: null,
	user: {} as IUser,
	isAuthenticated: false,
	isCheckingAuthFinished: false
}

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<IAuthResponse>) => {
			state.user = action.payload.user
			state.isAuthenticated = true
			localStorage.setItem('token', action.payload.accessToken)
		},
		logoutLocally: state => {
			state.user = {} as IUser
			state.isAuthenticated = false
			localStorage.removeItem('token')
		},
		setIsCheckingAuthFinished: (state, action: PayloadAction<boolean>) => {
			state.isCheckingAuthFinished = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(checkAuth.pending, state => {
				state.isLoading = true
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
				localStorage.setItem('token', action.payload.accessToken)
				state.isAuthenticated = true
			})
			.addCase(checkAuth.rejected, (state, action) => {
				state.isLoading = false
				state.error = JSON.parse(String(action.payload))
				state.user = {} as IUser
				localStorage.removeItem('token')
				state.isAuthenticated = false
			})
	}
})

export const userActions = userSlice.actions
