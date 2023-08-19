import { useEffect } from 'react'
import Router from './components/Router'
import { useActions } from './hooks/useActions'
import { useTypedSelector } from './hooks/useTypedSelector'

function App() {
	const { isLoading } = useTypedSelector(state => state.user)

	const { checkAuth } = useActions()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth()
		}
	}, [])

	if (isLoading) {
		return <p>Loading...</p>
	}

	return <Router />
}

export default App
