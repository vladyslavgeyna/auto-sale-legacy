import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import { carAdsSlice } from './car-ad/car-ads.slice'
import { userSlice } from './user/user.slice'

const reducers = combineReducers({
	user: userSlice.reducer,
	carAds: carAdsSlice.reducer,
	[api.reducerPath]: api.reducer
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
