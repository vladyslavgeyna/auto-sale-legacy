import RegisterInputDto from '@resources/account/dtos/register-input.dto'
import UserRole from '@utils/enums/user-role'
import { User } from '../user.entity'

export default class UserDto
	implements Omit<RegisterInputDto, 'password' | 'passwordConfirm'>
{
	email: string
	name: string
	surname: string
	id: string
	isVerified: boolean
	role: UserRole
	avatarPath: string | null

	constructor(user: User) {
		this.email = user.email
		this.name = user.name
		this.surname = user.surname
		this.id = user.id
		this.isVerified = user.isVerified
		this.role = user.role
		this.avatarPath = user.image
			? process.env.API_URL + `/images/${user.image.name}`
			: user.image
	}
}
