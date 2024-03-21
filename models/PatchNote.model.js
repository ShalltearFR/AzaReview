import { Schema, model, models } from "mongoose";

const patchNoteSchema = new Schema(
  {
    version: {
      type: Number,
      required: [true, "Indiquer la version"],
    },
    desc: {
      type: String,
      required: [true, "Indiquer une description"],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const PatchNote = models.PatchNote || model("PatchNote", patchNoteSchema);

export default PatchNote;
