"use client";
import { Relic, jsonUID } from "@/types/jsonUid";
import CharacterSplash from "./CharacterSplash";
import CharacterTrace from "./CharacterTrace";
import CharacterLightCone from "./CharacterLightCone";
import CharacterStat from "./CharacterStat";
import RecommendedStat from "./RecommendedStat";
import CharacterRelicsSet from "./CharacterRelicsSet";
import CharacterRelic from "./CharacterRelic";
import { CDN2 } from "@/utils/cdn";
import { CharacterType, Data, RecommendedStats } from "@/types/CharacterModel";
import { useEffect, useState } from "react";
import { UserOptionsProps } from "@/types/UserOptions";
import LoadingSpin from "@/components/LoadingSpin";
import CharacterEidolon from "./CharacterEidolon";

interface ReviewData {
  data: CharacterType[];
}

interface CharacterDetailsProps {
  uidData: jsonUID;
  index: number;
  buildIndex: number;
  reviewData: ReviewData[];
  statsTranslate: Array<any>;
  relicsSetTranslate: Array<any>;
  lightconesTranslate: Array<any>;
  eidolonsList: Array<any>;
  userOptions: UserOptionsProps;
}

const isValidImage = (url: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // L'image est valide
    img.onerror = () => resolve(false); // L'image n'est pas valide
    img.src = url; // Déclenche le chargement de l'image
  });
};

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  uidData,
  index,
  buildIndex = 0,
  reviewData,
  statsTranslate,
  relicsSetTranslate,
  lightconesTranslate,
  eidolonsList,
  userOptions,
}) => {
  const [characterRelics, setCharacterRelics] = useState<Relic[] | []>([]);
  const [imageBG, setImageBG] = useState<string>("");

  const character = uidData.characters[index];
  const characterReview: Data =
    (reviewData[index]?.data &&
      (reviewData[index]?.data[buildIndex] as unknown as Data)) ||
    [];

  useEffect(() => {
    const url = userOptions.imageBG;
    isValidImage(url).then((isValid) => {
      if (isValid) setImageBG(url);
      if (!isValid) setImageBG(`${CDN2}/img/character_bg.avif`);
    });
  }, [userOptions.imageBG]);

  useEffect(() => {
    if (character.relics) {
      const characterRelicsFilter: Relic[] = { ...character }.relics.sort(
        (a, b) => a.type - b.type
      );
      setCharacterRelics(characterRelicsFilter);
    }
  }, [character, index]);

  const getMainStats = (piece: string) => {
    const result = characterReview?.main_stats
      .filter((el) => el.piece === piece)
      .map((el, i) => {
        const translated = statsTranslate.find((stat) => stat.type === el.type);
        return (
          <li
            className="ml-7"
            key={`${characterReview?.buildName}+${i}+${piece}+${character.id}`}
          >
            {translated.name}
          </li>
        );
      });
    return <ul className="list-disc">{result}</ul>;
  };

  if (!reviewData) {
    return (
      <div className="flex justify-center mt-10">
        <LoadingSpin width="w-10" height="h-10" />
      </div>
    );
  }

  if (reviewData) {
    return (
      <article
        className="grid xl:h-[870px] xl:gap-x-5 py-4 xl:grid-cols-3"
        style={{
          backgroundImage: `url('${imageBG}')`,
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
        }}
      >
        <div className="flex flex-col xl:ml-5 w-screen xl:w-full">
          <div className="relative">
            <CharacterSplash character={character} />
            <div className=" absolute bottom-0 w-full">
              <div className="flex mt-auto w-full h-20 items-center justify-center gap-2">
                {character.rank_icons.map((eidolon, i) => {
                  const eidolonId = eidolonsList.find(
                    (el) => el.id === `${character.id}0${i + 1}`
                  );

                  return (
                    <div key={`${character.id}+${i}`}>
                      <CharacterEidolon
                        img={eidolon}
                        isActive={character.rank > i ? true : false}
                        eidolon={eidolonId}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-x-3 justify-center">
                {["Attaque", "Compétence", "Ultime", "Talent"].map(
                  (type, i) => {
                    return (
                      <div
                        key={`CharacterTraces${i}+${index}+${buildIndex}+${character.id}`}
                      >
                        <CharacterTrace
                          characterID={character.id}
                          id={character.skills[i].id}
                          type={type}
                          img={`/${character.skills[i].icon}`}
                          level={character.skills[i].level}
                          name={character.skills[i].name}
                          desc={character.skills[i].desc}
                        />
                      </div>
                    );
                  }
                )}
              </div>
              <div className="flex gap-x-3 mt-5 justify-center">
                {character.path.id === "Memory" &&
                  (() => {
                    // AJOUTE LES 2 TRACES LIÉES À LA VOIE DU SOUVENIR
                    const skills = character.skills;
                    const remembranceTraces = [
                      skills[skills.length - 4],
                      skills[skills.length - 3],
                    ];
                    remembranceTraces[0].type_text = "Compétence";
                    remembranceTraces[1].type_text = "Talent";

                    return remembranceTraces.map((skill, i) => (
                      <div
                        key={`CharacterTracesRemembrance${i}+${index}+${buildIndex}+${character.id}`}
                      >
                        <CharacterTrace
                          characterID={character.id}
                          id={skill.id}
                          type={remembranceTraces[i].type_text}
                          img={`/${skill.icon}`}
                          level={skill.level}
                          name={skill.name}
                          desc={skill.desc}
                          remembrance
                        />
                      </div>
                    ));
                  })()}
              </div>
            </div>
            {/* </div> */}
          </div>
          <CharacterLightCone
            lightCone={character.light_cone}
            lightconeTranslate={lightconesTranslate}
            review={characterReview?.lightCones}
            showRedstats={userOptions.showRedstats}
            showInformations={userOptions.showInformations}
          />
        </div>

        <div
          className={`flex flex-col gap-y-5 xl:gap-y-0 w-screen xl:w-full mt-5 xl:mt-0 py-[1px] justify-evenly`}
        >
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
            ].map((field, i) => {
              return (
                <div
                  key={`CharacterStat${i}+${index}+${buildIndex}+${character.id}`}
                >
                  <CharacterStat
                    attributes={character.attributes}
                    additions={character.additions}
                    field={field}
                    review={characterReview?.recommended_stats}
                    showRedstats={userOptions.showRedstats}
                    properties={character.properties}
                  />
                </div>
              );
            })}
          </div>
          {userOptions.showRecommandedStats && (
            <div className="w-full rounded-t-3xl bg-light-blue/75 mx-auto p-3">
              <p className="text-yellow text-lg font-bold text-center">
                Statistiques recommandées
              </p>

              <RecommendedStat data={characterReview?.recommended_stats} />
            </div>
          )}

          <div className="w-full rounded-t-3xl bg-light-blue/75 mx-auto p-4">
            <CharacterRelicsSet
              characterid={character.id}
              relics={character.relic_sets || "none"}
              relicsSetTranslate={relicsSetTranslate}
              review={characterReview?.relics_set}
              showRedstats={userOptions.showRedstats}
              showInformations={userOptions.showInformations}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 my-auto pt-auto mx-auto mt-5 w-screen xl:w-full xl:my-auto">
          {characterRelics.length === 6 ? (
            characterRelics.map((relic, i) => {
              return (
                <div key={crypto.randomUUID()} className="flex items-center">
                  <CharacterRelic
                    stats={relic}
                    equipmentIndex={i}
                    statsTranslate={statsTranslate}
                    totalCoef={characterReview?.total_coef}
                    reviewRecommanded={
                      characterReview?.recommended_stats as RecommendedStats[]
                    }
                    reviewMainStat={characterReview?.main_stats}
                    showNotation={userOptions.showNotation}
                    showRelicProc={userOptions.showRelicProc}
                    showRedstats={userOptions.showRedstats}
                  />
                </div>
              );
            })
          ) : (
            <div className="mx-auto text-center bg-light-blue/75 p-5 rounded-t-3xl text-white font-bold">
              <p className="italic">Relique(s) ou Ornement(s) manquant(s)</p>
              <p>
                Veuillez équiper <span className="text-orange">6 pièces</span>{" "}
                pour aligner les Astres
              </p>
              {characterReview?.main_stats && (
                <div className="[&_div]:mt-5 mt-10 text-left [&_div]:text-orange">
                  <div>Torse recommandés :</div>
                  {getMainStats("body")}

                  <div className="mt-5">Bottes recommandées :</div>
                  {getMainStats("feet")}

                  <div>Orbe recommandées :</div>
                  {getMainStats("planar_sphere")}

                  <div>Corde recommandées :</div>
                  {getMainStats("link_rope")}
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    );
  }
};

export default CharacterDetails;
