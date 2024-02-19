import CDN from "@/utils/cdn";
import { RelicSet } from "@/utils/jsonUid";

interface CharacterRelicsSetProps {
  relics: RelicSet[];
}

const CharacterRelicsSet: React.FC<CharacterRelicsSetProps> = ({ relics }) => {
  // Utilisez une assertion ('as') pour indiquer à TypeScript que l'accumulateur aura la clé spécifiée
  const processedRelicSets = relics.reduce((accumulator, relicSet) => {
    accumulator[relicSet.id] = relicSet;
    return accumulator;
  }, {} as Record<string, RelicSet>);

  const finalProcessedRelicSets = Object.values(processedRelicSets);
  console.log(finalProcessedRelicSets.length);

  return (
    <div className="text-white text-sm font-bold text-center mt-2">
      {finalProcessedRelicSets.length !== 0 ? (
        finalProcessedRelicSets.map((relic) => {
          return (
            <p key={crypto.randomUUID()}>
              {relic.num}P. - {relic.name}
            </p>
          );
        })
      ) : (
        <p>Pas de set équipé</p>
      )}
    </div>
  );
};

export default CharacterRelicsSet;
