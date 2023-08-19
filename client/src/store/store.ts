import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userSlice } from './user/user.slice'

const reducers = combineReducers({
	user: userSlice.reducer
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		})

	// middleware: getDefaultMiddleware =>
	// 	getDefaultMiddleware().concat(api.middleware).concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
