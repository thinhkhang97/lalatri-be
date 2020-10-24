import express from "express";

export class ProductController {
	async getAllProduct(
		req: express.Request,
		res: express.Response
	): Promise<void> {
		res.send("All products");
	}
}
