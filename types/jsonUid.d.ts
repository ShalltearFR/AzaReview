interface SkillTree {
  id: string;
  level: number;
  anchor: string;
  max_level: number;
  icon: string;
  parent: string | null;
}

interface LightConeAttribute {
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface LightConeProperty {
  type: string;
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface LightCone {
  id: string;
  name: string;
  rarity: number;
  rank: number;
  level: number;
  promotion: number;
  icon: string;
  preview: string;
  portrait: string;
  path: {
    id: string;
    name: string;
    icon: string;
  };
  attributes: LightConeAttribute[];
  properties: LightConeProperty[];
}

interface RelicMainAffix {
  type: string;
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface RelicSubAffix {
  type: string;
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
  count: number;
  step: number;
}

interface Relic {
  id: string;
  name: string;
  set_id: string;
  set_name: string;
  rarity: number;
  level: number;
  icon: string;
  main_affix: RelicMainAffix;
  sub_affix: RelicSubAffix[];
}

interface RelicSetProperty {
  type: string;
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface RelicSet {
  id: string;
  name: string;
  icon: string;
  num: number;
  desc: string;
  properties: RelicSetProperty[];
}

interface Attribute {
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface Addition {
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface Property {
  type: string;
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface RankIcons {
  [index: number]: string;
}

interface Path {
  id: string;
  name: string;
  icon: string;
}

interface Element {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  max_level: number;
  element: Element;
  type: string;
  type_text: string;
  effect: string;
  effect_text: string;
  simple_desc: string;
  desc: string;
  icon: string;
}

interface Character {
  id: string;
  name: string;
  rarity: number;
  rank: number;
  level: number;
  promotion: number;
  icon: string;
  preview: string;
  portrait: string;
  rank_icons: string[];
  path: Path;
  element: Element;
  skills: Skill[];
  light_cone: LightCone;
  attributes: Attribute[];
  additions: Addition[];
  relic_sets: RelicSet[];
  relics: Relic[];
}

interface Avatar {
  id: string;
  name: string;
  icon: string;
}

interface MemoryData {
  level: number;
  chaos_id: number;
  chaos_level: number;
}

interface SpaceInfo {
  memory_data: MemoryData;
  universe_level: number;
  light_cone_count: number;
  avatar_count: number;
  achievement_count: number;
}

interface Player {
  uid: string;
  nickname: string;
  level: number;
  world_level: number;
  friend_count: number;
  avatar: Avatar;
  signature: string;
  is_display: boolean;
  space_info: SpaceInfo;
}

interface LightConeAttribute {
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface LightConeProperty {
  type: string;
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface LightConePath {
  id: string;
  name: string;
  icon: string;
}

interface LightCone {
  id: string;
  name: string;
  rarity: number;
  rank: number;
  level: number;
  promotion: number;
  icon: string;
  preview: string;
  portrait: string;
  path: LightConePath;
  attributes: LightConeAttribute[];
  properties: LightConeProperty[];
}

interface Attribute {
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface Addition {
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface RelicSet {
  id: string;
  name: string;
  icon: string;
  num: number;
  desc: string;
  properties: Property[];
}

interface SubAffix {
  type: string;
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
  count: number;
  step: number;
}

interface MainAffix {
  type: string;
  field: string;
  name: string;
  icon: string;
  value: number;
  display: string;
  percent: boolean;
}

interface Relic {
  id: string;
  name: string;
  set_id: string;
  set_name: string;
  rarity: number;
  level: number;
  icon: string;
  main_affix: MainAffix;
  sub_affix: SubAffix[];
}

interface jsonUID {
  status: number;
  player: Player;
  characters: Character[];
}

export type {
  jsonUID,
  Player,
  Character,
  LightCone,
  Attribute,
  Addition,
  RelicSet,
  Relic,
  RelicSubAffix,
};
