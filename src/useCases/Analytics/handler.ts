import { Request, Response } from "express";
import { AnalyticsController } from "./controller";

export class AnalyticsHandler {
  constructor(private analyticsController: AnalyticsController) {}

  async findByRepo(req: Request, res: Response) {
    res.send("ok");
  }
}
