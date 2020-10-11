import { db } from "@src/config";
import { Model, Schema } from "mongoose";
import { ISearchModel } from "@src/interface/Search";

const HistorySchema: Schema = new db.Schema(
  {
    owner: String,
    repo: String,
  },
  {
    timestamps: true,
  }
);

const SearchSchema: Schema = new db.Schema(
  {
    ip: {
      type: String,
    },
    history: [HistorySchema],
  },
  {
    timestamps: true,
  }
);

SearchSchema.index({ ip: 1 });

const SearchModel: Model<ISearchModel> = db.model<ISearchModel>(
  "search",
  SearchSchema
);
export { SearchModel };
