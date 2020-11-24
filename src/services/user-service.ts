import { userRespository } from "../respository";

export class UserService {
	async createUser(input: any): Promise<void> {
		const { email } = input;
		await userRespository.createUser(email, "salt", "hashedPassword");
	}
}
