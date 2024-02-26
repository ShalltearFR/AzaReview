const equipments = [
  {
    label: "Corps",
    value: "body",
  },
  {
    label: "Pieds",
    value: "feet",
  },
  {
    label: "Sphere",
    value: "planar_sphere",
  },
  {
    label: "Corde",
    value: "link_rope",
  },
];

const typesStat = [
  {
    label: "PV",
    value: "HPDelta",
  },
  {
    label: "ATQ",
    value: "AttackDelta",
  },
  {
    label: "DEF",
    value: "DefenseDelta",
  },
  {
    label: "DGT Physique",
    value: "PhysicalAddedRatio",
  },
  {
    label: "DGT Quantique",
    value: "QuantumAddedRatio",
  },
  {
    label: "DGT Imaginaire",
    value: "ImaginaryAddedRatio",
  },
  {
    label: "DGT Vent",
    value: "WindAddedRatio",
  },
  {
    label: "DGT Foudre",
    value: "LightningAddedRatio",
  },
  {
    label: "DGT Glace",
    value: "IceAddedRatio",
  },
  {
    label: "DGT Feu",
    value: "FireAddedRatio",
  },
  {
    label: "Recharge énergie",
    value: "SPRatioBase",
  },
  {
    label: "Chances d'effets",
    value: "StatusProbabilityBase",
  },
  {
    label: "Taux crit",
    value: "CriticalChanceBase",
  },
  {
    label: "Dégâts crit",
    value: "CriticalDamageBase",
  },
  {
    label: "Rés. effets",
    value: "StatusResistanceBase",
  },
  {
    label: "Effet de rupture",
    value: "BreakDamageAddedRatioBase",
  },
  {
    label: "Bonus soins",
    value: "HealRatioBase",
  },
  {
    label: "Vitesse",
    value: "SpeedDelta",
  },
];

const allTypesStat = [
  {
    label: "PV%",
    value: "HPAddedRatio",
  },
  {
    label: "ATQ%",
    value: "AttackAddedRatio",
  },
  {
    label: "DEF%",
    value: "DefenseAddedRatio",
  },
  ...typesStat,
];

export { equipments, typesStat, allTypesStat };
