import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { EmailConfig } from "../config";
export class EmailService {
	transporter: Mail;

	constructor() {
		this.transporter = nodemailer.createTransport(
			new SMTPTransport(EmailConfig.transpoter)
		);
	}

	async sendActivateAccountLink(
		email: string,
		activeLink: string
	): Promise<void> {
		const mailOptions = {
			from: "khangtnguyen97@gmail.com",
			to: "thinhkhang97@gmail.com",
			subject: "Lalatri-Link kích hoạt tài khoản",
			text: "That was easy!",
		};
		this.transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log("Email sent: " + info.response);
			}
		});
	}
}
