import { AppDataSource } from '@/data-source'
import HttpError from '@utils/exceptions/http.error'
import { Repository } from 'typeorm'
import { FavoriteAd } from './favorite-ad.entity'

class FavoriteAdService {
	private favoriteAdRepository: Repository<FavoriteAd>

	constructor() {
		this.favoriteAdRepository = AppDataSource.getRepository(FavoriteAd)
	}

	async getByUserIdAndCarAdId(userId: string, carAdId: number) {
		const favoriteAd = await this.favoriteAdRepository.findOneBy({
			user: { id: userId },
			carAd: { id: carAdId }
		})
		return favoriteAd
	}

	async getCountByCarAdId(carAdId: number) {
		const count = await this.favoriteAdRepository.countBy({
			carAd: { id: carAdId }
		})
		return count
	}

	async toggle(userId: string, carAdId: number) {
		if (!userId || !carAdId) {
			throw HttpError.BadRequest('Invalid input data')
		}

		const candidate = await this.favoriteAdRepository.findOneBy({
			user: { id: userId },
			carAd: { id: carAdId }
		})
		if (candidate) {
			await this.favoriteAdRepository.remove(candidate)
		} else {
			const newFavoriteAd = this.favoriteAdRepository.create({
				carAd: { id: carAdId },
				user: { id: userId }
			})
			await this.favoriteAdRepository.save(newFavoriteAd)
		}
	}
}

export default new FavoriteAdService()
