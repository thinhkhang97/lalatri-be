import { StringUtil } from "../utils";
import { IBaseModel } from "./base-model";

export interface IUser extends IBaseModel {
  email: string;

  phone: string;

  createdDate: number;

  modifiedDate: number;

  /**
   * Validate password
   * @param pwd password to validate
   */
  validatePassword(pwd: string): boolean;

  isActivated(): boolean;

  setActivated(value: boolean): void;
}

export class User implements IUser {
  id: number = 0;

  private salt: string = "";

  private hashedPassword: string = "";

  private activated: boolean = false;

  email: string = "";

  phone: string = "";

  createdDate: number = 0;

  modifiedDate: number = 0;

  constructor(email: string) {
    this.email = email;
  }

  getOutput(): any {
    return {
      email: this.email,
      phone: this.phone,
      createdDate: this.createdDate,
      modifiedDate: this.modifiedDate,
    };
  }

  validatePassword(pwd: string): boolean {
    return StringUtil.validatePassword(pwd, this.salt, this.hashedPassword);
  }

  isActivated(): boolean {
    return this.activated;
  }

  setActivated(value: boolean): void {
    this.activated = value;
  }

  static map(data: any): User | null {
    const {
      email,
      id,
      phone,
      activated,
      createdDate,
      modifiedDate,
      salt,
      hashedPassword,
    } = data;
    if (!email) {
      return null;
    }
    const user = new User(email);
    user.id = id;
    user.salt = salt;
    user.hashedPassword = hashedPassword;
    user.phone = phone;
    user.activated = activated;
    user.createdDate = createdDate;
    user.modifiedDate = modifiedDate;
    return user;
  }
}
