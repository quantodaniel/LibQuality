import { Document } from "mongoose";

export interface ISearchHistory {
  owner: string;
  repo: string;
}

export interface ISearchData {
  ip: string;
  history: ISearchHistory[];
}

export interface ISearchModel extends ISearchData, Document {}

export interface ISearchRepository {
  findOne(ip: string): Promise<ISearchModel>;
  update(ip: string, data: ISearchHistory): Promise<void>;
  create(ip: string, data: ISearchHistory): Promise<void>;
}
