import { CarAd } from '@resources/car-ad/car-ad.entity'
import { User } from '@resources/user/user.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class FavoriteAd {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User, { nullable: false })
	user: User

	@ManyToOne(() => CarAd, { nullable: false })
	carAd: CarAd
}
