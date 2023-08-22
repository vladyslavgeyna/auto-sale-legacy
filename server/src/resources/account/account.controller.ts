import HttpStatusCode from '@utils/enums/http-status-code'
import { RequestWithBody, RequestWithParams } from '@utils/types/request.type'
import { NextFunction, Request, Response } from 'express'
import accountService from './account.service'
import LoginInputDto from './dtos/login-input.dto'
import RegisterInputDto from './dtos/register-input.dto'

class AccountController {
	private saveCookie(res: Response, refreshToken: string) {
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000
		})
	}

	async register(
		req: RequestWithBody<RegisterInputDto>,
		res: Response,
		next: NextFunction
	) {
		try {
			const userData = await accountService.register(req.body, req?.file)

			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	login = async (
		req: RequestWithBody<LoginInputDto>,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userData = await accountService.login(req.body)

			this.saveCookie(res, userData.refreshToken)

			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	async verify(
		req: RequestWithParams<{ userId: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const userIdLink = req.params.userId

			await accountService.verify(userIdLink)

			return res.redirect(
				String(process.env.CLIENT_URL) + '/account/login?verified=true'
			)
		} catch (error) {
			next(error)
		}
	}

	refresh = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.cookies

			const userData = await accountService.refresh(refreshToken)

			this.saveCookie(res, userData.refreshToken)

			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies

			await accountService.logout(refreshToken)
			res.clearCookie('refreshToken')

			return res.sendStatus(HttpStatusCode.NO_CONTENT_204)
		} catch (error) {
			next(error)
		}
	}
}

export default new AccountController()
