import express from "express";
import { userService } from "../services";

export class UserController {
	async registerAccount(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		const { email, password } = req.body;
		const user = await userService.createUser({ email, password });
		res.send(`created user ${user.email}`);
	}

	async activateAccount(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		const tid = req.params.tid || "";
		await userService.activateAccount(tid);
		res.send(`activated your account`);
	}
}
