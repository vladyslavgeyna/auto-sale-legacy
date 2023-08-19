import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Container from '../ui/container/Container'
import Footer from './footer/Footer'
import Header from './header/Header'

const Layout: FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</div>
	)
}

export default Layout
