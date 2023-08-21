import { useEffect } from 'react'
import Router from './components/Router'
import { useActions } from './hooks/useActions'

function App() {
	const { checkAuth, setIsCheckingAuthFinished } = useActions()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth()
		}
		setIsCheckingAuthFinished(true)
	}, [])

	return <Router />
}

export default App
