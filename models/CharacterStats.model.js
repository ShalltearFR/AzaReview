import { Schema, model, models } from "mongoose";

const characterStatsSchema = new Schema(
  {
    id: { type: String },
    uid: { type: [String] },
    ranks: { type: [String] },
    lightCones: { type: [String] },
    relics_sets: { type: [String] },
    properties: {
      hp: { type: [Number] },
      atk: { type: [Number] },
      def: { type: [Number] },
      spd: { type: [Number] },
      crit_rate: { type: [Number] },
      crit_dmg: { type: [Number] },
      break_effect: { type: [Number] },
      effect_hit: { type: [Number] },
      effect_res: { type: [Number] },
      energy: { type: [Number] },
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const CharacterStats =
  models.CharacterStats || model("CharacterStats", characterStatsSchema);

export default CharacterStats;

// {
//   id: "101",
//   uid: ["", "", ""],
//   ranks: ["", "", ""],
//   lightCones: ["","",""],
//   relics_sets: ["","",""],
//   properties: {
//     hp: [77, 21, 487],
//     atk: [0, 0, 0],
//     def: [0, 0, 0],
//     spd: [0, 0, 0],
//     crit_rate: [0, 0, 0],
//     crit_dmg: [0, 0, 0],
//     break_effect: [0, 0, 0],
//     effect_hit: [0, 0, 0],
//     effect_res: [0, 0, 0],
//     energy: [0, 0, 0],
//   }
// }
