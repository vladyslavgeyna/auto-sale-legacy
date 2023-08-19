import axios from 'axios'
import { IAuthResponse } from '../types/auth-response.interface'
import { API_URL } from './../../config'

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

axiosInstance.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

axiosInstance.interceptors.response.use(
	config => {
		return config
	},
	async error => {
		const originalRequest = error.config
		if (
			error.response.status == 401 &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				const response = await axios.get<IAuthResponse>(
					`${API_URL}/refresh`,
					{ withCredentials: true }
				)
				localStorage.setItem('token', response.data.accessToken)
				return axiosInstance.request(originalRequest)
			} catch (e) {
				console.log('NOT AUTHORIZED')
			}
		}
		throw error
	}
)

export default axiosInstance
