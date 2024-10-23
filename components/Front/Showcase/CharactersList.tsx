import { CharacterType } from "@/types/CharacterModel";
import { TranslateSection } from "@/types/homepageDictionnary";
import { PioneerToADD } from "@/utils/PioneerType";
import { CDN, CDN2 } from "@/utils/cdn";
import Link from "next/link";
import { Star } from "./StarIcon";
import { PathIcon } from "./PathIcon";
import { PathType } from "@/types/path";

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
            className="w-36 sm:w-52 bg-black/75 rounded-3xl relative hover:bg-black/50"
          >
            <div className="absolute top-0 left-0">
              <PathIcon type={character.path as PathType["type"]} />
            </div>
            <div className="absolute top-5 right-0">
              <Star number={character.rarity} />
            </div>
            <p className="absolute bottom-0 text-center text-white font-bold bg-black w-full h-10 flex items-center justify-center">
              {character.name}
            </p>
            <img
              width={208}
              height={257}
              alt={character.name}
              src={
                PioneerToADD.includes(character.id)
                  ? `${CDN2}/${character.preview}`
                  : `${CDN}/${character.preview}`
              }
            />
          </Link>
        ))}
    </div>
  );
};

export default CharactersList;
