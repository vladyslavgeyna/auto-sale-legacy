import { CarAd } from '@resources/car-ad/car-ad.entity'
import { User } from '@resources/user/user.entity'
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CarComparison {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User)
	user: User

	@ManyToOne(() => CarAd)
	carAd: CarAd
}
