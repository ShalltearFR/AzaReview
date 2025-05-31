import { CharacterType } from "@/types/CharacterModel";

interface PioneerTypeProps {
  id: string;
  name: string;
  preview: string;
}

const PioneerType: PioneerTypeProps[] = [
  {
    id: "8001",
    name: "MC Destruction",
    preview: "img/guides/preview/8001.png",
  },
  {
    id: "8003",
    name: "MC Preservation",
    preview: "img/guides/preview/8003.png",
  },
  {
    id: "8005",
    name: "MC Harmonie",
    preview: "img/guides/preview/8005.png",
  },
  {
    id: "8007",
    name: "MC Souvenir",
    preview: "img/guides/preview/8007.png",
  },
];

const PioneerToADD: string[] = ["8001", "8003", "8005", "8007"];
const PioneerToRemove: string[] = ["8002", "8004", "8006", "8008"];

const findPioneer = (id: string): string | undefined => {
  const pioneer = PioneerType.find((item) => item.id === id);
  return pioneer ? pioneer.name : undefined;
};

const replaceCharacterName = async (
  character: CharacterType
): Promise<string | undefined> => {
  if (PioneerToADD.includes(character.id)) {
    return findPioneer(character.id);
  }

  return character.name;
};

const replacePioneersName = async (
  charactersList: CharacterType[]
): Promise<CharacterType[]> => {
  return charactersList.map((character) => {
    const pioneerName = findPioneer(character.id);
    if (pioneerName) {
      const pioneer = PioneerType.find((item) => item.id === character.id);
      if (pioneer) {
        return {
          ...character,
          name: pioneerName,
          preview: pioneer.preview,
          pionneer: true,
        };
      }
    }
    return character;
  });
};

export {
  PioneerType,
  PioneerToRemove,
  PioneerToADD,
  replacePioneersName,
  replaceCharacterName,
};
export type { PioneerTypeProps };
