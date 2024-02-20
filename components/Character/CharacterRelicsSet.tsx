import { CDN } from "@/utils/cdn";
import { RelicSet } from "@/utils/jsonUid";

interface CharacterRelicsSetProps {
  relics: RelicSet[];
}

const CharacterRelicsSet: React.FC<CharacterRelicsSetProps> = ({ relics }) => {
  const processedRelicSets = relics.reduce((accumulator, relicSet) => {
    accumulator[relicSet.id] = relicSet;
    return accumulator;
  }, {} as Record<string, RelicSet>);

  const finalProcessedRelicSets = Object.values(processedRelicSets);

  return (
    <div
      className={`flex text-white text-sm font-bold text-center justify-center mt-2 gap-[15px]`}
    >
      {finalProcessedRelicSets.length !== 0 ? (
        finalProcessedRelicSets.map((relic) => {
          return (
            <div className="relative w-[135px]" key={crypto.randomUUID()}>
              <img src={`${CDN}/${relic.icon}`} />
              <span className="absolute top-0 left-0 p-1 bg-gray rounded-full">
                {relic.num}P
              </span>
              <span className="absolute bottom-0 left-0 p-1 w-full bg-gray/75 rounded-full text-xs">
                {relic.name}
              </span>
            </div>
          );
        })
      ) : (
        <p>Pas de set équipé</p>
      )}
    </div>
  );
};

export default CharacterRelicsSet;
