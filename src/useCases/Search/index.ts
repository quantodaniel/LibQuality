import { GithubService } from "@services/GithubService";

import { SearchHandler } from "./handler";
import { SearchController } from "./controller";

export function CreateSearchController() {
  const githubService = new GithubService();
  return new SearchController(githubService);
}

export function CreateSearchHandler() {
  const searchController = CreateSearchController();
  return new SearchHandler(searchController);
}
