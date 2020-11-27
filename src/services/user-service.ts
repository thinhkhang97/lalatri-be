import { UserConfig } from "../config";
import { userRespository } from "../respository";
import { StringUtil } from "../utils";

export class UserService {
  private validatePassword(pass: string): boolean {
    return pass.trim().length >= UserConfig.validPasswordLength;
  }

  async createUser(input: { email: string; password: string }): Promise<void> {
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
    return createdUser;
  }
}
