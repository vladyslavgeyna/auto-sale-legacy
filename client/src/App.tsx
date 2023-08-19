import { useEffect, useState } from 'react'
import Router from './components/Router'
import { useActions } from './hooks/useActions'
import { useTypedSelector } from './hooks/useTypedSelector'

function App() {
	const { user } = useTypedSelector(state => state.user)
	const { checkAuth } = useActions()

	const { isLoading, isAuthenticated } = useTypedSelector(state => state.user)

	const [isCheckingFinished, setIsCheckingFinished] = useState(false)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth()
			setIsCheckingFinished(true)
		}
	}, [])

	if (isLoading || !isCheckingFinished) {
		return <p>Loading...</p>
	}

	return <Router />
}

export default App
