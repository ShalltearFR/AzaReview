import { jsonUID } from "@/types/jsonUid";
import CharacterSplash from "./CharacterSplash";
import CharacterTrace from "./CharacterTrace";
import { CDN } from "@/utils/cdn";

interface lightCone {
  name: string;
  rank: number;
  level: number;
  icon: string;
}

interface CharacterLightConeProps {
  lightCone: lightCone;
}

const CharacterLightCone: React.FC<CharacterLightConeProps> = ({
  lightCone,
}) => {
  return (
    <div className=" w-full xl:w-auto rounded-t-3xl bg-light-blue/75 mx-auto p-3 mt-5">
      <p className="text-yellow text-lg font-bold text-center">
        Cône de lumière
      </p>
      {lightCone ? (
        <div>
          <div
            className="flex flex-col w-40 h-40 mx-auto mt-2"
            style={{
              backgroundImage: `url("${CDN}/${lightCone.icon}")`,
              backgroundSize: "contain",
            }}
          >
            <p className="flex justify-center items-center p-1 rounded-full bg-orange2 text-white text-sm font-bold ml-auto mt-3">
              Niv. {lightCone.level}
            </p>
            <p className="flex justify-center items-center w-6 p-1 rounded-full bg-brown text-white text-sm font-bold mt-auto mb-8 ml-2">
              S{lightCone.rank}
            </p>
          </div>
          <p className="text-center text-white px-2 font-bold">
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
