"use server";
import dbConnect from "@/lib/dbConnect";
import CharacterStats from "@/models/CharacterStats.model";
import { CharacterMerged, Properties } from "@/types/CharacterMerged";
import {
  CharacterStats as CharacterStatsType,
  CharacterStatWithoutDoc,
} from "@/types/CharacterStats";
import { Character as CharacterType } from "@/types/jsonUid";
import { removeIdsFromArrays } from "./format";

interface QueueItem {
  data: CharacterType;
  uid: string;
}

const queue: QueueItem[] = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || queue.length === 0) {
    return;
  }

  isProcessing = true;

  while (queue.length > 0) {
    const { data, uid } = queue.shift()!; // Récupérer le premier élément de la file
    await shareCharacterStats(data, uid);
  }

  isProcessing = false;
};

const shareCharactersStats = (data: CharacterType, uid: string) => {
  queue.push({ data, uid });
  processQueue();
};

const shareCharacterStats = async (data: CharacterType, uid: string) => {
  try {
    await dbConnect();
    const dataCopy = { ...data } as CharacterType;
    const DB = await CharacterStats.findOne({ id: dataCopy.id })
      .select("-__v -_id")
      .lean();

    const dataDB = DB !== null ? removeIdsFromArrays(DB) : null;

    if (!dataDB) {
      await CharacterStats.create({ id: dataCopy.id });
      return;
    }

    const mergedValues: Properties = mergeAttributesAndAdditions(
      dataCopy.attributes,
      dataCopy.additions
    );

    const relicSetsMerged =
      dataCopy.relic_sets
        .filter((relic, index, self) => {
          const hasDuplicate = self.some(
            (r) => r.id === relic.id && r.num !== relic.num
          );
          return !(hasDuplicate && relic.num === 2);
        })
        .map((relic) => {
          // Vérifie si l'ID de la relique est supérieur à 300
          if (Number(relic.id) > 300) {
            return relic.id; // Retourne simplement l'ID
          }
          // Sinon, retourne l'ID et le nombre au format `${relic.id}_${relic.num}`
          return `${relic.id}_${relic.num}`;
        }) ?? [];

    // Récupère l'énergie additionnelle
    const energyMerged = dataCopy.additions.find(
      (add) => add.field === "sp_rate"
    );

    // Recupere les procs de reliques qui ont une valeur > 0
    const relicsProcsArray = dataCopy.relics.map((relic) => {
      const subAffixArray = relic.sub_affix
        .map((subAffix) => {
          const count = subAffix.count - 1 > 0 && subAffix.count - 1;
          if (count)
            return {
              [subAffix.type]: count,
            };
        })
        .filter((subAffix) => subAffix !== undefined);
      const toObject = subAffixArray.reduce((acc, obj) => {
        return { ...acc, ...obj };
      }, {});

      return toObject;
    });

    const totalProcs = relicsProcsArray.reduce((acc, obj) => {
      const sum = Object.values(obj).reduce((sum, value) => sum + value, 0);
      return acc + sum;
    }, 0);

    const newData: CharacterMerged = {
      uid: uid,
      ranks: dataCopy.rank,
      lightCones: dataCopy.light_cone.id ?? "",
      relics_sets: relicSetsMerged ?? [],
      totalProcs: totalProcs ?? 0,
      relicsProcs: relicsProcsArray ?? [],
      properties: {
        hp: Number(Number(mergedValues.hp).toFixed(0)),
        atk: Number(Number(mergedValues.atk).toFixed(0)),
        def: Number(Number(mergedValues.def).toFixed(0)),
        spd: Number(Number(mergedValues.spd).toFixed(0)),
        crit_rate: Number(
          Number(Number(mergedValues.crit_rate) * 100).toFixed(1)
        ),
        crit_dmg: Number(
          Number(Number(mergedValues.crit_dmg) * 100).toFixed(1)
        ),
        break_dmg: Number(
          Number(Number(mergedValues.break_dmg ?? 0) * 100).toFixed(1)
        ),
        effect_hit: Number(
          Number(Number(mergedValues.effect_hit ?? 0) * 100).toFixed(1)
        ),
        effect_res: Number(
          Number(Number(mergedValues.effect_res ?? 0) * 100).toFixed(1)
        ),
        energy:
          energyMerged?.value !== undefined ? energyMerged.value * 100 : 0,
      },
    };

    const dataToPush: CharacterStatsType = JSON.parse(JSON.stringify(dataDB)); // Copie profonde de dataDB

    const uidExists = dataToPush.data.some((item: any) => item.uid === uid);
    if (uidExists) {
      const index = dataToPush.data.findIndex((item) => item.uid === uid);
      const updatedData = updateProperties(dataToPush, newData, index);

      if (
        JSON.stringify(updatedData.data[index].properties) !==
        JSON.stringify(dataDB.data[index].properties)
      ) {
        await CharacterStats.findOneAndUpdate(
          { id: dataCopy.id },
          { data: updatedData.data },
          { new: true }
        );
      }

      return;
    }
    addNewData(dataToPush, newData, uid);
    await CharacterStats.findOneAndUpdate(
      { id: dataCopy.id },
      { data: dataToPush.data },
      { new: true }
    );
  } catch (error) {
    console.error("Erreur de récupération d'infos de personnages :", error);
  }
};

function updateProperties(
  dataToPush: CharacterStatWithoutDoc,
  newData: CharacterMerged,
  index: number
): CharacterStatWithoutDoc {
  const updatedData = { ...dataToPush };

  updatedData.data[index] = {
    ...updatedData.data[index],
    lightCones: newData.lightCones,
    ranks: newData.ranks,
    relics_sets: newData.relics_sets,
    totalProcs: newData.totalProcs,
    relicsProcs: newData.relicsProcs,
    properties: { ...newData.properties },
  };

  return updatedData;
}

function addNewData(
  dataToPush: CharacterStatsType,
  newData: CharacterMerged,
  uid: string
) {
  const data = {
    uid: uid,
    ranks: newData.ranks,
    lightCones: newData.lightCones,
    relics_sets: newData.relics_sets,
    totalProcs: newData.totalProcs,
    relicsProcs: newData.relicsProcs,
    properties: {
      hp: newData.properties.hp,
      atk: newData.properties.atk,
      def: newData.properties.def,
      spd: newData.properties.spd,
      crit_rate: newData.properties.crit_rate,
      crit_dmg: newData.properties.crit_dmg,
      break_dmg: newData.properties.break_dmg,
      effect_hit: newData.properties.effect_hit,
      effect_res: newData.properties.effect_res,
      energy: newData.properties.energy,
    },
  };
  dataToPush.data.push(data);
}

const mergeAttributesAndAdditions = (attributes: any[], additions: any[]) => {
  const merged: any = {};

  attributes.forEach((attr) => {
    merged[attr.field] = attr.value;
  });

  additions.forEach((add) => {
    if (merged[add.field] !== undefined) {
      merged[add.field] = parseFloat(merged[add.field] + Number(add.value));
    } else {
      merged[add.field] = Number(add.value);
    }
  });
  return merged as Properties;
};

export default shareCharactersStats;
