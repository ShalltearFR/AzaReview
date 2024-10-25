import dbConnect from "@/lib/dbConnect";
import CharacterStats from "@/models/CharacterStats.model";
import { CharacterMerged, Properties } from "@/types/CharacterMerged";
import { Character as CharacterType, RelicSet } from "@/types/jsonUid";

const shareCharactersStats = async (data: CharacterType, uid: string) => {
  try {
    await dbConnect();
    const dataCopy = { ...data } as CharacterType;
    CharacterStats.find({ id: dataCopy.id }).then((dataDB) => {
      console.log("data CharacterStats", dataDB);

      if (dataDB.length === 0) {
        CharacterStats.create({
          id: dataCopy.id,
        }).then(() => console.log("CharacterStats créée"));
      }

      const mergedValues: Properties = mergeAttributesAndAdditions(
        dataCopy.attributes,
        dataCopy.additions
      );
      console.log("mergedValues", mergedValues);

      // Gestion de relic_sets : filtrer les id dupliqués avec num = 2, sinon garder tout
      const relicSetsMerged = dataCopy.relic_sets
        .filter((relic, index, self) => {
          const hasDuplicate = self.some(
            (r) => r.id === relic.id && r.num !== relic.num
          );
          // On garde les objets avec num != 2 s'il y a un doublon, sinon on garde tout
          return !(hasDuplicate && relic.num === 2);
        })
        .map((relic) => `${relic.id}_${relic.num}`);

      console.log("relicSetsMerged", relicSetsMerged);

      const energyMerged = dataCopy.additions.find(
        (add) => add.field === "sp_rate"
      );

      const newData: CharacterMerged = {
        uid: uid,
        ranks: dataCopy.rank.toString(),
        lightCones: dataCopy.light_cone.id,
        relics_sets: relicSetsMerged,
        properties: {
          hp: Number(mergedValues.hp),
          atk: Number(mergedValues.atk),
          def: Number(mergedValues.def),
          spd: Number(mergedValues.spd),
          crit_rate: Number(mergedValues.crit_rate) * 100,
          crit_dmg: Number(mergedValues.crit_dmg) * 100,
          break_effect: mergedValues?.break_effect ?? 0 * 100,
          effect_hit: Number(mergedValues.effect_hit ?? 0) * 100,
          effect_res: Number(mergedValues.effect_res ?? 0) * 100,
          energy:
            energyMerged?.value !== undefined ? energyMerged.value * 100 : 0,
        },
      };

      console.log("newData", newData);

      //CharacterStats.findOneAndUpdate({ uid: uid }).then(() => console.log("Personnage mis à jour"));
    });
  } catch (error) {
    console.error("Error de recuperation d'infos de personnages :", error);
  }
};

const mergeAttributesAndAdditions = (attributes: any[], additions: any[]) => {
  const merged: any = {};

  attributes.forEach((attr) => {
    merged[attr.field] = attr.value;
  });

  additions.forEach((add) => {
    if (merged[add.field] !== undefined) {
      merged[add.field] = Number(merged[add.field] + add.value).toFixed(4);
    } else {
      merged[add.field] = Number(add.value).toFixed(4);
    }
  });

  return merged as Properties;
};

export default shareCharactersStats;
