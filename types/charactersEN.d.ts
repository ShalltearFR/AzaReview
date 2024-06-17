interface CharacterBuild {
  name: string;
  desc: string;
  comment: string;
}

interface CharacterENProps {
  [key: number]: CharacterBuild[];
}

export type { CharacterBuild, CharacterENProps };
