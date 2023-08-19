import { useEffect, useState } from 'react'
import Router from './components/Router'
import { useActions } from './hooks/useActions'
import { useTypedSelector } from './hooks/useTypedSelector'

function App() {
	const { setCredentials, checkAuth } = useActions()

	// const { isLoading, data } = useCheckAuthQuery(undefined)

	const { isLoading } = useTypedSelector(state => state.user)

	const [authenticatedChecked, setAuthenticatedChecked] = useState(false)

	// useEffect(() => {
	// 	if (!authenticatedChecked) {
	// 		if (!isLoading) {
	// 			if (data) {
	// 				setCredentials(data)
	// 			}

	// 			setAuthenticatedChecked(true)
	// 		}
	// 	}
	// }, [isLoading, data, authenticatedChecked])

	useEffect(() => {
		checkAuth()
	}, [])

	if (isLoading) {
		return <p>Loading...</p>
	}

	return <Router />
}

export default App
