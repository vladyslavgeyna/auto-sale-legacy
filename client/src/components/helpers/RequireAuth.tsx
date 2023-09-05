import { FC, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import BarLoader from '../ui/bar-loader/BarLoader'

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
	const location = useLocation()

	const { isAuthenticated, isLoading, isCheckingAuthFinished } =
		useTypedSelector(state => state.user)

	if (isLoading || !isCheckingAuthFinished) {
		return <BarLoader text='Loading...' />
	}

	if (!isAuthenticated && isCheckingAuthFinished) {
		return (
			<Navigate
				to={'/account/login'}
				state={{ path: location.pathname }}
			/>
		)
	}

	return children
}

export default RequireAuth
