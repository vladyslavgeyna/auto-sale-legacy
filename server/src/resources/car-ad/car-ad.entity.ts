import { Car } from '@resources/car/car.entity'
import { User } from '@resources/user/user.entity'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class CarAd {
	@PrimaryGeneratedColumn()
	id: number

	@OneToOne(() => Car, { nullable: false })
	@JoinColumn()
	car: Car

	@Column()
	title: string

	@Column({ type: 'text' })
	text: string

	@Column({ type: 'timestamp' })
	dateOfCreation: Date

	@Column({ default: true })
	isActive: boolean

	@ManyToOne(() => User, { nullable: false })
	user: User
}
