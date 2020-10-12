import { differenceInDays } from "date-fns";

import { GithubService } from "@src/services/GithubService";

import {
  IRepoData,
  IRepoIssue,
  IRepoRepository,
} from "@src/interface/Repository";

import { ISearchRepository } from "@src/interface/Search";
import { pick, normalizeDate } from "@src/helpers";

export class MetadataController {
  constructor(
    private githubService: GithubService,
    private repoRepository: IRepoRepository,
    private searchRepository: ISearchRepository
  ) {}

  private calcAvgDeviation(issues: IRepoIssue[]) {
    const diffs = issues.map((issue) => {
      return differenceInDays(
        issue.closed_at ? new Date(issue.closed_at) : new Date(),
        new Date(issue.created_at)
      );
    });

    const avg = diffs.reduce((acc, curr) => acc + curr, 0) / issues.length;

    const sqr =
      diffs
        .map((diff) => Math.pow(diff - avg, 2))
        .reduce((acc, curr) => acc + curr, 0) / issues.length;

    return {
      avg: parseInt(avg.toFixed(0)) || 0,
      std: parseInt(Math.sqrt(sqr).toFixed(0)) || 0,
    };
  }

  private async findMetadataFromDb(owner: string, repo: string) {
    return await this.repoRepository.findOne(owner, repo);
  }

  private async findMetadataFromApi(
    owner: string,
    repo: string
  ): Promise<IRepoData> {
    const { data } = await this.githubService.findDetails(owner, repo);
    const contributors = await this.githubService.findContributors(owner, repo);
    const issuesList = await this.githubService.findIssues(owner, repo);

    const issues = issuesList
      .filter((issue) => !issue.pull_request)
      .map((issue) => ({
        created_at: normalizeDate(issue.created_at),
        closed_at: normalizeDate(issue.closed_at),
        state: <any>issue.state,
        labels: issue.labels.map((label) => label.name),
      }));

    const issuesDays = this.calcAvgDeviation(issues);

    return {
      owner,
      repo,
      stargazers_count: data.stargazers_count,
      watchers_count: data.watchers_count,
      forks_count: data.forks_count,
      subscribers_count: data.subscribers_count,
      open_issues_count: issues.length,
      open_issues_avg: issuesDays.avg,
      open_issues_std: issuesDays.std,
      contributors_count: contributors.length,
      issues: issues,
    };
  }

  async updateSearch(owner: string, repo: string, ip: string) {
    const user = await this.searchRepository.findOne(ip);

    if (user) {
      await this.searchRepository.update(ip, { owner, repo });
    } else {
      await this.searchRepository.create(ip, { owner, repo });
    }
  }

  async findMetadata(owner: string, repo: string) {
    const metadataFromDb = await this.findMetadataFromDb(owner, repo);
    if (metadataFromDb) {
      return pick(metadataFromDb, [
        "owner",
        "repo",
        "open_issues_count",
        "open_issues_avg",
        "open_issues_std",
      ]);
    }

    const metadataFromApi = await this.findMetadataFromApi(owner, repo);
    if (metadataFromApi) {
      await this.repoRepository.create(metadataFromApi);
      return pick(metadataFromApi, [
        "owner",
        "repo",
        "open_issues_count",
        "open_issues_avg",
        "open_issues_std",
      ]);
    }

    throw new Error("error while getting raw data");
  }
}
