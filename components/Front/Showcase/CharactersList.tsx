import { CharacterType } from "@/types/CharacterModel";
import { TranslateSection } from "@/types/homepageDictionnary";
import { PioneerToADD } from "@/utils/PioneerType";
import { CDN, CDN2 } from "@/utils/cdn";
import Link from "next/link";
import { Star } from "./StarIcon";
import { PathIcon } from "./PathIcon";
import { Icon } from "@/types/Icon";
import { ElementIcon } from "./ElementIcon";

interface GuidesProps {
  list: CharacterType[];
  lang: keyof TranslateSection | undefined;
}

const CharactersList: React.FC<GuidesProps> = ({ list }) => {
  console.log("list", list);
  return (
    <div className="flex flex-wrap gap-5 justify-center my-10">
      {list &&
        list.map((character) => (
          <Link
            href={`/guides/${character.id}`}
            key={character.id}
            className={`w-36 sm:w-52 bg-black/75 rounded-t-3xl relative hover:bg-black/50`}
          >
            <div className="absolute top-2 left-2 z-20">
              <ElementIcon type={character.element as Icon["Element"]} />
            </div>
            <div className="absolute top-2 right-2 z-20">
              <PathIcon type={character.path as Icon["Path"]} />
            </div>
            <div className="absolute flex bottom-10 w-full justify-center z-20">
              <Star number={character.rarity} />
            </div>
            <p className="absolute bottom-0 text-center text-white font-bold bg-black z-20 w-full h-10 flex items-center justify-center">
              {character.name}
            </p>
            <img
              className="absolute z-10"
              width={208}
              height={257}
              alt={character.name}
              src={
                PioneerToADD.includes(character.id)
                  ? `${CDN2}/${character.preview}`
                  : `${CDN}/${character.preview}`
              }
            />
            <div
              className={`absolute w-full h-full rounded-t-3xl ${
                character.rarity === "5" ? "bg-radial-5Star" : "bg-radial-4Star"
              }`}
            />
            <div className="w-[208px] h-[257px]" />
          </Link>
        ))}
    </div>
  );
};

export default CharactersList;
