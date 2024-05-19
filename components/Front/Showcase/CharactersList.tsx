import { CharacterType } from "@/types/CharacterModel";
import { PioneerToADD, PioneerType } from "@/utils/PioneerType";
import { CDN, CDN2 } from "@/utils/cdn";
import Link from "next/link";

interface GuidesProps {
  list: CharacterType[];
  lang: string | undefined;
}

const CharactersList: React.FC<GuidesProps> = ({ list }) => {
  return (
    <div className="flex flex-wrap gap-5 justify-center my-10">
      {list &&
        list.map((character) => (
          <Link
            href={`/guides/${character.id}`}
            key={character.id}
            className="w-36 sm:w-52 bg-black/75 rounded-3xl relative hover:bg-black/50"
          >
            <p className="absolute bottom-0 text-center text-white font-bold bg-black w-full h-10 flex items-center justify-center">
              {character.name}
            </p>
            <img
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
