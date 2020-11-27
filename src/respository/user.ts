import { database } from "../database";
import { userQuery } from "./queries";

export class UserRespository {
  public async createUser(
    email: string,
    salt: string,
    hashedPassword: string
  ): Promise<any> {
    const res = await database.query(userQuery.CREATE_USER_QUERY, [
      email,
      salt,
      hashedPassword,
    ]);
    return res?.rows[0];
  }

  public async getUserByEmail(email: string): Promise<any> {
    const res = await database.query(userQuery.GET_USER_QUERY, [email]);
    return res?.rows[0];
  }
}
