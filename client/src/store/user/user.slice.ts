import { createSlice } from '@reduxjs/toolkit'
import { IUserState } from '../../types/user-state.interface'
import { IUser } from '../../types/user.interface'
import { checkAuth, login } from './user.actions'

const initialState: IUserState = {
	isLoading: false,
	error: null,
	user: {} as IUser,
	isAuthenticated: false
}

export const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
				localStorage.setItem('token', action.payload.accessToken)
				state.isAuthenticated = true
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
				state.user = {} as IUser
				state.isAuthenticated = false
			})

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
				state.error = action.payload
				state.user = {} as IUser
				state.isAuthenticated = false
			})
	}
})
