import { jsonUID } from "@/utils/jsonUid";
import CharacterSplash from "./CharacterSplash";
import CharacterTrace from "./CharacterTrace";
import CDN from "@/utils/cdn";
import CharacterLightCone from "./CharacterLightCone";
import CharacterStat from "./CharacterStat";
import RecommandedStat from "../RecommandedStat";
import CharacterEquipedRelics from "./CharacterEquipedRelics";

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
      className="grid grid-cols-3 w-[1350px] h-[950px] mx-auto mt-14 gap-x-5"
      style={{ backgroundImage: "url('/img/character_bg.avif')" }}
    >
      <div className="flex flex-col my-auto ml-5 gap-5">
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

      <div className="flex flex-col gap-20 justify-center">
        <div className="bg-black/75 w-full rounded-3xl p-5">
          {[
            "hp",
            "atk",
            "def",
            "spd",
            "crit_rate",
            "crit_dmg",
            "break_dmg",
            "effect_hit",
            "effect_res",
            "sp_rate",
          ].map((type) => {
            return (
              <CharacterStat
                key={crypto.randomUUID()}
                attributes={character.attributes}
                additions={character.additions}
                type={type}
              />
            );
          })}
        </div>
        <div className="w-full rounded-t-3xl bg-light-blue/75 mx-auto p-3">
          <p className="text-yellow text-lg font-bold text-center">
            Statistiques recommandées
          </p>
          <RecommandedStat />
        </div>

        <div className="w-full rounded-t-3xl bg-light-blue/75 mx-auto p-3">
          <p className="text-yellow text-lg font-bold text-center">
            Sets equipés
          </p>
          <CharacterEquipedRelics relics={character.relic_sets || "none"} />
        </div>
      </div>
      <div></div>
    </article>
  );
};

export default CharacterDetails;
