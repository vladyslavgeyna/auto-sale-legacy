import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

class EmailService {
	private transporter
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			host: String(process.env.SMTP_HOST),
			port: Number(process.env.SMTP_PORT),
			secure: true,
			auth: {
				user: String(process.env.SMTP_USER),
				pass: String(process.env.SMTP_PASSWORD)
			}
		})
	}

	async sendVerifyingEmail(emailTo: string, link: string) {
		await this.transporter.sendMail({
			from: String(process.env.SMTP_USER),
			to: emailTo,
			subject: `Account verifying on ${process.env.API_URL}`,
			text: '',
			html: `
				<table align="center" cellpadding="15" cellspacing="0" width="100%" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;border: 3px solid black;border-radius:30px;text-align:center;">
					<tr>
						<td>
							<h1><strong>Help us protect your account</strong></h1>
							<p>Before you sign in, we need to verify your identity.</p>
							<h3 >For verifying follow the <strong><a href="${link}">link</a></strong>:</h3>
						</td>
					</tr>
				</table>
            `
		})
	}
}

export default new EmailService()
