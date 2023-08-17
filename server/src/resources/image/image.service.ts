import { AppDataSource } from '@/data-source'
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { Repository } from 'typeorm'
import * as uuid from 'uuid'
import { Image } from './image.entity'

class ImageService {
	private IMAGES_FILE_EXTENSION = '.jpeg'
	private MAX_SIZE_TO_RESIZE = 1280
	private COMPRESSION_QUALITY = 80
	private imageRepository: Repository<Image>

	constructor() {
		this.imageRepository = AppDataSource.getRepository(Image)
	}

	private async directoryExists(directoryPath: string) {
		try {
			await fs.access(directoryPath)
			return true
		} catch (error) {
			return false
		}
	}

	/**
	 * Saves and returns saved image entity
	 * @param file File to save
	 * @returns Saved image entity
	 */
	async save(file: Express.Multer.File): Promise<Image> {
		const { buffer } = file
		const newFileName = uuid.v4() + this.IMAGES_FILE_EXTENSION

		const outputDirectory = path.join(process.cwd(), 'public', 'images')

		if (!this.directoryExists(outputDirectory)) {
			fs.mkdir(outputDirectory, { recursive: true })
		}

		await sharp(buffer)
			.resize({
				width: this.MAX_SIZE_TO_RESIZE,
				height: this.MAX_SIZE_TO_RESIZE,
				fit: 'inside',
				withoutEnlargement: true
			})
			.toFormat('jpeg')
			.jpeg({ quality: this.COMPRESSION_QUALITY })
			.toFile(path.join(outputDirectory, newFileName))

		const image = this.imageRepository.create({
			name: newFileName
		})

		const newImage = await this.imageRepository.save(image)

		return newImage
	}
}

export default new ImageService()
