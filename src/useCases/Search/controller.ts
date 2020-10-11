import { GithubService } from "@src/services/GithubService";

export class SearchController {
  constructor(private githubService: GithubService) {}

  async findRepos(query: string) {
    const { data } = await this.githubService.search(query);
    const { items } = data;

    const response = items.map((item) => {
      return {
        repo: item.full_name,
        owner: item.owner.login,
      };
    });

    return response;
  }
}
