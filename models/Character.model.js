import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    data: [
      {
        lightCone: [
          {
            id: String,
            recommanded: Boolean,
          },
        ],
        relics_set: [
          {
            id: String,
            num: 2 || 4,
            recommanded: Boolean,
          },
        ],
        main_stats: [
          {
            piece:
              "head" || //Tete
              "hands" || //Mains
              "body" || //Corps
              "feet" || //Pieds
              "planar_sphere" || //Sphere
              "link_rope", //Corde
            type:
              "HPDelta" || //PV//
              "HPAddedRatio" || //PV%//
              "AttackDelta" || //ATQ//
              "AttackAddedRatio" || //ATQ%//
              "PhysicalAddedRatio" || //DGT Physique//
              "QuantumAddedRatio" || //DGT Quantique//
              "ImaginaryAddedRatio" || //DGT Imaginaire//
              "WindAddedRatio" || //DGT Vent//
              "LightningAddedRatio" || //DGT Foudre//
              "IceAddedRatio" || //DGT Glace//
              "FireAddedRatio" || //DGT Feu//
              "SPRatioBase" || //Recharge energie//
              "StatusProbabilityBase" || //Chances d'application des effets//
              "CriticalChanceBase" || //Taux crit//
              "CriticalDamageBase" || //Degats crit//
              "StatusResistanceBase" || //Res aux effets//
              "BreakDamageAddedRatioBase" || //Effet de rupture//
              "HealRatioBase" || //Bonus soins//
              "SpeedDelta", //Vitesse//
          },
        ],
        recommanded_stats: [
          {
            type:
              "HPDelta" || //PV//
              "HPAddedRatio" || //PV%//
              "AttackDelta" || //ATQ//
              "AttackAddedRatio" || //ATQ%//
              "PhysicalAddedRatio" || //DGT Physique//
              "QuantumAddedRatio" || //DGT Quantique//
              "ImaginaryAddedRatio" || //DGT Imaginaire//
              "WindAddedRatio" || //DGT Vent//
              "LightningAddedRatio" || //DGT Foudre//
              "IceAddedRatio" || //DGT Glace//
              "FireAddedRatio" || //DGT Feu//
              "SPRatioBase" || //Recharge energie//
              "StatusProbabilityBase" || //Chances d'application des effets//
              "CriticalChanceBase" || //Taux crit//
              "CriticalDamageBase" || //Degats crit//
              "StatusResistanceBase" || //Res aux effets//
              "BreakDamageAddedRatioBase" || //Effet de rupture//
              "HealRatioBase" || //Bonus soins//
              "SpeedDelta", //Vitesse//
            value: Number,
            importance: Number,
          },
        ],
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Character = model("Character", userSchema);

export default Character;
