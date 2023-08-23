import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../../config'
import { IAuthResponse } from '../../types/user/auth-response.interface'

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
			return thunkApi.rejectWithValue(JSON.stringify(e))
		}
	}
)
