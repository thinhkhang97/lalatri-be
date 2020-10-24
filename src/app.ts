import express, { Express, Router } from "express";
import * as bodyParser from "body-parser";
import { UserRoute } from "./routes";
import { ProductRoute } from "./routes/product-route";

class App {
	app: Express;

	route: Router;

	constructor() {
		this.app = express();
		this.route = express.Router();
		this.initThirdPartyUsing();
		this.initRoutes();
	}

	initThirdPartyUsing(): void {
		this.app.use(
			bodyParser.json({
				limit: "50mb",
				verify(req: any, res, buf, encoding) {
					req.rawBody = buf;
				},
			})
		);
	}

	initRoutes(): void {
		const userRoute = new UserRoute(this.route);
		const productRoute = new ProductRoute(this.route);

		this.app.use("/user", userRoute.getRouteConfig());
		this.app.use("/product", productRoute.getRouteConfig());
	}

	start(): void {
		this.app.listen(5000, "0.0.0.0", () => {
			console.log("Server listening on port 5000");
		});
	}
}

const app = new App();

export { app };
