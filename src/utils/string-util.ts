import cryto from "crypto";

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

  static encryptPassword(
    password: string
  ): { salt: string; hashedPassword: string } {
    const salt = cryto.randomBytes(255).toString("hex");
    const hashedPassword = cryto
      .pbkdf2Sync(password, salt, 1000, 512, "sha512")
      .toString("hex");
    return { salt, hashedPassword };
  }
}
