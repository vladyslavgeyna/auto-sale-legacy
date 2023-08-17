import { User } from '@resources/user/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserReview {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column({ type: 'text' })
	text: string

	@ManyToOne(() => User, { nullable: false })
	userFrom: User

	@ManyToOne(() => User, { nullable: false })
	userTo: User

	@Column({ type: 'timestamp' })
	dateOfCreation: Date
}
