import express from "express";
import { userService } from "../services";

export class UserController {
  async createUser(req: express.Request, res: express.Response): Promise<void> {
    const { email, password } = req.body;
    const user = await userService.createUser({ email, password });
    res.send("created user");
  }
}
