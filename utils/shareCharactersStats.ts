"use server";
import dbConnect from "@/lib/dbConnect";
import CharacterStats from "@/models/CharacterStats.model";
import { CharacterMerged, Properties } from "@/types/CharacterMerged";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
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
    const dataDB = await CharacterStats.findOne({ id: dataCopy.id });

    if (!dataDB) {
      await CharacterStats.create({ id: dataCopy.id });
      console.log(`CharacterStats créée : ${dataCopy.name}`);
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

    const newData: CharacterMerged = {
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
        break_effect: Number(mergedValues.break_effect ?? 0) * 100,
        effect_hit: Number(mergedValues.effect_hit ?? 0) * 100,
        effect_res: Number(mergedValues.effect_res ?? 0) * 100,
        energy:
          energyMerged?.value !== undefined ? energyMerged.value * 100 : 0,
      },
    };

    const dataToPush: CharacterStatsType = dataDB.toObject();

    if (dataDB.uid.includes(uid)) {
      console.log("Personnage déjà partagé");
      const index = dataDB.uid.indexOf(uid);
      updateProperties(dataToPush, newData, index);

      if (JSON.stringify(dataToPush) !== JSON.stringify(dataDB.toObject())) {
        console.log("Mise à jour du personnage");
        await CharacterStats.findOneAndUpdate({ id: dataCopy.id }, dataToPush);
      }
      return;
    }

    addNewData(dataToPush, newData, uid);
    await CharacterStats.findOneAndUpdate({ id: dataCopy.id }, dataToPush);
    console.log("Personnage ajouté");
  } catch (error) {
    console.error("Erreur de récupération d'infos de personnages :", error);
  }
};

const updateProperties = (
  dataToPush: CharacterStatsType,
  newData: CharacterMerged,
  index: number
) => {
  dataToPush.ranks[index] = newData.ranks;
  dataToPush.lightCones[index] = newData.lightCones;
  dataToPush.properties.hp[index] = newData.properties.hp;
  dataToPush.properties.atk[index] = newData.properties.atk;
  dataToPush.properties.def[index] = newData.properties.def;
  dataToPush.properties.spd[index] = newData.properties.spd;
  dataToPush.properties.crit_rate[index] = newData.properties.crit_rate;
  dataToPush.properties.crit_dmg[index] = newData.properties.crit_dmg;
  dataToPush.properties.break_effect[index] = newData.properties.break_effect;
  dataToPush.properties.effect_hit[index] = newData.properties.effect_hit;
  dataToPush.properties.effect_res[index] = newData.properties.effect_res;
  dataToPush.properties.energy[index] = newData.properties.energy;
};

const addNewData = (
  dataToPush: CharacterStatsType,
  newData: CharacterMerged,
  uid: string
) => {
  dataToPush.uid.push(uid);
  dataToPush.ranks.push(newData.ranks);
  dataToPush.lightCones.push(newData.lightCones);
  dataToPush.relics_sets.push(...newData.relics_sets);
  dataToPush.properties.hp.push(newData.properties.hp);
  dataToPush.properties.atk.push(newData.properties.atk);
  dataToPush.properties.def.push(newData.properties.def);
  dataToPush.properties.spd.push(newData.properties.spd);
  dataToPush.properties.crit_rate.push(newData.properties.crit_rate);
  dataToPush.properties.crit_dmg.push(newData.properties.crit_dmg);
  dataToPush.properties.break_effect.push(newData.properties.break_effect);
  dataToPush.properties.effect_hit.push(newData.properties.effect_hit);
  dataToPush.properties.effect_res.push(newData.properties.effect_res);
  dataToPush.properties.energy.push(newData.properties.energy);
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
