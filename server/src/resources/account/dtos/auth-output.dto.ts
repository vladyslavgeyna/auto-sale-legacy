import RegisterOutputDto from './register-output.dto'

export default interface AuthOutputDto extends RegisterOutputDto {
	accessToken: string
	refreshToken: string
}
