import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICarAdsState } from '../../types/car-ad/car-ad-state.interface'

const initialState: ICarAdsState = {
	currentPage: 1,
	limit: 2
}

export const carAdsSlice = createSlice({
	name: 'carAds',
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.limit = action.payload
		}
	}
})

export const carAdActions = carAdsSlice.actions
