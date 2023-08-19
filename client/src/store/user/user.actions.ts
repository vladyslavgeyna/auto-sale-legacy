import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../../config'
import axiosInstance from '../../http/index'
import { IAuthResponse } from '../../types/auth-response.interface'

export const login = createAsyncThunk<
	IAuthResponse,
	{ email: string; password: string }
>('account/login', async (userData, thunkApi) => {
	try {
		const response = await axiosInstance.post<IAuthResponse>(
			'/account/login',
			userData
		)
		return response.data
	} catch (e) {
		return thunkApi.rejectWithValue(e)
	}
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'account/checkAuth',
	async (_, thunkApi) => {
		try {
			const response = await axios.get<IAuthResponse>(
				`${API_URL}/account/refresh`,
				{ withCredentials: true }
			)
			return response.data
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)
