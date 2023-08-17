import { CarBrand } from '@resources/car-brand/car-brand.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CarModel {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	name: string

	@ManyToOne(() => CarBrand, { nullable: false })
	CarBrand: CarBrand
}
