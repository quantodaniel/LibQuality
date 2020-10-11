import { db } from "@src/config";
import { Model, Schema } from "mongoose";
import { IRepoDataModel } from "@src/interface/Repository";

const RepoSchema: Schema = new db.Schema(
  {
    owner: {
      type: String,
    },
    repo: {
      type: String,
    },
    stargazers_count: {
      type: Number,
    },
    watchers_count: {
      type: Number,
    },
    forks_count: {
      type: Number,
    },
    subscribers_count: {
      type: Number,
    },
    contributors_count: {
      type: Number,
    },
    open_issues_count: {
      type: Number,
    },
    open_issues_avg: {
      type: Number,
    },
    open_issues_std: {
      type: Number,
    },
    issues: [
      {
        created_at: Date,
        closed_at: Date,
        state: {
          type: String,
          enum: ["open", "closed"],
        },
        labels: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

RepoSchema.index({ owner: 1, repo: 1 });

const RepoModel: Model<IRepoDataModel> = db.model<IRepoDataModel>(
  "repository",
  RepoSchema
);
export { RepoModel };
