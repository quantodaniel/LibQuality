import {
  ISearchRepository,
  ISearchHistory,
  ISearchModel,
} from "@src/interface/Search";

import { SearchModel } from "@src/repositories/schema/SearchSchema";

export class SearchRepository implements ISearchRepository {
  async findOne(ip: string): Promise<ISearchModel> {
    return await SearchModel.findOne({ ip });
  }

  async create(ip: string, data: ISearchHistory): Promise<void> {
    await SearchModel.create({ ip, history: [data] });
  }

  async update(ip: string, data: ISearchHistory): Promise<void> {
    await SearchModel.updateOne({ ip }, { $push: { history: data } });
  }
}
