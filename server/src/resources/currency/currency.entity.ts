import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Currency {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	name: string

	@Column({ unique: true })
	sign: string

	@Column({ unique: true })
	abbreviation: string
}
