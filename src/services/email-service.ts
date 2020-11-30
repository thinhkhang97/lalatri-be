import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { EmailConfig } from "../config";
import { activateAccount } from "./email-templates/activate-account";
export class EmailService {
  transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport(
      new SMTPTransport(EmailConfig.transpoter)
    );
  }

  async sendMail(mailOptions: Mail.Options): Promise<void> {
    if (EmailConfig.disable) {
      return;
    }
    await this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  async sendActivateAccountLink(
    email: string,
    activeLink: string
  ): Promise<void> {
    const mailOptions = {
      from: "khangtnguyen97@gmail.com",
      to: email,
      subject: "Lalatri-Link kích hoạt tài khoản",
      html: activateAccount(activeLink),
    };
    this.sendMail(mailOptions);
  }
}
