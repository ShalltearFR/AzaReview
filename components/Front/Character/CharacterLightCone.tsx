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
  const [isTooltipRecommendedVisible, setIsTooltipRecommendedVisible] =
    useState(false);

  useEffect(() => {
    const verifMainStat = () => {
      if (review) {
        if (lightCone) {
          const isGood = review.filter((el) => el.id === lightCone.id) || false;
          if (isGood.length > 0) setIsGoodLightCone(true);
          else setIsGoodLightCone(false);
        }

        const recommendedObject = review.filter((el) => el.recommended) || [];
        const recommendedTranslate = recommendedObject.map((el) => {
          const toTranslate = lightconeTranslate.find(
            (translate) => translate.id === el.id
          );
          return toTranslate;
        });
        setRecommendedLightCone(recommendedTranslate || [{ name: "" }]);
      } else {
        setIsGoodLightCone(true);
      }
    };
    verifMainStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" w-full xl:min-w-60 xl:max-w-80 xl:w-auto rounded-t-3xl bg-light-blue/75 mx-auto p-3 mt-5">
      <div className="relative">
        <div
          className={`absolute z-10 px-3 py-1 rounded-full font-bold right-0 ${
            isGoodLightCone ? "bg-gray" : "bg-red"
          }`}
          onMouseEnter={() => setIsTooltipRecommendedVisible(true)}
          onMouseLeave={() => setIsTooltipRecommendedVisible(false)}
        >
          !
          {isTooltipRecommendedVisible &&
            recommendedLightCone &&
            recommendedLightCone[0] && (
              <div
                className={`absolute z-20 p-2 bg-background rounded-xl w-60 right-0 xl:right-auto xl:left-8 top-8 text-white text-sm ${
                  recommendedLightCone[1] ? "xl:-top-[196px]" : "xl:-top-[98px]"
                }`}
              >
                <div>
                  <p className="font-bold">F2P recommandé :</p>
                  <p className="italic font-normal ml-1">
                    {recommendedLightCone[0].name}
                  </p>
                  <img
                    src={`${CDN}/${recommendedLightCone[0].portrait}`}
                    className="w-1/2 mx-auto"
                  />
                </div>
                {recommendedLightCone[1] && (
                  <div className="mt-5">
                    <p className="font-bold">Alternative :</p>
                    <p className="italic font-normal ml-1">
                      {recommendedLightCone[1].name}
                    </p>
                    <img
                      src={`${CDN}/${recommendedLightCone[1].portrait}`}
                      className="w-1/2 mx-auto"
                    />
                  </div>
                )}
              </div>
            )}
        </div>
        <p className="text-yellow text-lg font-bold text-center">
          Cône de lumière
        </p>
      </div>
      {lightCone ? (
        <div>
          <div
            className="relative flex flex-col w-40 h-40 mx-auto mt-2 text-white"
            style={{
              backgroundImage: `url("${CDN}/${lightCone.icon}")`,
              backgroundSize: "contain",
            }}
          >
            <p
              className={`flex justify-center items-center p-1 rounded-full text-sm font-bold ml-auto mt-3 ${
                lightCone.level < 80 ? "text-red bg-background" : " bg-orange2"
              }`}
            >
              Niv. {lightCone.level}
            </p>
            <p className="flex justify-center items-center w-6 p-1 rounded-full bg-brown text-sm font-bold mt-auto mb-8 ml-2">
              S{lightCone.rank}
            </p>
          </div>
          <p
            className={`text-center px-2 font-bold ${
              !isGoodLightCone ? "text-red" : "text-white"
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
