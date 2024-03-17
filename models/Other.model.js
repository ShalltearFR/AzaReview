import { Schema, model, models } from "mongoose";

const otherSchema = new Schema(
  {
    codes: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Other = models.Other || model("Other", otherSchema);

export default Other;
