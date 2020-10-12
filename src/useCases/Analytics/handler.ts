import { Request, Response } from "express";
import { AnalyticsController } from "./controller";

export class AnalyticsHandler {
  constructor(private analyticsController: AnalyticsController) {}

  async findByRepo(req: Request, res: Response) {
    const { owner, repo } = req.params;
    const statistics = await this.analyticsController.findByRepo(owner, repo);

    if (statistics.length) {
      res.json(statistics);
    } else {
      const repository = `${owner}/${repo}`;
      const body = `repository '${repository}' not found. Try to get metadata first at /repos/${repository}/metadata`;
      res.status(400).json({ message: body }).end();
    }
  }
}
