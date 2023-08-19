import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Login from './pages/login/Login'
import NotFound from './pages/not-found/NotFound'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route element={<hr />} index />
					<Route path='account/*'>
						<Route element={<Login />} path='login' />
						<Route element={<p>Register</p>} path='register' />
						<Route element={<NotFound />} path='*' />
					</Route>

					<Route element={<hr />} path='shosh' />

					<Route element={<NotFound />} path='*' />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
