import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './api/api'
import { userSlice } from './user/user.slice'

const reducers = combineReducers({
	user: userSlice.reducer,
	[api.reducerPath]: api.reducer
})

export const store = configureStore({
	reducer: reducers,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
