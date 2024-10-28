import { Schema, model, models } from "mongoose";

const RelicProcSchema = new Schema({
  HPAddedRatio: { type: Number, required: false },
  HPDelta: { type: Number, required: false },
  AttackDelta: { type: Number, required: false },
  AttackAddedRatio: { type: Number, required: false },
  DefenceDelta: { type: Number, required: false },
  DefenceAddedRatio: { type: Number, required: false },
  CriticalChanceBase: { type: Number, required: false },
  CriticalDamageBase: { type: Number, required: false },
  StatusProbabilityBase: { type: Number, required: false },
  StatusResistanceBase: { type: Number, required: false },
  BreakDamageAddedRatioBase: { type: Number, required: false },
  SpeedDelta: { type: Number, required: false },
});

const PropertiesSchema = new Schema({
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

const DataSchema = new Schema({
  uid: { type: String, required: true },
  ranks: { type: Number, required: true },
  lightCones: { type: String, required: true },
  relics_sets: [{ type: String, required: true }], // Set de reliques et nombre de pièces
  totalProcs: { type: Number, required: true },
  relicsProcs: [RelicProcSchema], // Liste des procs
  properties: PropertiesSchema, // Stats finales du personnage
});

const characterStatsSchema = new Schema(
  {
    id: { type: String, required: true }, // ID du personnage
    data: [DataSchema], // Tableau de données
  },
  { timestamps: true }
);

const CharacterStats =
  models.CharacterStats || model("CharacterStats", characterStatsSchema);

export default CharacterStats;
