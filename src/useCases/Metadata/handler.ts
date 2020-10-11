import { Request, Response } from "express";
import { MetadataController } from "./controller";

export class MetadataHandler {
  constructor(private metadataController: MetadataController) {}

  async findByRepo(req: Request, res: Response) {
    const { owner, repo } = req.params;
    const clientIp = req.clientIp;

    await this.metadataController.updateSearch(owner, repo, clientIp);

    try {
      const response = await this.metadataController.findMetadata(owner, repo);
      res.json(response).end();
    } catch (error) {
      const repository = `${owner}/${repo}`;
      const body = `repository '${repository}' doesn't seem to be valid or public. Try /search/?q=${repository}`;
      res.status(400).json({ message: body }).end();
    }
  }
}
