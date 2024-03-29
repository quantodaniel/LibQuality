import "dotenv/config";

import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import requestIp from "request-ip";

import { connectMongoDb } from "@src/config";
import routes from "@src/routes";

class App {
  express: Express;

  constructor() {
    this.express = express();

    this.db();
    this.middewares();
    this.routes();
  }

  async db() {
    await connectMongoDb();
  }

  middewares() {
    this.express.use(helmet());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.options("*", cors());
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(requestIp.mw());
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
