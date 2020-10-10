import { Request, Response } from "express";
import { SearchController } from "./controller";

export class SearchHandler {
  constructor(private searchController: SearchController) {}

  async findRepoByName(req: Request, res: Response) {
    const query: string = <string>req.query.q;
    const response = await this.searchController.findRepos(query);
    res.send(response);
  }
}
