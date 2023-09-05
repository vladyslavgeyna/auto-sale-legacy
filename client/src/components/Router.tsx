import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequireAuth from './helpers/RequireAuth'
import RequireNotAuth from './helpers/RequireNotAuth'
import Layout from './layout/Layout'
import CarAdView from './pages/car-ad-view/CarAdView'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import NotFound from './pages/not-found/NotFound'
import Register from './pages/register/Register'
import UserReviewCreate from './pages/user-review-create/UserReviewCreate'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route element={<Home />} index />
					<Route path='account/*'>
						<Route
							element={
								<RequireNotAuth>
									<Login />
								</RequireNotAuth>
							}
							path='login'
						/>
						<Route
							element={
								<RequireNotAuth>
									<Register />
								</RequireNotAuth>
							}
							path='register'
						/>
						<Route element={<NotFound />} path='*' />
					</Route>
					<Route path='car-ad/*'>
						<Route element={<CarAdView />} path='view/:id' />
						<Route element={<NotFound />} path='*' />
					</Route>
					<Route path='user-review/*'>
						<Route
							element={
								<RequireAuth>
									<UserReviewCreate />
								</RequireAuth>
							}
							path='create/:id'
						/>
						<Route element={<NotFound />} path='*' />
					</Route>
					<Route element={<NotFound />} path='*' />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
