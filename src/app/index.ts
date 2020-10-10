import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "@routes";

class App {
  express: Express;

  constructor() {
    this.express = express();

    this.middewares();
    this.routes();
  }

  middewares() {
    this.express.use(helmet());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.options("*", cors());
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
