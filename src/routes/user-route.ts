import { Router } from "express";
import { UserController } from "../controllers";
import { BaseRoute } from "./base-route";

export class UserRoute extends BaseRoute<UserController> {
  protected controller: UserController;

  constructor(router: Router) {
    super(router);
    this.controller = new UserController();
    this.initRoute();
  }

  initRoute(): void {
    this.router.post("/", this.controller.registerAccount);
  }
}
