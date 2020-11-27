import { database } from "../database";
import { IUser, User } from "../models";
import { userQuery } from "./queries";

export class UserRespository {
  public async createUser(
    email: string,
    salt: string,
    hashedPassword: string
  ): Promise<IUser | null> {
    const res = await database.query(userQuery.CREATE_USER_QUERY, [
      email,
      salt,
      hashedPassword,
    ]);
    return User.map(res.rows[0]);
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    const res = await database.query(userQuery.GET_USER_QUERY, [email]);
    return User.map(res.rows[0]);
  }
}
