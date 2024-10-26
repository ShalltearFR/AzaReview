import HomepageFooter from "@/components/Front/Homepage/HomepageFooter";
import NavBar from "@/components/Front/NavBar";
import StarBGAnimation from "@/components/Front/StarBGAnimation";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { TranslateSection } from "@/types/homepageDictionnary";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";

export default async function StatsID({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value as keyof TranslateSection;

  const { id } = await params;
  const dataStats = await getData(`${process.env.WWW}/api/stats/${id}`, 300);
  const characterList = await getData(
    `${CDN}/index_min/${lang || "fr"}/characters.json`,
    18000,
    true
  );
  const character = characterList.find((character: any) => character.id === id);
  const date = new Date(dataStats.updatedAt);
  const hp = getStatof(dataStats.properties.hp);
  const atk = getStatof(dataStats.properties.atk);
  const def = getStatof(dataStats.properties.def);
  const spd = getStatof(dataStats.properties.spd);
  const crit_rate = getStatof(dataStats.properties.crit_rate);
  const crit_dmg = getStatof(dataStats.properties.crit_dmg);
  const break_effect = getStatof(dataStats.properties.break_effect);
  const effect_hit = getStatof(dataStats.properties.effect_hit);
  const effect_res = getStatof(dataStats.properties.effect_res);
  const energy = getStatof(dataStats.properties.energy);

  if (dataStats.error) return notFound();

  return (
    <>
      <NavBar />
      <StarBGAnimation />
      <div className="min-h-[calc(100vh-205px)] relative text-white mt-5">
        <img
          src={`${CDN}/${character.portrait}`}
          className="fixed -right-1/2 -left-1/2 grayscale opacity-50 object-cover h-full translate-y-5 -z-10 mx-auto"
        />
        <div className="bg-black/75 p-3 md:p-5 xl:w-[1350px] xl:mx-auto xl:rounded-3xl">
          <div className="flex relative items-center italic">
            <h1 className="mx-auto text-4xl font-bold">{character.name}</h1>
            <h4 className="absolute right-0 text-right">
              <p>
                Mis à jour le {date.toLocaleDateString()} à{" "}
                {date.toLocaleTimeString().replaceAll("/", "-")}
              </p>
              <p>Stats sur {dataStats.uid.length} comptes</p>
            </h4>
          </div>
          <table className="border-collapse border-spacing-0 tg">
            <thead>
              <tr>
                <th className="!border-0"></th>
                <th className="!font-bold">MIN</th>
                <th className="!font-bold">MOY</th>
                <th className="!font-bold">MAX</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="!font-bold">PV</td>
                <td className="!text-red">{hp.min}</td>
                <td className="!text-blue">{hp.avg}</td>
                <td className="!text-green">{hp.max}</td>
              </tr>
              <tr>
                <td className="!font-bold">ATQ</td>
                <td className="!text-red">{atk.min}</td>
                <td className="!text-blue">{atk.avg}</td>
                <td className="!text-green">{atk.max}</td>
              </tr>
              <tr>
                <td className="!font-bold">DEF</td>
                <td className="!text-red">{def.min}</td>
                <td className="!text-blue">{def.avg}</td>
                <td className="!text-green">{def.max}</td>
              </tr>
              <tr>
                <td className="!font-bold">VIT</td>
                <td className="!text-red">{spd.min}</td>
                <td className="!text-blue">{spd.avg}</td>
                <td className="!text-green">{spd.max}</td>
              </tr>
              <tr>
                <td className="!font-bold">Chances Crit.</td>
                <td className="!text-red">{crit_rate.min}%</td>
                <td className="!text-blue">{crit_rate.avg}%</td>
                <td className="!text-green">{crit_rate.max}%</td>
              </tr>
              <tr>
                <td className="!font-bold">DGT Crit.</td>
                <td className="!text-red">{crit_dmg.min}%</td>
                <td className="!text-blue">{crit_dmg.avg}%</td>
                <td className="!text-green">{crit_dmg.max}%</td>
              </tr>
              <tr>
                <td className="!font-bold">Effet de rupture</td>
                <td className="!text-red">{break_effect.min}%</td>
                <td className="!text-blue">{break_effect.avg}%</td>
                <td className="!text-green">{break_effect.max}%</td>
              </tr>
              <tr>
                <td className="!font-bold">App. des effets</td>
                <td className="!text-red">{effect_hit.min}%</td>
                <td className="!text-blue">{effect_hit.avg}%</td>
                <td className="!text-green">{effect_hit.max}%</td>
              </tr>
              <tr>
                <td className="!font-bold">RÉS des effets</td>
                <td className="!text-red">{effect_res.min}%</td>
                <td className="!text-blue">{effect_res.avg}%</td>
                <td className="!text-green">{effect_res.max}%</td>
              </tr>
              <tr>
                <td className="!font-bold">Régen. d'énérgie</td>
                <td className="!text-red">{energy.min + 100}%</td>
                <td className="!text-blue">{energy.avg + 100}%</td>
                <td className="!text-green">{energy.max + 100}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <HomepageFooter lang={lang} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<Metadata> {
  const { id } = await params;
  const characterList = await getData(
    `${CDN}/index_min/fr/characters.json`,
    18000,
    true
  );
  const character = characterList.find((character: any) => character.id === id);

  if (character.name) {
    return {
      metadataBase: new URL(CDN),
      title: `Review HSR - Statistiques`,
      description: `Statistiques sur ${character.name}`,
      openGraph: {
        images: [`/${character.preview}`],
      },
    };
  }

  return {
    metadataBase: new URL(CDN),
    title: `Review HSR - Statistiques`,
    description: `Le personnage n'existe pas`,
    openGraph: {
      images: [`/icon/avatar/202002.png`],
    },
  };
}

const getData = async (
  url: string,
  revalidate: number,
  convertToObject?: boolean,
  isMetadata?: boolean
) => {
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
};

const getStatof = (data: Array<number>) => {
  const min = Math.round(Math.min(...data));
  const avg = Math.round(
    data.reduce((a: number, b: number) => a + b, 0) / data.length
  );
  const max = Math.round(Math.max(...data));
  return { min, avg, max };
};
