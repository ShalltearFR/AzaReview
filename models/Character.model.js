// Type de pieces :
//    "hands"  //Mains
//    "head"  //Tete
//    "body"  //Corps
//    "feet"  //Pieds
//    "planar_sphere"  //Sphere
//    "link_rope" //Corde

// Type de stats :
//    "HPAddedRatio"  //PV%//
//    "HPDelta"  //PV//
//    "AttackDelta"  //ATQ//
//    "AttackAddedRatio"  //ATQ%//
//    "PhysicalAddedRatio"  //DGT Physique//
//    "QuantumAddedRatio"  //DGT Quantique//
//    "ImaginaryAddedRatio"  //DGT Imaginaire//
//    "WindAddedRatio"  //DGT Vent//
//    "LightningAddedRatio"  //DGT Foudre//
//    "IceAddedRatio"  //DGT Glace//
//    "FireAddedRatio"  //DGT Feu//
//    "SPRatioBase"  //Recharge energie//
//    "StatusProbabilityBase"  //Chances d'application des effets//
//    "CriticalChanceBase"  //Taux crit//
//    "CriticalDamageBase"  //Degats crit//
//    "StatusResistanceBase"  //Res aux effets//
//    "BreakDamageAddedRatioBase"  //Effet de rupture//
//    "HealRatioBase"  //Bonus soins//
//    "SpeedDelta" //Vitesse//

const mongoose = require("mongoose");
const { Schema, models, model } = mongoose;

const lightConeSchema = new Schema({
  id: String,
  recommended: Boolean,
});

const relicsSetSchema = new Schema({
  id: String,
  num: { type: Number, enum: [2, 4] },
  recommended: Boolean,
});

const mainStatsSchema = new Schema({
  piece: {
    type: String,
    enum: ["head", "hands", "body", "feet", "planar_sphere", "link_rope"],
  },
  type: {
    type: String,
    enum: [
      "HPDelta",
      "HPAddedRatio",
      "AttackDelta",
      "AttackAddedRatio",
      "PhysicalAddedRatio",
      "QuantumAddedRatio",
      "ImaginaryAddedRatio",
      "WindAddedRatio",
      "LightningAddedRatio",
      "IceAddedRatio",
      "FireAddedRatio",
      "SPRatioBase",
      "StatusProbabilityBase",
      "CriticalChanceBase",
      "CriticalDamageBase",
      "StatusResistanceBase",
      "BreakDamageAddedRatioBase",
      "HealRatioBase",
      "SpeedDelta",
    ],
  },
});

const recommendedStatsSchema = new Schema({
  type: {
    type: String,
    enum: [
      "HPDelta",
      "HPAddedRatio",
      "AttackDelta",
      "AttackAddedRatio",
      "PhysicalAddedRatio",
      "QuantumAddedRatio",
      "ImaginaryAddedRatio",
      "WindAddedRatio",
      "LightningAddedRatio",
      "IceAddedRatio",
      "FireAddedRatio",
      "SPRatioBase",
      "StatusProbabilityBase",
      "CriticalChanceBase",
      "CriticalDamageBase",
      "StatusResistanceBase",
      "BreakDamageAddedRatioBase",
      "HealRatioBase",
      "SpeedDelta",
    ],
  },
  value: Number,
  importance: Number,
});

const characterSchema = new Schema({
  buildName: String,
  lightCones: [lightConeSchema],
  relics_set: [relicsSetSchema],
  main_stats: [mainStatsSchema],
  recommended_stats: [recommendedStatsSchema],
  recommended_comment: String,
  total_coef: Number,
});

const dataSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    name: String,
    preview: String,
    portrait: String,
    path: String,
    data: [characterSchema],
  },
  { timestamps: true }
);

const Character = models.Character || model("Character", dataSchema);

export default Character;
