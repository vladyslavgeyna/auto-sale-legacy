import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import BarLoader from '../ui/bar-loader/BarLoader'

const RequireNotAuth: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, isLoading, isCheckingAuthFinished } =
		useTypedSelector(state => state.user)

	if (isLoading || !isCheckingAuthFinished) {
		return <BarLoader text='Loading...' />
	}

	if (isAuthenticated && isCheckingAuthFinished) {
		return <Navigate to={'/'} />
	}

	return children
}

export default RequireNotAuth
