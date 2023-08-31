import { FC } from 'react'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import './Slider.css'
import styles from './Slider.module.scss'

const Slider: FC<{ images: string[] }> = ({ images }) => {
	return (
		<Swiper
			className={styles.slider}
			modules={[Navigation, Pagination, Scrollbar, A11y]}
			spaceBetween={50}
			centeredSlides={true}
			slidesPerView={1}
			loop
			navigation={{
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}}
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}>
			{images.map(image => (
				<SwiperSlide key={image}>
					<a href={image} target='_blank'>
						<img
							className={styles.image}
							src={image}
							alt='Car image'
						/>
					</a>
				</SwiperSlide>
			))}
			<div className='slider-controller'>
				<div className='swiper-button-prev slider-arrow'>
					<FaArrowLeft />
				</div>
				<div className='swiper-button-next slider-arrow'>
					<FaArrowRight />
				</div>
				<div className='swiper-pagination'></div>
			</div>
		</Swiper>
	)
}

export default Slider
