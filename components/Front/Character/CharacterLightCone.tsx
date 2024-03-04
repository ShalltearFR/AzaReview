import { jsonUID } from "@/types/jsonUid";
import CharacterSplash from "./CharacterSplash";
import CharacterTrace from "./CharacterTrace";
import { CDN } from "@/utils/cdn";
import { LightCone } from "@/types/CharacterModel";
import { useEffect, useState } from "react";

interface lightCone {
  id: string;
  name: string;
  rank: number;
  level: number;
  icon: string;
}

interface CharacterLightConeProps {
  lightCone: lightCone;
  review: LightCone[];
  lightconeTranslate: Array<any>;
}

const CharacterLightCone: React.FC<CharacterLightConeProps> = ({
  lightCone,
  review,
  lightconeTranslate,
}) => {
  const [isGoodLightCone, setIsGoodLightCone] = useState<Boolean>(true);
  const [recommendedLightCone, setRecommendedLightCone] = useState<any>();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    const verifMainStat = () => {
      if (review) {
        const isGood = review.filter((el) => el.id === lightCone.id) || [];

        if (isGood[0].id) {
          setIsGoodLightCone(true);
          return null;
        }

        const recommendedObject = review.filter((el) => el.recommended) || [];
        const recommendedTranslate = lightconeTranslate.filter(
          (el) => el.id === recommendedObject[0].id
        );
        setRecommendedLightCone(recommendedTranslate[0]);
      }
    };
    verifMainStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review]);

  return (
    <div className=" w-full xl:w-auto rounded-t-3xl bg-light-blue/75 mx-auto p-3 mt-5">
      <p className="text-yellow text-lg font-bold text-center">
        Cône de lumière
      </p>
      {lightCone ? (
        <div
          className="relative"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          {isTooltipVisible && !isGoodLightCone && (
            <div className="absolute z-10 p-2 bg-background rounded-xl w-auto text-white">
              <div className="font-bold">Recommandé :</div>

              <div className="italic font-normal">
                {recommendedLightCone.name}
              </div>
            </div>
          )}
          <div
            className="flex flex-col w-40 h-40 mx-auto mt-2 text-white"
            style={{
              backgroundImage: `url("${CDN}/${lightCone.icon}")`,
              backgroundSize: "contain",
            }}
          >
            <p className="flex justify-center items-center p-1 rounded-full bg-orange2 text-sm font-bold ml-auto mt-3">
              Niv. {lightCone.level}
            </p>
            <p className="flex justify-center items-center w-6 p-1 rounded-full bg-brown text-sm font-bold mt-auto mb-8 ml-2">
              S{lightCone.rank}
            </p>
          </div>
          <p
            className={`text-center px-2 font-bold ${
              !isGoodLightCone ? " text-red" : "text-white"
            }`}
          >
            {lightCone.name}
          </p>
        </div>
      ) : (
        <p className="text-center text-red mt-2 px-2 font-bold">
          {"Aucun cône equipé"}
        </p>
      )}
    </div>
  );
};

export default CharacterLightCone;
