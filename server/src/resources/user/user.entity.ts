import { Image } from '@resources/image/image.entity'
import { Token } from '@resources/token/token.entity'
import UserRole from '@utils/enums/user-role'
import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ unique: true })
	email: string

	@Column()
	name: string

	@Column()
	surname: string

	@Column()
	password: string

	@Column({ default: false })
	isVerified: boolean

	@OneToOne(() => Token, token => token.user)
	token: Token

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.USER
	})
	role: UserRole

	@OneToOne(() => Image, { nullable: true })
	@JoinColumn()
	image: Image | null
}
