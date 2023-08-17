import { AppDataSource } from '@/data-source'
import emailService from '@resources/email/email.service'
import { Image } from '@resources/image/image.entity'
import imageService from '@resources/image/image.service'
import TokenPayloadDto from '@resources/token/dtos/token-payload.dto'
import { Token } from '@resources/token/token.entity'
import tokenService from '@resources/token/token.service'
import UserDto from '@resources/user/dtos/user.dto'
import { User } from '@resources/user/user.entity'
import HttpError from '@utils/exceptions/http.error'
import bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import AuthOutputDto from './dtos/auth-output.dto'
import LoginInputDto from './dtos/login-input.dto'
import RegisterInputDto from './dtos/register-input.dto'
import RegisterOutputDto from './dtos/register-output.dto'

class AccountService {
	private userRepository: Repository<User>
	private tokenRepository: Repository<Token>

	constructor() {
		this.userRepository = AppDataSource.getRepository(User)
		this.tokenRepository = AppDataSource.getRepository(Token)
	}

	async register(
		registerInputDto: RegisterInputDto,
		avatar?: Express.Multer.File
	): Promise<RegisterOutputDto> {
		const candidate = await this.userRepository.findOneBy({
			email: registerInputDto.email
		})

		if (candidate) {
			throw HttpError.BadRequest(
				`User with email ${registerInputDto.email} already exists`
			)
		}

		let createdImage: Image | null = null

		if (avatar) {
			createdImage = await imageService.save(avatar)
		}

		const hashedPassword = await bcrypt.hash(registerInputDto.password, 5)

		const newUser = this.userRepository.create({
			email: registerInputDto.email,
			name: registerInputDto.name,
			surname: registerInputDto.surname,
			password: hashedPassword,
			image: createdImage
		})

		const createdUser = await this.userRepository.save(newUser)

		const verificationLink = `${process.env.API_URL}/api/account/verify/${createdUser.id}`

		await emailService.sendVerifyingEmail(
			createdUser.email,
			verificationLink
		)

		const userDto = new UserDto(createdUser)

		return { user: userDto }
	}

	async verify(userIdLink: string) {
		const user = await this.userRepository.findOneBy({ id: userIdLink })

		if (!user) {
			throw HttpError.BadRequest('Incorrect verifying link')
		}

		user.isVerified = true
		await this.userRepository.save(user)
	}

	async login(loginInputDto: LoginInputDto): Promise<AuthOutputDto> {
		const user = await this.userRepository.findOneBy({
			email: loginInputDto.email
		})

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
		const tokenFromDatabase = await this.tokenRepository.findOneBy({
			refreshToken
		})

		if (!userData || !tokenFromDatabase) {
			throw HttpError.UnauthorizedError()
		}

		const user = await this.userRepository.findOneBy({ id: userData.id })

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
