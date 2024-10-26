import { Schema, model, models } from "mongoose";

// const characterStatsSchema = new Schema(
//   {
//     id: { type: String },
//     uid: { type: [String] },
//     ranks: { type: [String] },
//     lightCones: { type: [String] },
//     relics_sets: { type: [String] },
//     properties: {
//       hp: { type: [Number] },
//       atk: { type: [Number] },
//       def: { type: [Number] },
//       spd: { type: [Number] },
//       crit_rate: { type: [Number] },
//       crit_dmg: { type: [Number] },
//       break_effect: { type: [Number] },
//       effect_hit: { type: [Number] },
//       effect_res: { type: [Number] },
//       energy: { type: [Number] },
//     },
//   },
//   {
//     // this second object adds extra properties: `createdAt` and `updatedAt`
//     timestamps: true,
//   }
// );

const RelicProcSchema = new mongoose.Schema({
  hp: { type: Number, required: false },
  hpPercent: { type: Number, required: false },
  atk: { type: Number, required: false },
  atkPercent: { type: Number, required: false },
  def: { type: Number, required: false },
  defPercent: { type: Number, required: false },
  spd: { type: Number, required: false },
  crit_rate: { type: Number, required: false },
  crit_dmg: { type: Number, required: false },
  break_dmg: { type: Number, required: false },
  effect_hit: { type: Number, required: false },
  effect_res: { type: Number, required: false },
  energy: { type: Number, required: false },
});

const PropertiesSchema = new mongoose.Schema({
  hp: { type: Number, required: true },
  atk: { type: Number, required: true },
  def: { type: Number, required: true },
  spd: { type: Number, required: true },
  crit_rate: { type: Number, required: true },
  crit_dmg: { type: Number, required: true },
  break_dmg: { type: Number, required: true },
  effect_hit: { type: Number, required: true },
  effect_res: { type: Number, required: true },
  energy: { type: Number, required: true },
});

const DataSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  ranks: { type: Number, required: true },
  lightCones: { type: String, required: true },
  relics_sets: [{ type: String, required: true }], // Set de reliques et nombre de pièces
  totalProcs: { type: Number, required: true },
  relicsProcs: [RelicProcSchema], // Liste des procs
  properties: PropertiesSchema, // Stats finales du personnage
});

const characterStatsSchema = new mongoose.Schema({
  id: { type: String, required: true }, // ID du personnage
  data: [DataSchema], // Tableau de données
});

const CharacterStats =
  models.CharacterStats || model("CharacterStats", characterStatsSchema);

export default CharacterStats;
