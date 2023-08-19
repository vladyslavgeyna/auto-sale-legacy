import { useEffect } from 'react'
import Router from './components/Router'
import { useActions } from './hooks/useActions'
import { useTypedSelector } from './hooks/useTypedSelector'

function App() {
	const { checkAuth } = useActions()

	const { isLoading } = useTypedSelector(state => state.user)

	useEffect(() => {
		console.log('useEffect')

		if (localStorage.getItem('token')) {
			console.log('checkAuth')

			checkAuth()
		}
	}, [])

	if (!isLoading) {
		return <Router />
	}
}

export default App
