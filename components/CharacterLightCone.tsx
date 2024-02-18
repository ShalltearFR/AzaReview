import { jsonUID } from "@/utils/jsonUid";
import CharacterSplash from "./CharacterSplash";
import CharacterTrace from "./CharacterTrace";
import CDN from "@/utils/cdn";

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
    <div className="w-52 rounded-t-3xl bg-light-blue/75 mx-auto pb-3">
      <p className="text-yellow text-lg font-bold text-center">
        Cône de lumière
      </p>
      <div
        className="flex flex-col w-32 h-32 mx-auto"
        style={{ backgroundImage: `url("${CDN}/${lightCone.icon}")` }}
      >
        <p className="flex justify-center items-center w-12 h-6 rounded-full bg-orange2 text-white text-xs font-bold ml-auto">
          Niv. {lightCone.level}
        </p>
        <p className="flex justify-center items-center mt-auto mb-5 w-6 h-6 rounded-full bg-brown text-white text-xs font-bold">
          S{lightCone.rank}
        </p>
      </div>
      <p className="text-center text-white px-2 font-bold">{lightCone.name}</p>
    </div>
  );
};

export default CharacterLightCone;
