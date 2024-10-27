"use server";
import dbConnect from "@/lib/dbConnect";
import CharacterStats from "@/models/CharacterStats.model";
import { CharacterMerged, Properties } from "@/types/CharacterMerged";
import {
  CharacterStats as CharacterStatsType,
  CharacterStatWithoutDoc,
} from "@/types/CharacterStats";
import { Character as CharacterType } from "@/types/jsonUid";
import cacheData from "./cacheData";

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
      console.log(`CharacterStats créée : ${dataCopy.name}`);
      return;
    }

    const mergedValues: Properties = mergeAttributesAndAdditions(
      dataCopy.attributes,
      dataCopy.additions
    );

    const relicSetsMerged = dataCopy.relic_sets
      .filter((relic, index, self) => {
        const hasDuplicate = self.some(
          (r) => r.id === relic.id && r.num !== relic.num
        );
        return !(hasDuplicate && relic.num === 2);
      })
      .map((relic) => `${relic.id}_${relic.num}`);

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
      lightCones: dataCopy.light_cone.id,
      relics_sets: relicSetsMerged,
      totalProcs: totalProcs,
      relicsProcs: relicsProcsArray,
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
      console.log("Personnage déjà partagé");
      const index = dataToPush.data.findIndex((item) => item.uid === uid);
      const updatedData = updateProperties(dataToPush, newData, index);

      if (
        JSON.stringify(updatedData.data[index].properties) !==
        JSON.stringify(dataDB.data[index].properties)
      ) {
        console.log("Mise à jour du personnage");
        await CharacterStats.findOneAndUpdate({ id: dataCopy.id }, updatedData);
      }

      return;
    }

    // if (dataDB.data.uid.includes(uid)) {
    //   console.log("Personnage déjà partagé");
    //   const index = dataDB.uid.indexOf(uid);
    //   updateProperties(dataToPush, newData, index);

    //   if (JSON.stringify(dataToPush) !== JSON.stringify(dataDB.toObject())) {
    //     console.log("Mise à jour du personnage");
    //     await CharacterStats.findOneAndUpdate({ id: dataCopy.id }, dataToPush);
    //   }
    //   return;
    // }

    addNewData(dataToPush, newData, uid);
    await CharacterStats.findOneAndUpdate(
      { id: dataCopy.id },
      { id: dataToPush }
    );
    console.log("Personnage ajouté");
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

  //return dataToPush;

  // }
  // dataToPush.uid = uid
  // dataToPush.ranks.push(newData.ranks);
  // dataToPush.lightCones.push(newData.lightCones);
  // dataToPush.relics_sets.push(...newData.relics_sets);
  // dataToPush.properties.hp. = newData.properties.hp
  // dataToPush.properties.atk = newData.properties.atk
  // dataToPush.properties.def = newData.properties.def
  // dataToPush.properties.spd = newData.properties.spd
  // dataToPush.properties.crit_rate = newData.properties.crit_rate
  // dataToPush.properties.crit_dmg = newData.properties.crit_dmg
  // dataToPush.properties.break_effect = newData.properties.break_dmg
  // dataToPush.properties.effect_hit = newData.properties.effect_hit
  // dataToPush.properties.effect_res = newData.properties.effect_res
  // dataToPush.properties.energy = newData.properties.energy
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

// Fonction pour supprimer les _id des objets
function removeIdsFromArrays(data: any): any {
  if (Array.isArray(data)) {
    return data.map(removeIdsFromArrays);
  } else if (data && typeof data === "object") {
    const { _id, ...rest } = data;
    for (const key in rest) {
      rest[key] = removeIdsFromArrays(rest[key]);
    }
    return rest;
  }
  return data;
}

export default shareCharactersStats;
