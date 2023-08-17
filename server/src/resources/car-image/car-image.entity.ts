import { Car } from '@resources/car/car.entity'
import { Image } from '@resources/image/image.entity'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class CarImage {
	@PrimaryGeneratedColumn()
	id: number

	@OneToOne(() => Image, { nullable: false })
	@JoinColumn()
	image: Image

	@ManyToOne(() => Car, { nullable: false })
	car: Car

	@Column({ default: false })
	isMain: boolean
}
