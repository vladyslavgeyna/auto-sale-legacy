import { CarBrand } from '@resources/car-brand/car-brand.entity'
import { CarModel } from '@resources/car-model/car-model.entity'
import { Currency } from '@resources/currency/currency.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Color } from './enums/color'
import { Fuel } from './enums/fuel'
import { Region } from './enums/region'
import { Transmission } from './enums/transmission'
import { WheelDrive } from './enums/wheel-drive'

@Entity()
export class Car {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => CarBrand, { nullable: false })
	carBrand: CarBrand

	@ManyToOne(() => CarModel, { nullable: false })
	carModel: CarModel

	@Column()
	yearOfProduction: number

	@Column({ type: 'real' })
	engineCapacity: number

	@Column({
		type: 'enum',
		enum: Fuel
	})
	fuel: Fuel

	@Column({
		type: 'enum',
		enum: Color
	})
	Color: Color

	@Column({
		type: 'enum',
		enum: Transmission
	})
	Transmission: Transmission

	@Column({
		type: 'enum',
		enum: Region
	})
	Region: Region

	@Column('money')
	price: number

	@ManyToOne(() => Currency, { nullable: false })
	currency: Currency

	@Column({
		type: 'enum',
		enum: WheelDrive
	})
	wheelDrive: WheelDrive

	@Column()
	numberOfSeats: number

	@Column()
	mileage: number

	@Column({ type: 'text', nullable: true })
	additionalOptions: string | null
}
