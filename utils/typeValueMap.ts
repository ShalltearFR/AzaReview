type TypeValueMap = {
  PhysicalAddedRatio: string;
  QuantumAddedRatio: string;
  ImaginaryAddedRatio: string;
  WindAddedRatio: string;
  ThunderAddedRatio: string;
  FireAddedRatio: string;
  IceAddedRatio: string;
  SPRatioBase: string;
  StatusProbabilityBase: string;
  CriticalChanceBase: string;
  CriticalDamageBase: string;
  HealRatioBase: string;
};

const typeValueMap: TypeValueMap | any = {
  PhysicalAddedRatio: "DGT Physique",
  QuantumAddedRatio: "DGT Quantique",
  ImaginaryAddedRatio: "DGT Imaginaire",
  WindAddedRatio: "DGT Vent",
  ThunderAddedRatio: "DGT Foudre",
  FireAddedRatio: "DGT Feu",
  IceAddedRatio: "DGT Glace",
  SPRatioBase: "Régén. d'énergie",
  StatusProbabilityBase: "App. des effets",
  CriticalChanceBase: "Chances Crit.",
  CriticalDamageBase: "DGT Crit.",
  HealRatioBase: "Augm. des soins",
};

export default typeValueMap;
export type { TypeValueMap };
