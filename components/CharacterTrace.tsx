import CDN from "@/utils/cdn";

interface CharacterTraceProps {
  type: string;
  level: number;
  img: string;
  key: string;
  name: string;
}

const CharacterTrace: React.FC<CharacterTraceProps> = ({
  level,
  img,
  type,
  key,
  name,
}) => {
  return (
    <div key={key} className="flex flex-col w-24 h-24 relative" title={name}>
      <div className="absolute w-[85px] h-[85px] top-1 left-1 rounded-full bg-black border border-gray">
        <img src={`${CDN}/${img}`} />
      </div>
      <span className="z-10 bg-light-gray rounded-full text-center text-sm font-bold">
        {type}
      </span>
      <span className="flex mt-auto z-10 bg-light-gray w-9 h-9 justify-center items-center rounded-full text-lg font-bold">
        {level}
      </span>
    </div>
  );
};

export default CharacterTrace;
