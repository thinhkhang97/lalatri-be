import { Router } from "express";

export class BaseRoute<Controller> {
	router: Router;

	controller?: Controller;

	constructor(router: Router) {
		this.router = router;
	}

	getRouteConfig(): Router {
		return this.router;
	}
}
