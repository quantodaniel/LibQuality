import { Octokit } from "@octokit/rest";
import { retry } from "@octokit/plugin-retry";

export class GithubService {
  private octokit: Octokit;

  constructor() {
    const CustomOctokit = Octokit.plugin(retry);
    this.octokit = new CustomOctokit();
  }

  async search(query: string) {
    return await this.octokit.search.repos({
      q: query,
      per_page: 10,
    });
  }

  async findDetails(owner: string, repo: string) {
    return await this.octokit.repos.get({ owner, repo });
  }

  async findContributors(owner: string, repo: string) {
    return await this.octokit.paginate(this.octokit.repos.listContributors, {
      owner,
      repo,
      per_page: 100,
    });
  }

  async findIssues(owner: string, repo: string) {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);

    return await this.octokit.paginate(this.octokit.issues.listForRepo, {
      owner,
      repo,
      state: "all",
      per_page: 100,
      since: currentDate.toISOString(),
    });
  }
}
