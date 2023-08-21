import {
	BsBoxArrowRight,
	BsFillPersonCheckFill,
	BsFillPersonPlusFill
} from 'react-icons/bs'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useLogoutMutation } from '../../../store/api/user.api'
import BarLoader from '../../ui/bar-loader/BarLoader'
import Container from '../../ui/container/Container'
import styles from './Header.module.scss'

const Header = () => {
	const { isAuthenticated, isLoading, isCheckingAuthFinished } =
		useTypedSelector(state => state.user)

	const [logout, { isLoading: isLoginLoading }] = useLogoutMutation()

	const navigate = useNavigate()

	const { logoutLocally } = useActions()

	const handleLogout = async () => {
		await logout(null)
		logoutLocally()
		navigate('/')
	}

	return (
		<header className={styles.header}>
			{isLoginLoading && <BarLoader text='Loading...' />}
			<nav className={styles.nav}>
				<Container>
					<div className={styles.block}>
						<NavLink className={styles.navlink} to={'/'}>
							Home
						</NavLink>
						<div className={styles.blockChild}>
							<div className={styles.linksWrapper}>
								{isLoading || !isCheckingAuthFinished ? (
									''
								) : isAuthenticated ? (
									<button
										onClick={handleLogout}
										type='button'
										className={styles.link}>
										<span>Log out</span>
										<BsBoxArrowRight />
									</button>
								) : (
									<>
										<Link
											className={styles.link}
											to={'/account/register'}>
											<span>Sign up</span>
											<BsFillPersonPlusFill />
										</Link>
										<Link
											className={styles.link}
											to={'/account/login'}>
											<span>Sign in</span>
											<BsFillPersonCheckFill />
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
				</Container>
			</nav>
		</header>
	)
}

export default Header
