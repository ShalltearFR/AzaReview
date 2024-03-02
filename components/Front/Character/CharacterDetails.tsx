"use client";
import { Character, jsonUID } from "@/types/jsonUid";
import CharacterSplash from "./CharacterSplash";
import CharacterTrace from "./CharacterTrace";
import CharacterLightCone from "./CharacterLightCone";
import CharacterStat from "./CharacterStat";
import RecommendedStat from "./RecommendedStat";
import CharacterRelicsSet from "./CharacterRelicsSet";
import CharacterRelic from "./CharacterRelic";
import { CDN2 } from "@/utils/cdn";
import { CharacterType, RecommendedStats } from "@/types/CharacterModel";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { randomUUID } from "crypto";
import { toPng } from "html-to-image";

interface ReviewData {
  data: CharacterType[];
}

interface CharacterDetailsProps {
  uidData: jsonUID;
  index: number;
  reviewData: ReviewData;
  statsTranslate: Array<any>;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  uidData,
  index,
  reviewData,
  statsTranslate,
}) => {
  const [characterBuild, setCharacterBuild] = useState<number>(0);
  const [review, setReview] = useState<any>();

  useEffect(() => {
    function sortReviewDataByUidData(reviewData: any, uidData: any) {
      const sortedArray = uidData.map((uidItem: any) => {
        const matchingItem = reviewData.find(
          (reviewItem: any) => reviewItem.id === uidItem.id
        );
        return matchingItem ? matchingItem : { value: "NC" };
      });

      return sortedArray;
    }
    const sortedReviewData = sortReviewDataByUidData(
      reviewData.data,
      uidData.characters
    );

    setReview(sortedReviewData);
    console.log("sortedReviewData", sortedReviewData);
  }, [reviewData, uidData]);

  const character = uidData.characters[index];

  if (!review) {
    return <div>Chargement...</div>;
  }

  if (review) {
    return (
      <article
        className="grid xl:grid-cols-3 w-full max-w-[1450px] xl:h-[870px] mx-auto xl:gap-x-5 py-5"
        style={{
          backgroundImage: `url('${CDN2}/img/character_bg.avif')`,
          backgroundRepeat: "repeat-y",
        }}
      >
        <div className="flex flex-col my-auto xl:ml-5 w-screen xl:w-full">
          <CharacterSplash character={character} />
          <div className="flex gap-x-3 justify-center">
            {["Attaque", "Compétence", "Ultime", "Talent"].map((type, i) => {
              return (
                <div key={`characterTrace${i}`}>
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

        <div className="flex flex-col justify-evenly gap-y-5 xl:gap-y-0 w-screen xl:w-full mt-5 xl:mt-0">
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
                <div key={`characterStat${i}`}>
                  <CharacterStat
                    attributes={character.attributes}
                    additions={character.additions}
                    field={field}
                    review={
                      review &&
                      review[index]?.data &&
                      review[index].data[characterBuild]?.recommended_stats
                        ? review[index].data[characterBuild].recommended_stats
                        : undefined
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full rounded-t-3xl bg-light-blue/75 mx-auto p-3">
            <p className="text-yellow text-lg font-bold text-center">
              Statistiques mini recommandées
            </p>
            {
              <RecommendedStat
                data={
                  review &&
                  review[index]?.data &&
                  review[index].data[characterBuild]?.recommended_stats
                    ? review[index].data[characterBuild].recommended_stats
                    : undefined
                }
              />
            }
          </div>

          <div className="w-full rounded-t-3xl bg-light-blue/75 mx-auto p-4">
            <p className="text-yellow text-lg font-bold text-center leading-4 mb-5">
              Sets equipés
            </p>
            <CharacterRelicsSet relics={character.relic_sets || "none"} />
          </div>
        </div>
        <div className="flex flex-col gap-3 my-auto pt-auto mx-auto mt-5 w-screen xl:w-full xl:my-auto">
          {character.relics.map((relic, i) => {
            return (
              <div key={crypto.randomUUID()} className="flex items-center">
                <CharacterRelic
                  stats={relic}
                  equipmentIndex={i}
                  statsTranslate={statsTranslate}
                  reviewRecommanded={
                    review &&
                    review[index]?.data &&
                    review[index].data[characterBuild]?.recommended_stats
                      ? review[index].data[characterBuild].recommended_stats
                      : undefined
                  }
                  reviewMainStat={
                    review &&
                    review[index]?.data &&
                    review[index].data[characterBuild]?.main_stats
                      ? review[index].data[characterBuild].main_stats
                      : undefined
                  }
                />
              </div>
            );
          })}
        </div>
      </article>
    );
  }
};

export default CharacterDetails;
