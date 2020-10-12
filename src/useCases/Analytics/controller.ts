import { IRepoRepository } from "@src/interface/Repository";

export class AnalyticsController {
  constructor(private repoRepository: IRepoRepository) {}

  async findByRepo(owner: string, repo: string) {
    return await this.repoRepository.statistics(owner, repo);
  }
}
