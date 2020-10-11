import {
  IRepoData,
  IRepoDataModel,
  IRepoRepository,
} from "@src/interface/Repository";

import { RepoModel } from "@src/repositories/schema/RepoSchema";

export class RepoRepository implements IRepoRepository {
  async findOne(owner: string, repo: string): Promise<IRepoDataModel> {
    return await RepoModel.findOne({ owner, repo });
  }

  async create(data: IRepoData): Promise<IRepoDataModel> {
    return await RepoModel.create(data);
  }

  async update(id: string, data: IRepoData): Promise<void> {
    await RepoModel.findByIdAndUpdate(id, data);
  }
}
