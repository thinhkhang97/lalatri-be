import express, { Express, Router } from "express";
import * as bodyParser from "body-parser";
import { UserRoute } from "./routes";
import { ProductRoute } from "./routes/product-route";
import { database } from "./database";
import morgan from "morgan";
import cors from "cors";

class App {
  private app: Express;

  private route: Router;

  constructor() {
    this.app = express();
    this.route = express.Router();

    this.initThirdPartyUsing();
    this.initRoutes();
  }

  private initThirdPartyUsing(): void {
    this.app.use(
      bodyParser.json({
        limit: "50mb",
        verify(req: any, res, buf, encoding) {
          req.rawBody = buf;
        },
      })
    );
    this.app.use(morgan("dev"));

    const allowlist = ["http://localhost:3000"];
    const corsOptionsDelegate = function (req: any, callback: any) {
      let corsOptions;
      if (allowlist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
      } else {
        corsOptions = { origin: false }; // disable CORS for this request
      }
      callback(null, corsOptions); // callback expects two parameters: error and options
    };
    this.app.use(cors(corsOptionsDelegate));

    this.app.use(function (_, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
  }

  private initRoutes(): void {
    const userRoute = new UserRoute(this.route);
    const productRoute = new ProductRoute(this.route);

    this.app.use("/user", userRoute.getRouteConfig());
    this.app.use("/product", productRoute.getRouteConfig());
  }

  start(): void {
    this.app.listen(5000, "0.0.0.0", () => {
      console.log("Server listening on port 5000");
      database.connect();
    });
  }
}

const app = new App();

export { app };
