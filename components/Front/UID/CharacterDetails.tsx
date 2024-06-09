"use client";
import { Character, Relic, jsonUID } from "@/types/jsonUid";
import CharacterSplash from "./CharacterSplash";
import CharacterTrace from "./CharacterTrace";
import CharacterLightCone from "./CharacterLightCone";
import CharacterStat from "./CharacterStat";
import RecommendedStat from "./RecommendedStat";
import CharacterRelicsSet from "./CharacterRelicsSet";
import CharacterRelic from "./CharacterRelic";
import { CDN2 } from "@/utils/cdn";
import { CharacterType, Data, RecommendedStats } from "@/types/CharacterModel";
import translateBBCode from "@/utils/translateBBCode";
import { useEffect, useState } from "react";
import { traces, UIDtitles } from "@/utils/dictionnary";
import type { TitlesByLanguage } from "@/utils/dictionnary";
import characterEN from "@/utils/charactersEN";

interface ReviewData {
  data: CharacterType[];
}

interface CharacterDetailsProps {
  uidData: jsonUID;
  index: number;
  buildIndex: number;
  reviewData: ReviewData;
  statsTranslate: Array<any>;
  relicsSetTranslate: Array<any>;
  lightconesTranslate: Array<any>;
  eidolonsList: Array<any>;
  lang: string | undefined;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  uidData,
  index,
  buildIndex = 0,
  reviewData,
  statsTranslate,
  relicsSetTranslate,
  lightconesTranslate,
  eidolonsList,
  lang,
}) => {
  const character = uidData.characters[index];
  // @ts-ignore
  const characterReview: Data[] = reviewData[index].data as Data;
  const [tracesNames, setTracesNames] = useState<Array<string>>([]);
  const [characterRelics, setCharacterRelics] = useState<Relic[] | []>([]);

  useEffect(() => {
    setTracesNames(traces[lang ?? "fr"]);
  }, [lang]);

  useEffect(() => {
    if (character.relics) {
      const characterRelicsFilter: Relic[] = { ...character }.relics.sort(
        (a, b) => a.type - b.type
      );
      setCharacterRelics(characterRelicsFilter);
    }
  }, [character, index]);

  const getMainStats = (piece: string) => {
    const result = characterReview[buildIndex]?.main_stats
      .filter((el) => el.piece === piece)
      .map((el, i) => {
        // statsTranslate
        const translated = statsTranslate.find((stat) => stat.type === el.type);
        return (
          <li
            className="ml-7"
            key={`${characterReview[buildIndex].buildName}+${i}+${piece}`}
          >
            {translated.name}
          </li>
        );
      });
    return <ul className="list-disc">{result}</ul>;
  };

  if (!reviewData) {
    return <div>Chargement...</div>;
  }

  if (reviewData) {
    return (
      <article
        className="grid xl:grid-cols-3 xl:h-[870px] xl:gap-x-5 py-4"
        style={{
          backgroundImage: `url('${CDN2}/img/character_bg.avif')`,
          backgroundSize: "100% auto",
          backgroundRepeat: "repeat-y",
        }}
      >
        <div className="flex flex-col xl:ml-5 w-screen xl:w-full">
          <CharacterSplash
            character={character}
            eidolonsList={eidolonsList}
            lang={lang}
          />
          <div className="flex gap-x-3 justify-center">
            {tracesNames.map((type, i) => {
              return (
                <div key={`CharacterTraces${i}+${index}+${buildIndex}`}>
                  <CharacterTrace
                    type={type}
                    img={`/${character.skills[i].icon}`}
                    level={character.skills[i].level}
                    name={character.skills[i].name}
                    desc={character.skills[i].desc}
                  />
                </div>
              );
            })}
          </div>
          <CharacterLightCone
            lightCone={character.light_cone}
            lightconeTranslate={lightconesTranslate}
            lang={lang}
            review={
              characterReview &&
              characterReview[buildIndex] &&
              characterReview[buildIndex]?.lightCones
            }
          />
        </div>

        <div className="flex flex-col justify-between gap-y-5 xl:gap-y-0 w-screen xl:w-full mt-5 xl:mt-0 py-[1px]">
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
                <div key={`CharacterStat${i}+${index}+${buildIndex}`}>
                  <CharacterStat
                    attributes={character.attributes}
                    additions={character.additions}
                    field={field}
                    lang={lang}
                    review={
                      characterReview &&
                      characterReview[buildIndex] &&
                      characterReview[buildIndex]?.recommended_stats
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full rounded-t-3xl bg-light-blue/75 mx-auto p-3">
            <p className="text-yellow text-lg font-bold text-center">
              {UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"].stat}
            </p>
            <RecommendedStat
              lang={lang}
              data={
                characterReview &&
                characterReview[buildIndex] &&
                characterReview[buildIndex]?.recommended_stats
              }
            />
            {/* Commentaire des stats mini */}
            {characterReview &&
              characterReview[buildIndex] &&
              characterReview[buildIndex].recommended_comment && (
                <div className="text-orange2 font-bold text-center mt-2 text-[15px]">
                  {characterReview[buildIndex] && lang === "en"
                    ? characterEN[(uidData as any).characters[index].id]
                      ? translateBBCode(
                          characterEN[(uidData as any).characters[index].id][
                            buildIndex
                          ].comment
                        )
                      : ""
                    : translateBBCode(
                        characterReview[buildIndex].recommended_comment ?? "",
                        true
                      )}
                </div>
              )}
          </div>

          <div className="w-full rounded-t-3xl bg-light-blue/75 mx-auto p-4">
            <CharacterRelicsSet
              relics={character.relic_sets || "none"}
              lang={lang}
              relicsSetTranslate={relicsSetTranslate}
              review={
                characterReview &&
                characterReview[buildIndex] &&
                characterReview[buildIndex]?.relics_set
              }
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
                    lang={lang}
                    totalCoef={
                      characterReview &&
                      characterReview[buildIndex] &&
                      characterReview[buildIndex].total_coef
                    }
                    reviewRecommanded={
                      characterReview &&
                      characterReview[buildIndex] &&
                      characterReview[buildIndex]?.recommended_stats
                        ? (characterReview[buildIndex]
                            .recommended_stats as RecommendedStats[])
                        : undefined
                    }
                    reviewMainStat={
                      characterReview &&
                      characterReview[buildIndex] &&
                      characterReview[buildIndex]?.main_stats
                        ? characterReview[buildIndex].main_stats
                        : undefined
                    }
                  />
                </div>
              );
            })
          ) : (
            <div className="mx-auto text-center bg-light-blue/75 p-5 rounded-t-3xl text-white font-bold">
              <p className="italic">
                {
                  UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"]
                    .NoCompletlyRelics1
                }
              </p>
              <p>
                {translateBBCode(
                  UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"]
                    .NoCompletlyRelics2,
                  true
                )}
              </p>
              {characterReview && characterReview[buildIndex]?.main_stats && (
                <div className="[&_div]:mt-5 mt-10 text-left [&_div]:text-orange">
                  <div>
                    {
                      UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"]
                        .RecommendedChests
                    }
                  </div>
                  {getMainStats("body")}

                  <div className="mt-5">
                    {
                      UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"]
                        .RecommendedBoots
                    }
                  </div>
                  {getMainStats("feet")}

                  <div>
                    {
                      UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"]
                        .RecommendedOrbs
                    }
                  </div>
                  {getMainStats("planar_sphere")}

                  <div>
                    {
                      UIDtitles[(lang as keyof TitlesByLanguage) ?? "fr"]
                        .RecommendedLinkRopes
                    }
                  </div>
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
