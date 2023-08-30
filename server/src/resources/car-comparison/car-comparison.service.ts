import { AppDataSource } from '@/data-source'
import HttpError from '@utils/exceptions/http.error'
import { Repository } from 'typeorm'
import { CarComparison } from './car-comparison.entity'

class CarComparisonService {
	private carComparisonRepository: Repository<CarComparison>

	constructor() {
		this.carComparisonRepository =
			AppDataSource.getRepository(CarComparison)
	}

	async getByUserIdAndCarAdId(userId: string, carAdId: number) {
		const carComparison = await this.carComparisonRepository.findOneBy({
			user: { id: userId },
			carAd: { id: carAdId }
		})
		return carComparison
	}

	async toggle(userId: string, carAdId: number) {
		if (!userId || !carAdId) {
			throw HttpError.BadRequest('Invalid input data')
		}

		const candidate = await this.carComparisonRepository.findOneBy({
			user: { id: userId },
			carAd: { id: carAdId }
		})
		if (candidate) {
			await this.carComparisonRepository.remove(candidate)
		} else {
			const newCarComparison = this.carComparisonRepository.create({
				carAd: { id: carAdId },
				user: { id: userId }
			})
			await this.carComparisonRepository.save(newCarComparison)
		}
	}
}

export default new CarComparisonService()
