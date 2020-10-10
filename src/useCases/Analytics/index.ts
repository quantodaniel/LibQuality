import { AnalyticsHandler } from "./handler";
import { AnalyticsController } from "./controller";

export function CreateAnalyticsController() {
  return new AnalyticsController();
}

export function CreateAnalyticsHandler() {
  const analyticsController = CreateAnalyticsController();
  return new AnalyticsHandler(analyticsController);
}
