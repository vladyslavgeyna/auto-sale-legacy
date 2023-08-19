import {
	BsFacebook,
	BsFillCarFrontFill,
	BsInstagram,
	BsTelegram
} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Container from '../../ui/container/Container'
import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<Container>
			<footer className={styles.footer}>
				<div className={styles.authorBlock}>
					<Link to='/'>
						<BsFillCarFrontFill style={{ fontSize: '33px' }} />
					</Link>
					<span>
						© {new Date().getFullYear()} auto-sale by{' '}
						<a
							className={styles.authorLink}
							target='_blank'
							href='https://github.com/vladyslavgeyna'>
							Vladyslav Geyna
						</a>
					</span>
				</div>
				<ul className={styles.list}>
					<li>
						<a
							target='_blank'
							className={styles.socialLink}
							href='https://t.me/what_is_lovechik'>
							<BsTelegram className={styles.telegram} />
						</a>
					</li>
					<li>
						<a
							target='_blank'
							className={styles.socialLink}
							href='https://www.instagram.com/_what_is_lovechik_/'>
							<BsInstagram className={styles.instagram} />
						</a>
					</li>
					<li>
						<a
							target='_blank'
							className={styles.socialLink}
							href='https://www.facebook.com/profile.php?id=100072210826751'>
							<BsFacebook className={styles.facebook} />
						</a>
					</li>
				</ul>
			</footer>
		</Container>
	)
}

export default Footer
