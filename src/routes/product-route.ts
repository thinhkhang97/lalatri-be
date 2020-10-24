import { Router } from "express";
import { ProductController } from "../controllers/product-controller";
import { BaseRoute } from "./base-route";

export class ProductRoute extends BaseRoute<ProductController> {
	controller: ProductController;

	constructor(router: Router) {
		super(router);
		this.controller = new ProductController();
		this.initRoute();
	}

	initRoute(): void {
		this.router.get("/", this.controller.getAllProduct);
	}
}
