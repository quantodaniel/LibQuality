import { Request, Response, Router } from "express";
import { errors } from "celebrate";

import { MetadataValidator } from "@validators/Metadata";
import { SearchValidator } from "@validators/Search";
import { AnalyticsValidator } from "@validators/Analytics";

import { CreateMetadataHandler } from "@useCases/Metadata";
import { CreateSearchHandler } from "@useCases/Search";
import { CreateAnalyticsHandler } from "@useCases/Analytics";

const routes = Router();

const searcHandler = CreateSearchHandler();
const metadataHandler = CreateMetadataHandler();
const analyticsHandler = CreateAnalyticsHandler();

routes.get("/search", SearchValidator, function (req: Request, res: Response) {
  return searcHandler.findRepoByName(req, res);
});

routes.get("/repos/:repo*/metadata", MetadataValidator, function (
  req: Request,
  res: Response
) {
  return metadataHandler.findByRepo(req, res);
});

routes.get("/repos/:repo*/analytics", AnalyticsValidator, function (
  req: Request,
  res: Response
) {
  return analyticsHandler.findByRepo(req, res);
});

routes.use(errors());

routes.use("*", function (req: Request, res: Response) {
  res.send("ok");
});

export default routes;
