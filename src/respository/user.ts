import { database } from "../database";
import { userQuery } from "./queries";

export class UserRespository {
	public async createUser(
		email: string,
		salt: string,
		hashedPassword: string
	): Promise<void> {
		const res = await database.query(userQuery.CREATE_USER_QUERY, [
			email,
			"salt",
			"hashedPassword",
		]);
		console.log(res);
	}
}
