import { CharacterType } from "@/types/CharacterModel";
import { CDN } from "./cdn";

interface PioneerTypeProps {
  id: string;
  nameFR: string;
  nameEN: string;
  preview: string;
}

const getCharacterEN = async (): Promise<CharacterType[]> => {
  const data = await fetch(`${CDN}/index_min/en/characters.json`, {
    next: { revalidate: 18000 },
  });
  return Object.values(await data.json()) as CharacterType[];
};

const PioneerType: PioneerTypeProps[] = [
  {
    id: "8001",
    nameFR: "MC Destruction",
    nameEN: "MC Destruction",
    preview: "img/guides/preview/8001.png",
  },
  {
    id: "8003",
    nameFR: "MC Preservation",
    nameEN: "MC Preservation",
    preview: "img/guides/preview/8003.png",
  },
  {
    id: "8005",
    nameFR: "MC Harmonie",
    nameEN: "MC Harmony",
    preview: "img/guides/preview/8005.png",
  },
];

const PioneerToADD: string[] = ["8001", "8003", "8005"];
const PioneerToRemove: string[] = ["8002", "8004", "8006"];

const findPioneer = (id: string, lang: string): string | undefined => {
  const pioneer = PioneerType.find((item) => item.id === id);
  return pioneer
    ? lang === "en"
      ? pioneer.nameEN
      : pioneer.nameFR
    : undefined;
};

const replaceCharacterName = async (
  lang: string | undefined,
  character: CharacterType
): Promise<string | undefined> => {
  if (PioneerToADD.includes(character.id)) {
    return findPioneer(character.id, lang || "fr");
  }
  if (lang === "en") {
    const CharacterEN = await getCharacterEN();
    const characterObject = CharacterEN.find(
      (char) => char.id === character.id
    );
    return characterObject?.name;
  }
  return character.name;
};

const replacePioneersName = async (
  lang: string | undefined,
  charactersList: CharacterType[]
): Promise<CharacterType[]> => {
  const CharacterEN = lang === "en" ? await getCharacterEN() : [];
  return charactersList.map((character) => {
    const pioneerName = findPioneer(character.id, lang || "fr");
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
    if (lang === "en") {
      const characterObject = CharacterEN.find(
        (char) => char.id === character.id
      );
      return {
        ...character,
        name: characterObject?.name || character.name,
        preview: character.preview,
      };
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
