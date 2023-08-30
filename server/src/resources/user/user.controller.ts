import { NextFunction, Request, Response } from 'express'
import UserDto from './dtos/user.dto'
import userService from './user.service'

class UserController {
	async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await userService.getById(req.params.id)
			res.json(new UserDto(user))
		} catch (error) {
			next(error)
		}
	}
}

export default new UserController()
