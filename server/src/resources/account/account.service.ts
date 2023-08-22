import emailService from '@resources/email/email.service'
import { Image } from '@resources/image/image.entity'
import imageService from '@resources/image/image.service'
import TokenPayloadDto from '@resources/token/dtos/token-payload.dto'
import tokenService from '@resources/token/token.service'
import UserDto from '@resources/user/dtos/user.dto'
import userService from '@resources/user/user.service'
import HttpError from '@utils/exceptions/http.error'
import bcrypt from 'bcrypt'
import AuthOutputDto from './dtos/auth-output.dto'
import LoginInputDto from './dtos/login-input.dto'
import RegisterInputDto from './dtos/register-input.dto'
import RegisterOutputDto from './dtos/register-output.dto'

class AccountService {
	async register(
		registerInputDto: RegisterInputDto,
		avatar?: Express.Multer.File
	): Promise<RegisterOutputDto> {
		const candidateByEmail = await userService.getByEmail(
			registerInputDto.email
		)

		const candidateByPhone = await userService.getByPhone(
			registerInputDto.phone
		)

		if (candidateByEmail) {
			throw HttpError.BadRequest(
				`User with email ${registerInputDto.email} already exists`
			)
		}

		if (candidateByPhone) {
			throw HttpError.BadRequest(
				`User with phone ${registerInputDto.phone} already exists`
			)
		}

		let createdImage: Image | null = null

		if (avatar) {
			createdImage = await imageService.save(avatar)
		}

		const hashedPassword = await bcrypt.hash(registerInputDto.password, 3)

		const createdUser = await userService.create({
			email: registerInputDto.email,
			name: registerInputDto.name,
			surname: registerInputDto.surname,
			password: hashedPassword,
			phone: registerInputDto.phone,
			image: createdImage
		})

		const verificationLink = `${process.env.API_URL}/api/account/verify/${createdUser.id}`

		await emailService.sendVerifyingEmail(
			createdUser.email,
			verificationLink
		)

		const userDto = new UserDto(createdUser)

		return { user: userDto }
	}

	async verify(userIdLink: string) {
		await userService.verify(userIdLink)
	}

	async login(loginInputDto: LoginInputDto): Promise<AuthOutputDto> {
		const user = await userService.getByEmail(loginInputDto.email)

		if (!user) {
			throw HttpError.BadRequest(
				`User with email ${loginInputDto.email} was not found`
			)
		}

		const arePasswordsEquals = await bcrypt.compare(
			loginInputDto.password,
			user.password
		)

		if (!arePasswordsEquals) {
			throw HttpError.BadRequest(`Incorrect password`)
		}

		if (!user.isVerified) {
			throw HttpError.forbidden(
				`User is not verified. Please, verify ${user.email} email address by following the link in received email`
			)
		}

		const userDto = new UserDto(user)

		const tokens = tokenService.generateTokens(new TokenPayloadDto(userDto))

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}

	async logout(refreshToken: string) {
		await tokenService.removeToken(refreshToken)
	}

	async refresh(refreshToken: string): Promise<AuthOutputDto> {
		if (!refreshToken) {
			throw HttpError.UnauthorizedError()
		}

		const userData = tokenService.validateRefreshToken(refreshToken)

		const tokenFromDatabase = await tokenService.getByRefreshToken(
			refreshToken
		)

		if (!userData || !tokenFromDatabase) {
			throw HttpError.UnauthorizedError()
		}

		const user = await userService.getById(userData.id)

		if (!user) {
			throw HttpError.NotFound('Can not find user by token payload id')
		}

		const userDto = new UserDto(user)

		const tokens = tokenService.generateTokens(new TokenPayloadDto(userDto))

		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto
		}
	}
}

export default new AccountService()
