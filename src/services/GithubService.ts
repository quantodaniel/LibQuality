import { Octokit } from "@octokit/core";

export class GithubService {
  private octokit: Octokit;

  constructor() {
    this.octokit = new Octokit();
  }

  async search(query: string) {
    return await this.octokit.request("GET /search/repositories", {
      q: query,
      per_page: 10,
    });
  }

  async findIssues(repo: string) {
    return await this.octokit.request("GET /search/issues", {
      q: `repo:${repo}`,
      per_page: 100,
    });
  }
}
