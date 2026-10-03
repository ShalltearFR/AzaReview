import mongoose, { Schema, Document, Model } from "mongoose";
import type { Role, Team, TeamsData } from "@/types/Teams.d";

export interface ITeams extends Omit<TeamsData, "data">, Document {
  data: Team[];
}

const RoleSchema = new Schema<Role>(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    id: {
      type: [String],
      required: true,
    },
  },
  {
    _id: false,
  }
);

const TeamSchema = new Schema<Team>(
  {
    teamName: {
      type: String,
      required: true,
    },
    roles: {
      type: [RoleSchema],
      required: true,
    },
  },
  {
    _id: false,
  }
);

const TeamsSchema = new Schema<ITeams>(
  {
    data: {
      type: [TeamSchema],
      required: true,
    },
    characterID: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Teams: Model<ITeams> =
  mongoose.models.Teams ||
  mongoose.model<ITeams>("Teams", TeamsSchema);

export default Teams;