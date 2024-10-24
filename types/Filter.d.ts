interface RarityProps {
  star4: boolean;
  star5: boolean;
}

interface ElementProps {
  Fire: boolean;
  Ice: boolean;
  Imaginary: boolean;
  Physical: boolean;
  Quantum: boolean;
  Thunder: boolean;
  Wind: boolean;
}

interface PathProps {
  Knight: boolean;
  Mage: boolean;
  Priest: boolean;
  Rogue: boolean;
  Shaman: boolean;
  Warlock: boolean;
  Warrior: boolean;
}

interface FilterListProps {
  rarity: RarityProps;
  element: ElementProps;
  path: PathProps;
}

export type { FilterListProps };
