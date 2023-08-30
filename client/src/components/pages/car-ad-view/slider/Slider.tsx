import { FC } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import styles from './Slider.module.scss'

const Slider: FC<{ images: string[] }> = ({ images }) => {
	return (
		<Swiper
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			spaceBetween={50}
			slidesPerView={1}
			navigation
			loop
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}>
			{images.map(image => (
				<SwiperSlide key={image}>
					<img className={styles.image} src={image} alt='Car image' />
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default Slider
