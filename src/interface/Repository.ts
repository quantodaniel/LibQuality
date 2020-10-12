import { Document } from "mongoose";

export interface IRepoStatistics {
  _id: Date;
  open: number;
  closed: number;
}

export interface IRepoIssue {
  created_at: Date;
  closed_at: Date;
  state: "open" | "closed";
  labels: string[];
}

export interface IRepoData {
  owner: string;
  repo: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  subscribers_count: number;
  open_issues_count: number;
  open_issues_avg: number;
  open_issues_std: number;
  contributors_count: number;
  issues: IRepoIssue[];
}

export interface IRepoDataModel extends IRepoData, Document {}

export interface IRepoRepository {
  findOne(owner: string, repo: string): Promise<IRepoDataModel>;
  update(id: string, data: IRepoData): Promise<void>;
  create(data: IRepoData): Promise<IRepoDataModel>;
  statistics(owner: string, repo: string): Promise<IRepoStatistics[]>;
}
