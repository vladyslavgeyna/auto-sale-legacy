import { FC } from 'react'
import { Outlet } from 'react-router-dom'
// import { CSSTransition } from 'react-transition-group'
import Container from '../ui/container/Container'
import Footer from './footer/Footer'
import Header from './header/Header'

const Layout: FC = () => {
	// const [isEnter, setIsEnter] = useState(true)
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setIsEnter(false)
	// 	}, 1000)
	// }, [])
	return (
		// <CSSTransition
		// 	in={isEnter}
		// 	timeout={1000}
		// 	appear={true}
		// 	classNames={'appearPage'}>
		<div className='wrapper'>
			<Header />
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
			<Footer />
		</div>
		// </CSSTransition>
	)
}

export default Layout
