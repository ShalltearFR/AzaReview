"use client";
import LoadingSpin from "@/components/LoadingSpin";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
import { TranslateSection } from "@/types/homepageDictionnary";
import { CDN } from "@/utils/cdn";
import { StatsTranslate } from "@/utils/statsDictionnary";
import { useEffect, useState } from "react";

interface RelicType {
  id: string;
  num: number;
  piece: number;
  percent?: number;
}

interface OrnamentType {
  id: string;
  num: number;
  percent?: number;
}

interface TotalsType {
  relics: RelicType[];
  ornaments: OrnamentType[];
  totalRelicsCount: number;
  totalOrnamentsCount: number;
}

interface TopRelicsProps {
  dataStats: CharacterStatsType;
  lang: keyof TranslateSection | undefined;
  relicsList: any;
}

const TopRelics: React.FC<TopRelicsProps> = ({
  dataStats,
  lang,
  relicsList,
}) => {
  const [top_Relics, setTop_Relics] = useState<TotalsType>();
  useEffect(() => {
    setTop_Relics(getTop5Relics(dataStats.data));
  }, []);

  if (top_Relics)
    return (
      <div className="flex flex-wrap justify-center gap-x-20">
        <div className="flex flex-col mt-10 justify-center p-5 bg-white/15 rounded-3xl w-full lg:w-auto">
          <h2 className="font-bold text-2xl underline text-orange text-center">
            {StatsTranslate[lang ?? "fr"][17]}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
            {top_Relics.relics.map((relic) => {
              console.log("relic", relic);
              const relicInfo = relicsList.find(
                (info: any) => info.id === relic.id
              );
              return (
                <div
                  key={`relic${relic.id}+${relic.piece}`}
                  className="relative flex bg-black/75 rounded-tr-3xl py-2 h-36 w-36 hover:bg-white/5"
                >
                  <p className="absolute text-sm -top-2 -left-2 bg-black p-2 rounded-full border border-gray font-bold">
                    {relic.percent}%
                  </p>
                  <p className="absolute text-sm -top-2 -right-2 bg-black p-2 rounded-full border border-gray font-bold">
                    {relic.piece}P
                  </p>
                  <img
                    src={`${CDN}/${relicInfo.icon}`}
                    alt={relicInfo.name}
                    width={112}
                    height={112}
                    className="w-28 m-auto"
                  />
                  <p className="absolute bottom-0 text-center text-sm bg-black w-full">
                    {relicInfo.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col mt-10 justify-center p-5 bg-white/15 rounded-3xl w-full lg:w-auto">
          <h2 className="font-bold text-2xl underline text-orange text-center">
            {StatsTranslate[lang ?? "fr"][18]}
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
            {top_Relics.ornaments.map((ornament) => {
              const ornamentInfo = relicsList.find(
                (info: any) => info.id === ornament.id
              );
              return (
                <div
                  key={`relic${ornament.id}`}
                  className="relative flex bg-black/75 rounded-tr-3xl py-2 h-36 w-36 hover:bg-white/5"
                >
                  <p className="absolute text-sm -top-2 -left-2 bg-black p-2 rounded-full border border-gray font-bold">
                    {ornament.percent}%
                  </p>
                  <img
                    src={`${CDN}/${ornamentInfo.icon}`}
                    alt={ornamentInfo.name}
                    width={112}
                    height={112}
                    className="w-28 m-auto"
                  />
                  <p className="absolute bottom-0 text-center text-sm bg-black w-full">
                    {ornamentInfo.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex justify-center mt-10">
      <LoadingSpin width="w-10" height="h-10" />
    </div>
  );
};

function getTop5Relics(data: CharacterStatsType["data"]) {
  const totals: TotalsType = {
    relics: [],
    ornaments: [],
    totalRelicsCount: 0,
    totalOrnamentsCount: 0,
  };

  // Comptage des reliques et des ornements
  if (data) {
    data.forEach((item) => {
      item.relics_sets.forEach((set: string) => {
        const [id, piece] = set.split("_");

        // Traitement des reliques
        if (piece) {
          const parsedPiece = parseInt(piece);
          const relicEntry = totals.relics.find(
            (r) => r.id === id && r.piece === parsedPiece
          );
          if (relicEntry) {
            relicEntry.num += 1; // Incrémenter le nombre pour cette pièce
          } else {
            totals.relics.push({ id, num: 1, piece: parsedPiece }); // Ajouter une nouvelle entrée
          }
        } else {
          // Traitement des ornements (pas de `piece` associé)
          const ornamentEntry = totals.ornaments.find((o) => o.id === id);
          if (ornamentEntry) {
            ornamentEntry.num += 1; // Incrémenter le nombre pour cet ornement
          } else {
            totals.ornaments.push({ id, num: 1 }); // Ajouter une nouvelle entrée
          }
        }
      });
    });
  }

  // Calcul des totaux
  totals.totalRelicsCount = totals.relics.reduce((acc, r) => acc + r.num, 0);
  totals.totalOrnamentsCount = totals.ornaments.reduce(
    (acc, o) => acc + o.num,
    0
  );

  // Calcul des pourcentages et filtrage des reliques avec pourcentage > 5
  totals.relics = totals.relics
    .map((relic) => ({
      ...relic,
      percent: totals.totalRelicsCount
        ? parseFloat(((relic.num / totals.totalRelicsCount) * 100).toFixed(2))
        : 0,
    }))
    .filter((relic) => relic.percent && relic.percent > 5) // Filtrer les reliques avec un pourcentage > 5
    .sort((a, b) => b.num - a.num) // Trier en fonction de `num` en ordre décroissant
    .slice(0, 5); // Garder les 5 premiers éléments

  // Calcul des pourcentages et filtrage des ornements avec pourcentage > 5
  totals.ornaments = totals.ornaments
    .map((ornament) => ({
      ...ornament,
      percent: totals.totalOrnamentsCount
        ? parseFloat(
            ((ornament.num / totals.totalOrnamentsCount) * 100).toFixed(2)
          )
        : 0,
    }))
    .filter((ornament) => ornament.percent && ornament.percent > 5) // Filtrer les ornements avec un pourcentage > 5
    .sort((a, b) => b.num - a.num) // Trier en fonction de `num` en ordre décroissant
    .slice(0, 5); // Garder les 5 premiers éléments

  return totals;
}

export default TopRelics;
