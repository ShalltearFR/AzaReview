import { Document } from "mongoose";

interface RelicProc {
  HPAddedRatio?: number;
  HPDelta?: number;
  AttackDelta?: number;
  AttackAddedRatio?: number;
  DefenceDelta?: number;
  DefenceAddedRatio?: number;
  SPRatioBase?: number;
  StatusProbabilityBase?: number;
  CriticalChanceBase?: number;
  StatusResistanceBase?: number;
  BreakDamageAddedRatioBase?: number;
  SpeedDelta?: number;
  energy?: number;
  PhysicalAddedRatio?: number;
  QuantumAddedRatio?: number;
  ImaginaryAddedRatio?: number;
  WindAddedRatio?: number;
  ThunderAddedRatio?: number;
  IceAddedRatio?: number;
  FireAddedRatio?: number;
}

// Interface pour les propriétés finales du personnage
interface Properties {
  hp: number;
  atk: number;
  def: number;
  spd: number;
  crit_rate: number;
  crit_dmg: number;
  break_dmg: number;
  effect_hit: number;
  effect_res: number;
  energy: number;
}

// Interface pour les données d'un personnage
interface IData {
  uid: string;
  ranks: number;
  lightCones: string;
  relics_sets: string[];
  totalProcs: number;
  relicsProcs: RelicProc[];
  properties: Properties;
}

// Interface pour le schéma de caractère
interface CharacterStats extends Document {
  id: string;
  data: IData[];
  error?: boolean;
}

// Interface pour le schéma de caractère
interface CharacterStatWithoutDoc {
  id: string;
  data: IData[];
}

export type { CharacterStats, CharacterStatWithoutDoc, RelicProc };
