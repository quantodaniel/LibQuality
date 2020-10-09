import { Router } from "express";

const routes = Router();

routes.use("*", function (req, res) {
  res.send("ok");
});

export default routes;
