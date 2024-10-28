import NavBar from "@/components/Front/NavBar";
import StarBGAnimation from "@/components/Front/StarBGAnimation";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { TranslateSection } from "@/types/homepageDictionnary";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";
import RadarChart from "@/components/Front/Stats/RadarChart";
import { StatsTranslate } from "@/utils/statsDictionnary";
import Footer from "@/components/Front/UID/Footer";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";

export default async function StatsID({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value as keyof TranslateSection;

  // return (
  //   <>
  //     <NavBar />
  //     <StarBGAnimation />
  //     <div className="min-h-[calc(100vh-205px)] relative text-white mt-5 mb-5">
  //       <p className="text-6xl text-center mt-10">Page en refonte</p>
  //     </div>
  //     <Footer lang={lang} />
  //   </>
  // );

  const { id } = await params;
  const dataStats: CharacterStatsType = await getData(
    `${process.env.WWW}/api/stats/${id}`,
    300
  );

  if (dataStats.error) return notFound();

  const characterList = await getData(
    `${CDN}/index_min/${lang || "fr"}/characters.json`,
    18000,
    true
  );
  const relicsList = await getData(
    `${CDN}/index_min/${lang || "fr"}/relic_sets.json`,
    18000,
    true
  );
  const lightConesList = await getData(
    `${CDN}/index_min/${lang || "fr"}/light_cones.json`,
    18000,
    true
  );

  const character = characterList.find((character: any) => character.id === id);
  const date = new Date(dataStats.updatedAt);

  const hp = getStatsAttributes(dataStats.data, "hp", true);
  const atk = getStatsAttributes(dataStats.data, "atk", true);
  const def = getStatsAttributes(dataStats.data, "def", true);
  const spd = getStatsAttributes(dataStats.data, "spd", true);
  const crit_rate = getStatsAttributes(dataStats.data, "crit_rate");
  const crit_dmg = getStatsAttributes(dataStats.data, "crit_dmg");
  const break_dmg = getStatsAttributes(dataStats.data, "break_dmg");
  const effect_hit = getStatsAttributes(dataStats.data, "effect_hit");
  const effect_res = getStatsAttributes(dataStats.data, "effect_res");
  const energy = getStatsAttributes(dataStats.data, "energy");

  function getTop5LightCones(data: CharacterStatsType["data"]) {
    if (!data) return undefined;
    const arrayData: any = data.map((item) => item.lightCones);

    const countMap = arrayData.reduce((acc: any, id: any) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    // Convertit l'objet en tableau de { id, count }
    const resultArray = Object.keys(countMap).map((id) => ({
      id: id,
      count: countMap[id].toString(),
    }));

    // Trie les éléments par count en ordre décroissant et retourne les 5 premiers
    return {
      data: resultArray.sort((a, b) => b.count - a.count).slice(0, 5),
      length: arrayData.length,
    };
  }

  function getTop5Relics(data: CharacterStatsType["data"]) {
    interface RelicType {
      id: string;
      num: number;
      piece: number;
    }

    interface OrnamentType {
      id: string;
      num: number;
    }

    interface TotalsType {
      relics: RelicType[];
      ornaments: OrnamentType[];
      totalRelicsCount: number;
      totalOrnamentsCount: number;
    }

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

    // Limitation à 5 éléments
    totals.relics = totals.relics
      .sort((a, b) => b.num - a.num) // Trier en fonction de `num` en ordre décroissant
      .slice(0, 5); // Garder les 5 premiers éléments

    totals.ornaments = totals.ornaments
      .sort((a, b) => b.num - a.num) // Trier en fonction de `num` en ordre décroissant
      .slice(0, 5); // Garder les 5 premiers éléments

    return totals;
  }

  const top5_LightCones = getTop5LightCones(dataStats.data);
  const top_Relics = getTop5Relics(dataStats.data);

  type DefaultKeys =
    | "HPAddedRatio"
    | "HPDelta"
    | "AttackDelta"
    | "AttackAddedRatio"
    | "DefenceDelta"
    | "DefenceAddedRatio"
    | "StatusProbabilityBase"
    | "CriticalChanceBase"
    | "CriticalDamageBase"
    | "StatusResistanceBase"
    | "BreakDamageAddedRatioBase"
    | "SpeedDelta";

  // Type pour l'objet result
  interface Result {
    totalProcs: number;
    data: {
      [key in DefaultKeys]: number;
    };
  }
  const defaultKeys: DefaultKeys[] = [
    "HPAddedRatio",
    "HPDelta",
    "AttackDelta",
    "AttackAddedRatio",
    "DefenceDelta",
    "DefenceAddedRatio",
    "StatusProbabilityBase",
    "CriticalChanceBase",
    "CriticalDamageBase",
    "StatusResistanceBase",
    "BreakDamageAddedRatioBase",
    "SpeedDelta",
  ];

  const result: Result = {
    totalProcs: 0,
    data: defaultKeys.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {} as Result["data"]),
  };

  dataStats.data.forEach((character) => {
    character.relicsProcs.forEach((proc) => {
      for (const key in proc as any) {
        if (key in result.data) {
          const value = proc[key as keyof typeof proc];

          if (value !== undefined) {
            // Vérification si la valeur existe
            // Addition de la valeur de la clé dans result.data

            // Vérification des clés spécifiques pour le comptage de totalProcs
            if (
              key === "HPDelta" ||
              key === "AttackDelta" ||
              key === "DefenceDelta"
            ) {
              result.totalProcs += 0.33; // Ajouter 0.33 si la clé est HPDelta, AttackDelta ou DefenceDelta
              result.data[key as DefaultKeys] += value / 3;
            } else {
              result.data[key as DefaultKeys] += value;
              result.totalProcs += 1; // Ajouter 1 pour les autres clés
            }
          }
        }
      }
    });
  });

  const procsResult = {
    totalProcs: Number(result.totalProcs.toFixed(4)),
    hp: Number((result.data.HPDelta + result.data.HPAddedRatio).toFixed(4)),
    atk: Number(
      (result.data.AttackDelta + result.data.AttackAddedRatio).toFixed(4)
    ),
    def: Number(
      (result.data.DefenceDelta + result.data.DefenceAddedRatio).toFixed(4)
    ),
    spd: result.data.SpeedDelta,
    crit_rate: result.data.CriticalChanceBase,
    crit_dmg: result.data.CriticalDamageBase,
    break_dmg: result.data.BreakDamageAddedRatioBase,
    effect_hit: result.data.StatusProbabilityBase,
    effect_res: result.data.StatusResistanceBase,
  };

  console.log("result", result);
  console.log("procsResult", procsResult);

  const maxValue = Math.max(
    ...Object.entries(procsResult)
      .filter(([key]) => key !== "totalProcs") // Ignorer `totalProcs`
      .map(([, value]) => value)
  );

  // Ajouter 10 à cette valeur maximale
  // const maxValueWithMargin = maxValue + 10;

  // console.log("Max Value with Margin:", maxValueWithMargin);

  // console.log(top5LightCones);
  // const top5_Lightcones =
  // console.log(dataStats);

  // //Partie calcul Attributes (pour le graph)
  // const PercentObject = {
  //   hp: (hp.avg / hp.max) * 100,
  //   atq: (atk.avg / atk.max) * 100,
  //   def: (def.avg / def.max) * 100,
  //   spd: (spd.avg / spd.max) * 100,
  //   crit_rate: (crit_rate.avg / crit_rate.max) * 100,
  //   crit_dmg: (crit_dmg.avg / crit_dmg.max) * 100,
  //   break_dmg:
  //     (break_dmg.avg / (break_dmg.max === 0 ? 1 : break_dmg.max)) * 100,
  //   effect_hit:
  //     (effect_hit.avg / (effect_hit.max === 0 ? 1 : effect_hit.max)) * 100,
  //   effect_res:
  //     (effect_res.avg / (effect_res.max === 0 ? 1 : effect_res.max)) * 100,
  //   energy: (energy.avg / (energy.max === 0 ? 1 : energy.max)) * 100,
  // };

  // // Calculez la somme totale des valeurs
  // const totalAttributes = Object.values(PercentObject).reduce(
  //   (acc, value) => acc + value,
  //   0
  // );

  // // Calculez le pourcentage pour chaque valeur
  // const percentages = Object.fromEntries(
  //   Object.entries(PercentObject).map(([key, value]) => [
  //     key,
  //     (value / totalAttributes) * 100,
  //   ])
  // );

  // const maxPercentage = Math.max(...Object.values(percentages));

  // const countsLightcones = countItems(dataStats.lightCones);
  // const countsRelics = countItems(dataStats.relics_sets);

  // // Convertir l'objet de comptage en tableau et trier par occurrences
  // const { objet: top5_Relics, total: totalCountRelics } = sortItems(
  //   countsRelics,
  //   dataStats.relics_sets
  // );
  // const { objet: top5_Lightcones, total: totalCountLightcones } = sortItems(
  //   countsLightcones,
  //   dataStats.lightCones
  // );

  const dataRadarChart = {
    labels: [
      StatsTranslate[lang ?? "fr"][6],
      StatsTranslate[lang ?? "fr"][7],
      StatsTranslate[lang ?? "fr"][8],
      StatsTranslate[lang ?? "fr"][9],
      StatsTranslate[lang ?? "fr"][10],
      StatsTranslate[lang ?? "fr"][11],
      StatsTranslate[lang ?? "fr"][12],
      StatsTranslate[lang ?? "fr"][13],
      StatsTranslate[lang ?? "fr"][14],
    ],
    datasets: [
      {
        data: [
          procsResult.hp,
          procsResult.atk,
          procsResult.def,
          procsResult.spd,
          procsResult.crit_rate,
          procsResult.crit_dmg,
          procsResult.break_dmg,
          procsResult.effect_hit,
          procsResult.effect_res,
        ],

        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  // console.log(dataStats);

  // return <div></div>;

  if (top5_LightCones)
    return (
      <>
        <NavBar />
        <StarBGAnimation />
        <div className="min-h-[calc(100vh-205px)] relative text-white mt-5 mb-5">
          <img
            src={`${CDN}/${character.portrait}`}
            className="fixed -right-1/2 -left-1/2 grayscale opacity-50 object-cover h-full translate-y-5 -z-10 mx-auto"
          />
          <div className="bg-black/75 p-3 md:p-5 xl:w-[1350px] xl:mx-auto xl:rounded-3xl">
            <div className="flex flex-col relative items-right mmd:items-center italic">
              <h1 className="mx-auto text-4xl font-bold">
                {character.name === "{NICKNAME}"
                  ? lang === "en"
                    ? "Pioneer"
                    : "Pionnier"
                  : character.name}
              </h1>
              <div className="mmd:absolute right-0 text-right pr-2 xl:pr-0 mt-2 mmd:mt-0">
                <p>
                  {StatsTranslate[lang ?? "fr"][0]} {date.toLocaleDateString()}{" "}
                  {StatsTranslate[lang ?? "fr"][1]}{" "}
                  {date.toLocaleTimeString().replaceAll("/", "-")}
                </p>
                <p>
                  {StatsTranslate[lang ?? "fr"][2]} {dataStats.data.length}{" "}
                  {StatsTranslate[lang ?? "fr"][3]}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center mt-10 flex-wrap">
              <div className="mx-auto">
                <h2 className="text-2xl text-center font-bold text-yellow mb-3">
                  {StatsTranslate[lang ?? "fr"][4]}
                </h2>
                <table className="border-collapse border-spacing-0 tg mx-auto">
                  <thead>
                    <tr>
                      <th className="!border-0"></th>
                      <th>Minimum</th>
                      <th>{StatsTranslate[lang ?? "fr"][5]}</th>
                      <th>Maximum</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{StatsTranslate[lang ?? "fr"][6]}</td>
                      <td className="!text-red">{hp?.min ?? "-"}</td>
                      <td className="!text-blue">{hp?.avg ?? "-"}</td>
                      <td className="!text-green">{hp?.max ?? "-"}</td>
                    </tr>
                    <tr>
                      <td>{StatsTranslate[lang ?? "fr"][7]}</td>
                      <td className="!text-red">{atk?.min ?? "-"}</td>
                      <td className="!text-blue">{atk?.avg ?? "-"}</td>
                      <td className="!text-green">{atk?.max ?? "-"}</td>
                    </tr>
                    <tr>
                      <td>{StatsTranslate[lang ?? "fr"][8]}</td>
                      <td className="!text-red">{def?.min ?? "-"}</td>
                      <td className="!text-blue">{def?.avg ?? "-"}</td>
                      <td className="!text-green">{def?.max ?? "-"}</td>
                    </tr>
                    <tr>
                      <td>{StatsTranslate[lang ?? "fr"][9]}</td>
                      <td className="!text-red">{spd?.min ?? "-"}</td>
                      <td className="!text-blue">{spd?.avg ?? "-"}</td>
                      <td className="!text-green">{spd?.max ?? "-"}</td>
                    </tr>
                    <tr>
                      <td>{StatsTranslate[lang ?? "fr"][10]}</td>
                      <td className="!text-red">{crit_rate?.min ?? "-"}%</td>
                      <td className="!text-blue">{crit_rate?.avg ?? "-"}%</td>
                      <td className="!text-green">{crit_rate?.max ?? "-"}%</td>
                    </tr>
                    <tr>
                      <td>{StatsTranslate[lang ?? "fr"][11]}</td>
                      <td className="!text-red">{crit_dmg?.min ?? "-"}%</td>
                      <td className="!text-blue">{crit_dmg?.avg ?? "-"}%</td>
                      <td className="!text-green">{crit_dmg?.max ?? "-"}%</td>
                    </tr>
                    <tr>
                      <td>{StatsTranslate[lang ?? "fr"][12]}</td>
                      <td className="!text-red">{break_dmg?.min ?? "-"}%</td>
                      <td className="!text-blue">{break_dmg?.avg ?? "-"}%</td>
                      <td className="!text-green">{break_dmg?.max ?? "-"}%</td>
                    </tr>
                    <tr>
                      <td>{StatsTranslate[lang ?? "fr"][13]}</td>
                      <td className="!text-red">{effect_hit?.min ?? "-"}%</td>
                      <td className="!text-blue">{effect_hit?.avg ?? "-"}%</td>
                      <td className="!text-green">{effect_hit?.max ?? "-"}%</td>
                    </tr>
                    <tr>
                      <td>{StatsTranslate[lang ?? "fr"][14]}</td>
                      <td className="!text-red">{effect_res?.min ?? "-"}%</td>
                      <td className="!text-blue">{effect_res?.avg ?? "-"}%</td>
                      <td className="!text-green">{effect_res?.max ?? "-"}%</td>
                    </tr>
                    <tr>
                      <td>{StatsTranslate[lang ?? "fr"][15]}</td>
                      <td className="!text-red">
                        {energy ? energy.min + 100 : "-"}%
                      </td>
                      <td className="!text-blue">
                        {energy ? energy.avg + 100 : "-"}%
                      </td>
                      <td className="!text-green">
                        {energy ? energy.max + 100 : "-"}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mx-auto mt-5 lg:mt-0">
                <h2 className="font-bold text-2xl underline text-orange text-center mb-2">
                  {StatsTranslate[lang ?? "fr"][16]}
                </h2>
                <RadarChart
                  data={dataRadarChart}
                  width={500}
                  height={350}
                  maxPercent={maxValue}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-20">
              <div className="flex flex-col mt-10 justify-center p-5 bg-white/15 rounded-3xl w-full lg:w-auto">
                <h2 className="font-bold text-2xl underline text-orange text-center">
                  {StatsTranslate[lang ?? "fr"][17]}
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
                  {top_Relics.relics.map((relic) => {
                    // const relicArray = relic.value.split("_");
                    const relicInfo = relicsList.find(
                      (info: any) => info.id === relic.id
                    );
                    const percentage = (
                      (relic.num / top_Relics.totalRelicsCount) *
                      100
                    ).toFixed(1);
                    return (
                      <div
                        key={`relic${relic.id}+${relic.piece}`}
                        className="relative flex bg-black/75 rounded-tr-3xl py-2 h-36 w-36 hover:bg-white/5"
                      >
                        <p className="absolute text-sm -top-2 -left-2 bg-black p-2 rounded-full border border-gray font-bold">
                          {percentage}%
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
                    // const relicArray = relic.value.split("_");
                    const ornamentInfo = relicsList.find(
                      (info: any) => info.id === ornament.id
                    );
                    const percentage = (
                      (ornament.num / top_Relics.totalRelicsCount) *
                      100
                    ).toFixed(1);
                    return (
                      <div
                        key={`relic${ornament.id}`}
                        className="relative flex bg-black/75 rounded-tr-3xl py-2 h-36 w-36 hover:bg-white/5"
                      >
                        <p className="absolute text-sm -top-2 -left-2 bg-black p-2 rounded-full border border-gray font-bold">
                          {percentage}%
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
            <div className="flex flex-col mt-10 justify-center mx-auto p-5 bg-white/15 rounded-3xl lg:w-1/2">
              <h2 className="font-bold text-2xl underline text-orange text-center w-auto">
                {StatsTranslate[lang ?? "fr"][19]}
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
                {top5_LightCones.data.map((cone) => {
                  const lightconesInfo = lightConesList.find(
                    (relic: any) => relic.id === cone.id
                  );
                  const percentage = (
                    (cone.count / top5_LightCones.length) *
                    100
                  ).toFixed(1);
                  return (
                    <div
                      key={`lightcone${cone.id}`}
                      className="relative flex bg-black/75 rounded-tr-3xl py-2 h-36 w-36 hover:bg-white/5"
                    >
                      <p className="absolute text-sm -top-2 -left-2 bg-black p-2 rounded-full border border-gray font-bold">
                        {percentage}%
                      </p>

                      <img
                        src={`${CDN}/${lightconesInfo.icon}`}
                        alt={lightconesInfo.name}
                        width={112}
                        height={112}
                        className="w-28 m-auto"
                      />
                      <p className="absolute bottom-0 text-center text-sm bg-black w-full">
                        {lightconesInfo.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Footer lang={lang} />
      </>
    );

  return (
    <>
      <NavBar />
      <StarBGAnimation />
      <div className="flex min-h-[calc(100vh-205px)] relative text-white mt-10 justify-center text-3xl">
        <p>{StatsTranslate[lang ?? "fr"][19]}</p>
      </div>
    </>
  );
}

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: number }>;
// }): Promise<Metadata> {
//   const { id } = await params;
//   const characterList = await getData(
//     `${CDN}/index_min/fr/characters.json`,
//     18000,
//     true
//   );
//   const character = characterList.find((character: any) => character.id === id);

//   if (character && character.name) {
//     return {
//       metadataBase: new URL(CDN),
//       title: `Review HSR - Statistiques`,
//       description: `Statistiques sur ${character.name}`,
//       openGraph: {
//         images: [`/${character.preview}`],
//       },
//     };
//   }

//   return {
//     metadataBase: new URL(CDN),
//     title: `Review HSR - Statistiques`,
//     description: `Le personnage n'existe pas`,
//     openGraph: {
//       images: [`/icon/avatar/202002.png`],
//     },
//   };
// }

async function getData(
  url: string,
  revalidate: number,
  convertToObject?: boolean,
  isMetadata?: boolean
) {
  const data = await fetch(url, {
    next: { revalidate: revalidate },
  });
  const jsonData = await data.json();

  if (convertToObject) {
    const toArray = Object.values(jsonData).map((item) => item);
    return toArray;
  }

  if (isMetadata) return Response.json(jsonData);

  return jsonData;
}

function getStatsAttributes(
  data: CharacterStatsType["data"],
  attributes: string,
  rounded?: boolean
) {
  if (!data) return undefined;
  // Extraction des valeurs des propriétés
  const propertiesArray = data.map((item: any) => item.properties[attributes]);

  // Calcul du 1% des éléments à retirer
  const removeCount =
    propertiesArray.length > 1 ? Math.ceil(propertiesArray.length * 0.01) : 0;

  // Trier et retirer les valeurs les plus basses
  const filteredArray = propertiesArray
    .sort((a, b) => a - b)
    .slice(removeCount);

  const min = Math.round(Math.min(...filteredArray) * 10) / 10;
  const avg =
    Math.round(
      (filteredArray.reduce((a: number, b: number) => a + b, 0) /
        filteredArray.length) *
        10
    ) / 10;
  const max = Math.round(Math.max(...filteredArray) * 10) / 10;

  if (rounded) {
    return {
      min: Math.round(min),
      avg: Math.round(avg),
      max: Math.round(max),
    };
  }

  // console.log("stats", min, avg, max);
  return { min, avg, max };
}

// const sortItems = (items: Record<string, number>, dataStats: any) => {
//   const top5Items = Object.entries(items)
//     .sort(([, a], [, b]) => b - a) // Trier par nombre d'occurrences (décroissant)
//     .slice(0, 5); // Prendre les cinq premiers

//   // Format des résultats
//   const objet = top5Items.map(([key, value]) => ({
//     value: key,
//     count: value,
//   }));

//   // Nombre total d'items
//   const total = objet.reduce((sum: any, relic: any) => sum + relic.count, 0);
//   return { objet, total };
// };

// const countItems = (dataStats: any) => {
//   const counts = dataStats.reduce((acc: any, value: string) => {
//     acc[value] = (acc[value] || 0) + 1;
//     return acc;
//   }, {});

//   return counts;
// };
