import { MetadataHandler } from "./handler";
import { MetadataController } from "./controller";

import { GithubService } from "@src/services/GithubService";
import { RepoRepository } from "@src/repositories/implementation/RepoRepository";
import { SearchRepository } from "@src/repositories/implementation/SearchRepository";

export function CreateMetadataController() {
  const githubService = new GithubService();
  const repoRepository = new RepoRepository();
  const searchRepository = new SearchRepository();

  return new MetadataController(
    githubService,
    repoRepository,
    searchRepository
  );
}

export function CreateMetadataHandler() {
  const metadataController = CreateMetadataController();
  return new MetadataHandler(metadataController);
}
