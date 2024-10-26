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

interface CharacterMerged {
  ranks: string;
  lightCones: string;
  relics_sets: string[];
  properties: Properties;
}

export type { Properties, CharacterMerged };
