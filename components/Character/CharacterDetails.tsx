import { jsonUID } from "@/utils/jsonUid";
import CharacterSplash from "./CharacterSplash";
import CharacterTrace from "./CharacterTrace";
import CharacterLightCone from "./CharacterLightCone";
import CharacterStat from "./CharacterStat";
import RecommandedStat from "../RecommandedStat";
import CharacterRelicsSet from "./CharacterRelicsSet";
import CharacterRelic from "./CharacterRelic";

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
      className="grid xl:grid-cols-3  xl:h-[870px] mx-auto mt-[66px] xl:gap-x-5"
      style={{ backgroundImage: "url('/img/character_bg.avif')" }}
    >
      <div className="flex flex-col my-auto xl:ml-5 mb-5 xl:mb-0">
        <CharacterSplash character={character} />
        <div className="flex gap-x-3 justify-center">
          {["Attaque", "Compétence", "Ultime", "Talent"].map((type, i) => {
            return (
              <div key={crypto.randomUUID()}>
                <CharacterTrace
                  type={type}
                  img={`/${character.skills[i].icon}`}
                  level={character.skills[i].level}
                  name={character.skills[i].name}
                />
              </div>
            );
          })}
        </div>
        <CharacterLightCone lightCone={character.light_cone} />
      </div>

      <div className="flex flex-col justify-evenly gap-y-5 xl:gap-y-0">
        <div className="bg-black/75 w-full rounded-3xl p-5 ">
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
              <div key={crypto.randomUUID()}>
                <CharacterStat
                  key={crypto.randomUUID()}
                  attributes={character.attributes}
                  additions={character.additions}
                  type={type}
                />
              </div>
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
          <CharacterRelicsSet relics={character.relic_sets || "none"} />
        </div>
      </div>
      <div className="flex flex-col gap-3 my-auto mt-5 xl:mt-0">
        {character.relics.map((relic) => {
          return (
            <span key={crypto.randomUUID()} className="flex">
              <CharacterRelic stats={relic} />;
            </span>
          );
        })}
      </div>
    </article>
  );
};

export default CharacterDetails;
