import { AnalyticsHandler } from "./handler";
import { AnalyticsController } from "./controller";

import { RepoRepository } from "@src/repositories/implementation/RepoRepository";

export function CreateAnalyticsController() {
  const repoRepository = new RepoRepository();
  return new AnalyticsController(repoRepository);
}

export function CreateAnalyticsHandler() {
  const analyticsController = CreateAnalyticsController();
  return new AnalyticsHandler(analyticsController);
}
