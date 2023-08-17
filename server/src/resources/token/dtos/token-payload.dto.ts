import UserDto from '@resources/user/dtos/user.dto'
import UserRole from '@utils/enums/user-role'

export default class TokenPayloadDto {
	/**
	 * User's id
	 */
	id: string

	/**
	 * Is user verified
	 */
	isVerified: boolean

	/**
	 * User's email address
	 */
	email: string

	/**
	 * User's role
	 */
	role: UserRole

	constructor(userDto: UserDto) {
		this.id = userDto.id
		this.email = userDto.email
		this.isVerified = userDto.isVerified
		this.role = userDto.role
	}
}
