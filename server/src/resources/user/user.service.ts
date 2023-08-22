import { AppDataSource } from '@/data-source'
import { User } from '@resources/user/user.entity'
import HttpError from '@utils/exceptions/http.error'
import { Repository } from 'typeorm'
import CreateUserInputDto from './dtos/create-user-input.dto'

class UserService {
	private userRepository: Repository<User>

	constructor() {
		this.userRepository = AppDataSource.getRepository(User)
	}

	async getById(id: string) {
		const user = await this.userRepository.findOneBy({ id })

		return user
	}

	async verify(id: string) {
		const user = await this.getById(id)

		if (!user) {
			throw HttpError.NotFound('User not found')
		}

		user.isVerified = true
		await this.userRepository.save(user)
	}

	async getByEmail(email: string) {
		const user = await this.userRepository.findOneBy({
			email
		})

		return user
	}

	async getByPhone(phone: string) {
		const user = await this.userRepository.findOneBy({
			phone
		})

		return user
	}

	async create(user: CreateUserInputDto) {
		const newUser = this.userRepository.create(user)

		const createdUser = await this.userRepository.save(newUser)

		return createdUser
	}
}

export default new UserService()
