import { CharacterType } from "@/types/CharacterModel";
import { CDN } from "./cdn";

interface PioneerTypeProps {
  id: string;
  nameFR: string;
  nameEN: string;
}

const getCharacterEN = async () => {
  const data = await fetch(`${CDN}/index_min/en/characters.json`, {
    next: { revalidate: 18000 },
  });
  const jsonData = await data.json();
  const toArray = Object.values(jsonData).map((item) => item);
  return toArray;
};

const PioneerType: PioneerTypeProps[] = [
  {
    id: "8001",
    nameFR: "Caelius Destruction",
    nameEN: "Caelius Destruction",
  },
  {
    id: "8003",
    nameFR: "Caelius Preservation",
    nameEN: "Caelius Preservation",
  },
  {
    id: "8005",
    nameFR: "Caelius Harmonie",
    nameEN: "Caelius Harmony",
  },
];

const PioneerToADD: Array<String> = ["8001", "8003", "8005"];
const PioneerToRemove: Array<String> = ["8002", "8004", "8006"];

const replaceCharacterName = async (
  lang: string | undefined,
  character: CharacterType
) => {
  if (PioneerToADD.includes(character.id)) {
    if (lang === "en")
      return PioneerType.find((item) => item.id === character.id)?.nameEN;
    return PioneerType.find((item) => item.id === character.id)?.nameFR;
  }

  if (lang === "en") {
    const CharacterEN = await getCharacterEN();
    const characterObject: any = CharacterEN.find(
      (char: any) => char.id === character.id
    );
    return characterObject.name;
  }
  return character.name;
};

const replacePioneersName = async (
  lang: string | undefined,
  charactersList: CharacterType[]
) => {
  if (lang === "en") {
    const CharacterEN = await getCharacterEN();
    const filteredCharactersCopy = [...charactersList].map((character) => {
      if (character.id === "8001")
        return {
          ...character,
          name: "Caelius Destruction",
        };
      if (character.id === "8003")
        return {
          ...character,
          name: "Caelius Preservation",
        };
      if (character.id === "8005")
        return {
          ...character,
          name: "Caelius Harmony",
        };

      const characterObject: any = CharacterEN.find(
        (char: any) => char.id === character.id
      );

      return {
        ...character,
        name: characterObject.name,
      };
    });
    return filteredCharactersCopy;
  } else {
    const filteredCharactersCopy = [...charactersList].map((character) => {
      if (character.id === "8001")
        return {
          ...character,
          name: "Caelius Destruction",
        };
      if (character.id === "8003")
        return {
          ...character,
          name: "Caelius Preservation",
        };
      if (character.id === "8005")
        return {
          ...character,
          name: "Caelius Harmonie",
        };
      return character;
    });
    return filteredCharactersCopy;
  }
};

export {
  PioneerType,
  PioneerToRemove,
  replacePioneersName,
  replaceCharacterName,
};
export type { PioneerTypeProps };
