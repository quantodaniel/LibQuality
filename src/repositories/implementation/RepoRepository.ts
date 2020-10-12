import {
  IRepoData,
  IRepoDataModel,
  IRepoRepository,
  IRepoStatistics,
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

  async statistics(owner: string, repo: string): Promise<IRepoStatistics[]> {
    return await RepoModel.aggregate([
      {
        $match: {
          owner,
          repo,
        },
      },
      {
        $unwind: {
          path: "$issues",
        },
      },
      {
        $project: {
          issue: "$issues",
          open: {
            $cond: [{ $eq: ["$issues.state", "open"] }, 1, 0],
          },
          closed: {
            $cond: [{ $eq: ["$issues.state", "closed"] }, 1, 0],
          },
        },
      },
      {
        $group: {
          _id: "$issue.created_at",
          open: { $sum: "$open" },
          closed: { $sum: "$closed" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }
}
