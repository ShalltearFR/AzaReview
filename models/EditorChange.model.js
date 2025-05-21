import { Schema, model, models } from "mongoose";

const EditorChangeSchema = new Schema(
  {
    author: { type: String, required: true },
    comment: { type: String, required: true },
    edit: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const EditorChange =
  models.EditorChange || model("EditorChange", EditorChangeSchema);

export default EditorChange;
