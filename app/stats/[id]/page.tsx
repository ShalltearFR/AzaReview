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
import charactersFR from "@/static/charactersFR.json";
import charactersEN from "@/static/charactersEN.json";
import relic_setsFR from "@/static/relic_setsFR.json";
import relic_setsEN from "@/static/relic_setsEN.json";
import light_conesFR from "@/static/light_conesFR.json";
import light_conesEN from "@/static/light_conesEN.json";

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

  const characterList = lang === "en" ? charactersEN : charactersFR;
  const relicsList = lang === "en" ? relic_setsEN : relic_setsFR;
  const lightConesList = lang === "en" ? light_conesEN : light_conesFR;

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

  if (dataStats.error || !character) return notFound();
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
  const characterList = charactersFR;
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
