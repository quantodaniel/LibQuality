import { Request, Response } from "express";
import { MetadataController } from "./controller";

export class MetadataHandler {
  constructor(private metadataController: MetadataController) {}

  async findByRepo(req: Request, res: Response) {
    res.send("ok");
  }
}
