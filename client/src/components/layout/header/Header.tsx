import { BsFillPersonCheckFill, BsFillPersonPlusFill } from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom'

import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Container from '../../ui/container/Container'
import styles from './Header.module.scss'

const Header = () => {
	const { isAuthenticated } = useTypedSelector(state => state.user)

	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<Container>
					<div className={styles.block}>
						<NavLink className={styles.navlink} to={'/'}>
							Home
						</NavLink>
						<div className={styles.blockChild}>
							<div className={styles.linksWrapper}>
								{isAuthenticated ? (
									<Link
										className={styles.link}
										to={'/account/register'}>
										<span>
											HERE ARE GONNA BE AUTH LINKS
										</span>
										<BsFillPersonPlusFill />
									</Link>
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
