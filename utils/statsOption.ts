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

const mainStatOptions = [
  {
    label: "ATQ%",
    value: "AttackAddedRatio",
  },
  {
    label: "DEF%",
    value: "DefenceAddedRatio",
  },
  {
    label: "PV%",
    value: "HPAddedRatio",
  },
  {
    label: "Vitesse",
    value: "SpeedDelta",
  },
  {
    label: "Régén. d'énergie",
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
    label: "Rés. aux effets",
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
    value: "ThunderAddedRatio",
  },
  {
    label: "DGT Glace",
    value: "IceAddedRatio",
  },
  {
    label: "DGT Feu",
    value: "FireAddedRatio",
  },
];

const recommendedStatsOptions = [
  {
    label: "ATQ",
    value: "AttackDelta",
  },
  {
    label: "ATQ%",
    value: "AttackAddedRatio",
  },
  {
    label: "DEF",
    value: "DefenceDelta",
  },
  {
    label: "DEF%",
    value: "DefenceAddedRatio",
  },
  {
    label: "PV",
    value: "HPDelta",
  },
  {
    label: "PV%",
    value: "HPAddedRatio",
  },
  {
    label: "Régén. d'énergie",
    value: "SPRatioBase",
  },
  {
    label: "App. d'effets",
    value: "StatusProbabilityBase",
  },
  {
    label: "Chances crit.",
    value: "CriticalChanceBase",
  },
  {
    label: "DGT Crit.",
    value: "CriticalDamageBase",
  },
  {
    label: "Rés. aux effets",
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
    value: "ThunderAddedRatio",
  },
  {
    label: "DGT Glace",
    value: "IceAddedRatio",
  },
  {
    label: "DGT Feu",
    value: "FireAddedRatio",
  },
];

const recommendedStatsOptionsEN = [
  {
    label: "ATK",
    value: "AttackDelta",
  },
  {
    label: "ATK%",
    value: "AttackAddedRatio",
  },
  {
    label: "DEF",
    value: "DefenceDelta",
  },
  {
    label: "DEF%",
    value: "DefenceAddedRatio",
  },
  {
    label: "HP",
    value: "HPDelta",
  },
  {
    label: "HP%",
    value: "HPAddedRatio",
  },
  {
    label: "Energy Regen.",
    value: "SPRatioBase",
  },
  {
    label: "Effect Hit Rate",
    value: "StatusProbabilityBase",
  },
  {
    label: "CRIT Rate",
    value: "CriticalChanceBase",
  },
  {
    label: "CRIT DMG",
    value: "CriticalDamageBase",
  },
  {
    label: "Effect RES",
    value: "StatusResistanceBase",
  },
  {
    label: "Break Effect",
    value: "BreakDamageAddedRatioBase",
  },
  {
    label: "Healing Boost",
    value: "HealRatioBase",
  },
  {
    label: "Speed",
    value: "SpeedDelta",
  },
  {
    label: "Physical DMG",
    value: "PhysicalAddedRatio",
  },
  {
    label: "Quantum DMG",
    value: "QuantumAddedRatio",
  },
  {
    label: "Imaginary DMG",
    value: "ImaginaryAddedRatio",
  },
  {
    label: "Wind DMG",
    value: "WindAddedRatio",
  },
  {
    label: "Lightning DMG",
    value: "ThunderAddedRatio",
  },
  {
    label: "Ice DMG",
    value: "IceAddedRatio",
  },
  {
    label: "Fire DMG",
    value: "FireAddedRatio",
  },
];

const findLabel = (id: string) => {
  let foundElement;
  foundElement = recommendedStatsOptions.find((el) => el.value === id);
  if (foundElement) return foundElement.label;
  return "";
};

const findLabelEN = (id: string) => {
  let foundElement;
  foundElement = recommendedStatsOptionsEN.find((el) => el.value === id);
  if (foundElement) return foundElement.label;
  return "";
};
export {
  equipments,
  mainStatOptions,
  recommendedStatsOptions,
  findLabel,
  findLabelEN,
};
