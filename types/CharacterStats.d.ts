interface Properties {
  hp: number[];
  atk: number[];
  def: number[];
  spd: number[];
  crit_rate: number[];
  crit_dmg: number[];
  break_effect: number[];
  effect_hit: number[];
  effect_res: number[];
  energy: number[];
}

interface CharacterStats {
  id: string;
  uid: string[];
  ranks: string[];
  lightCones: string[];
  relics_sets: string[];
  properties: Properties;
}

export type { CharacterStats };
