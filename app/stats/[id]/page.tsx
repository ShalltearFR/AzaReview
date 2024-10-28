import NavBar from "@/components/Front/NavBar";
import StarBGAnimation from "@/components/Front/StarBGAnimation";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { TranslateSection } from "@/types/homepageDictionnary";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";
import { StatsTranslate } from "@/utils/statsDictionnary";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
import StatsPage from "@/components/Front/Stats/StatsPage";
import Footer from "@/components/Front/UID/Footer";

export default async function StatsID({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value as keyof TranslateSection;

  const { id } = await params;
  const dataStats: CharacterStatsType = await getData(
    `${process.env.WWW}/api/stats/${id}`,
    3600
  );

  const [characterList, relicsList, lightConesList] = await Promise.all([
    getData(`${CDN}/index_min/${lang || "fr"}/characters.json`, 18000, true),
    getData(`${CDN}/index_min/${lang || "fr"}/relic_sets.json`, 18000, true),
    getData(`${CDN}/index_min/${lang || "fr"}/light_cones.json`, 18000, true),
  ]);

  const character = characterList.find((character: any) => character.id === id);

  if (character && (dataStats.error || dataStats.data.length === 0))
    return (
      <>
        <NavBar />
        <StarBGAnimation />
        <div className="flex min-h-[calc(100vh-335px)] relative text-white mt-10 justify-center text-3xl">
          <p>
            {StatsTranslate[lang ?? "fr"][20]}
            {character.name} T_T
          </p>
        </div>
        <Footer lang={lang} />
      </>
    );

  if (dataStats.error) return notFound();
  const date = new Date(dataStats.updatedAt);

  return (
    <StatsPage
      lang={lang}
      date={date}
      dataStats={dataStats}
      character={character}
      relicsList={relicsList}
      lightConesList={lightConesList}
    />
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

  if (character && character.name) {
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
