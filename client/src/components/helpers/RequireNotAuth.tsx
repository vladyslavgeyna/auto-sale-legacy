import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'

const RequireNotAuth: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated } = useTypedSelector(state => state.user)

	if (isAuthenticated) {
		return <Navigate to={'/'} />
	}

	return children
}

export default RequireNotAuth
