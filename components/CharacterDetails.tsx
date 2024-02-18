import { jsonUID } from "@/utils/jsonUid";
import CharacterSplash from "./CharacterSplash";
import CharacterTrace from "./CharacterTrace";
import CDN from "@/utils/cdn";
import CharacterLightCone from "./CharacterLightCone";

interface CharacterDetailsProps {
  uidData: jsonUID;
  index: number;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  uidData,
  index,
}) => {
  const character = uidData.characters[index];
  return (
    <article
      className="grid grid-cols-3 w-[1350px] h-[950px] mx-auto mt-14"
      style={{ backgroundImage: "url('/img/character_bg.avif')" }}
    >
      <div className="flex flex-col gap-10 my-auto ml-5">
        <CharacterSplash character={character} />
        <div className="flex gap-2 justify-center">
          {["Attaque", "Compétence", "Ultime", "Talent"].map((type, i) => {
            return (
              <CharacterTrace
                key={crypto.randomUUID()}
                type={type}
                img={`/${character.skills[i].icon}`}
                level={character.skills[i].level}
                name={character.skills[i].name}
              />
            );
          })}
        </div>
        <CharacterLightCone lightCone={character.light_cone} />
      </div>

      <div></div>
      <div></div>
    </article>
  );
};

export default CharacterDetails;
