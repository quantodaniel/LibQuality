import { GithubService } from "@src/services/GithubService";

export class SearchController {
  constructor(private githubService: GithubService) {}

  async findRepos(query: string) {
    const { data } = await this.githubService.search(query);
    const { items } = data;

    const response = items.map((item) => {
      return {
        owner: item.owner.login,
        repo: item.name,
        metadata_url: `/repos/${item.full_name}/metadata`,
      };
    });

    return response;
  }
}
