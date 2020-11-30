import cryto from "crypto";
import jwt from "jsonwebtoken";

export class StringUtil {
	/**Regex to check email format */
	static readonly EmailRegExp = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}/;

	/**
	 * Return true if str is an empty string
	 * @param str
	 */
	static isEmpty(str: string): boolean {
		return !str || !str.trim();
	}

	/**
	 * Return true if str has an email format.
	 * @param str Email need to be checked
	 */
	static isEmail(str: string): boolean {
		return this.EmailRegExp.test(str);
	}

	/**
	 * Return salt and hashed password after encrypting password
	 * @param password
	 */
	static encryptPassword(
		password: string
	): { salt: string; hashedPassword: string } {
		const salt = cryto.randomBytes(255).toString("hex");
		const hashedPassword = cryto
			.pbkdf2Sync(password, salt, 1000, 512, "sha512")
			.toString("hex");
		return { salt, hashedPassword };
	}

	/**
	 * Encrypt and compare passwords
	 * @param password password to compare
	 * @param salt A string to encrypt old password
	 * @param hashedPwd old hashed password
	 */
	static validatePassword(
		password: string,
		salt: string,
		hashedPwd: string
	): boolean {
		const hashedCurrentPwd = cryto
			.pbkdf2Sync(password, salt, 1000, 512, "sha512")
			.toString("hex");
		return hashedCurrentPwd === hashedPwd;
	}

	/**
	 * Return the token after sign data
	 * @param encryptData data to encrypt
	 * @param privateKey private key to encrypt the data
	 */
	static signData(encryptData: any, privateKey: string): string {
		return jwt.sign({ data: JSON.stringify(encryptData) }, privateKey);
	}

	static decoded(token: string, privateKey: string): any {
		return jwt.verify(token, privateKey);
	}
}
