import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import path from 'path'
import { AppDataSource } from './data-source'
import errorMiddleware from './middlewares/error.middleware'
import accountRouter from './resources/account/account.router'
import carAdRouter from './resources/car-ad/car-ad.router'
import carComparisonRouter from './resources/car-comparison/car-comparison.router'
import carRouter from './resources/car/car.router'
import favoriteAdRouter from './resources/favorite-ad/favorite-ad.router'
import userRouter from './resources/user/user.router'

class App {
	private port: number
	private app: Application
	private URI_PREFIX = 'api'

	constructor(port: number) {
		this.app = express()
		this.port = port
		this.initializeMiddlewares()
		this.initializeRoutes()
		this.initializeErrorHandling()
	}

	private initializeRoutes() {
		this.app.use(this.getRouteUri('account'), accountRouter)
		this.app.use(this.getRouteUri('car-ad'), carAdRouter)
		this.app.use(this.getRouteUri('car'), carRouter)
		this.app.use(this.getRouteUri('user'), userRouter)
		this.app.use(this.getRouteUri('favorite-ad'), favoriteAdRouter)
		this.app.use(this.getRouteUri('car-comparison'), carComparisonRouter)
	}

	private getRouteUri(resourceName: string) {
		return `/${this.URI_PREFIX}/${resourceName}`
	}

	private initializeMiddlewares() {
		this.app.use(express.static(path.join(__dirname, '../public')))
		this.app.use(cookieParser())
		this.app.use(express.json())
		this.app.use(
			cors({
				credentials: true,
				origin: 'http://localhost:5173'
			})
		)
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware)
	}

	public async start() {
		try {
			await AppDataSource.initialize()
			this.app.listen(this.port, () =>
				console.log(`SERVER STARTED ON PORT ${this.port}`)
			)
		} catch (error) {
			console.log(error)
		}
	}
}

export default App
