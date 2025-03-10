// Types
type LightCone = {
  id: string;
  recommended: boolean;
};

type RelicsSet = {
  id: string;
  num: number;
  recommended: boolean;
};

type MainStats = {
  piece: "head" | "hands" | "body" | "feet" | "planar_sphere" | "link_rope";
  type:
    | "HPDelta"
    | "HPAddedRatio"
    | "AttackDelta"
    | "AttackAddedRatio"
    | "PhysicalAddedRatio"
    | "QuantumAddedRatio"
    | "ImaginaryAddedRatio"
    | "WindAddedRatio"
    | "ThunderAddedRatio"
    | "IceAddedRatio"
    | "FireAddedRatio"
    | "SPRatioBase"
    | "StatusProbabilityBase"
    | "CriticalChanceBase"
    | "CriticalDamageBase"
    | "StatusResistanceBase"
    | "BreakDamageAddedRatioBase"
    | "HealRatioBase"
    | "SpeedDelta";
};

type RecommendedStats = {
  type:
    | "HPDelta"
    | "HPAddedRatio"
    | "AttackDelta"
    | "AttackAddedRatio"
    | "PhysicalAddedRatio"
    | "QuantumAddedRatio"
    | "ImaginaryAddedRatio"
    | "WindAddedRatio"
    | "ThunderAddedRatio"
    | "IceAddedRatio"
    | "FireAddedRatio"
    | "SPRatioBase"
    | "StatusProbabilityBase"
    | "CriticalChanceBase"
    | "CriticalDamageBase"
    | "StatusResistanceBase"
    | "BreakDamageAddedRatioBase"
    | "HealRatioBase"
    | "SpeedDelta";
  value: number;
  importance: number;
};

type Data = {
  buildName: string;
  buildDesc: string;
  lightCones: LightCone[];
  relics_set: RelicsSet[];
  ornaments_set: RelicsSet[];
  main_stats: MainStats[];
  recommended_stats: RecommendedStats[];
  recommended_comment: string;
  total_coef: number;
};

type CharacterType = {
  id: string;
  name: string;
  preview: string;
  portrait: string;
  path: string;
  element: string;
  rarity: string;
  data: Data[];
  pionner?: boolean;
  updatedAt: Date;
};

export type {
  CharacterType,
  Data,
  RecommendedStats,
  MainStats,
  RelicsSet,
  LightCone,
};
