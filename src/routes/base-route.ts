import { Router } from "express";

export class BaseRoute<Controller> {
	protected router: Router;

	protected controller?: Controller;

	constructor(router: Router) {
		this.router = router;
	}

	getRouteConfig(): Router {
		return this.router;
	}
}
