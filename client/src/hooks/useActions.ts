import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { carAdActions } from '../store/car-ad/car-ad.slice'
import * as userApiActions from '../store/user/user.actions.ts'
import { userActions } from '../store/user/user.slice'

const rootActions = {
	...userActions,
	...userApiActions,
	...carAdActions
}

export const useActions = () => {
	const dispatch = useDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
