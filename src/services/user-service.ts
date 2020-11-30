import { emailService } from ".";
import { AppConfig, EmailConfig, UserConfig } from "../config";
import { IUser } from "../models";
import { userRespository } from "../respository";
import { StringUtil } from "../utils";

export class UserService {
	private validatePassword(pass: string): boolean {
		return pass.trim().length >= UserConfig.validPasswordLength;
	}

	buildActivateRegisterLink(user: IUser): string {
		const { email } = user;
		const token = StringUtil.signData({ email }, EmailConfig.secretKey);
		console.log(
			"built activated link",
			`${AppConfig.host}/user/activate/${token}`
		);
		return `${AppConfig.host}/user/activate/${token}`;
	}

	async createUser(input: { email: string; password: string }): Promise<IUser> {
		const { email, password } = input;
		/**
		 * Check valid email format and password format
		 */
		if (!StringUtil.isEmail(email) || !this.validatePassword(password)) {
			throw new Error("Invailid input");
		}

		/**
		 * Check exist email to restore password
		 */
		const existUser = await userRespository.getUserByEmail(email);
		if (existUser) {
			throw new Error("Exist user");
		}
		const { salt, hashedPassword } = StringUtil.encryptPassword(password);
		const createdUser = await userRespository.createUser(
			email,
			salt,
			hashedPassword
		);
		if (!createdUser) {
			throw new Error("Couldnt create user");
		}

		/**
		 * Send email
		 */
		const activatedLink = this.buildActivateRegisterLink(createdUser);
		emailService.sendActivateAccountLink(email, activatedLink);
		return createdUser;
	}

	async activateAccount(tid: string): Promise<any> {
		try {
			const decoded = StringUtil.decoded(tid, EmailConfig.secretKey);
			const email = decoded.email || "";
			const existUser = await userRespository.getUserByEmail(email);
			if (!existUser) {
				throw new Error("Not found user");
			}
			await userRespository.updateActivedStatusById(existUser.id, true);
		} catch {
			throw new Error("Could not activate account");
		}
	}
}
