import express from "express";
import { userService } from "../services";

export class UserController {
	async createUser(req: express.Request, res: express.Response): Promise<void> {
		res.send("created users");
	}
}
