import NavBar from "@/components/Front/NavBar";
import StarBGAnimation from "@/components/Front/StarBGAnimation";
import { notFound } from "next/navigation";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";
import { CharacterStats as CharacterStatsType } from "@/types/CharacterStats";
import StatsPage from "@/components/Front/Stats/StatsPage";
import Footer from "@/components/Front/UID/Footer";
import charactersFR from "@/static/charactersFR.json";
import relic_setsFR from "@/static/relic_setsFR.json";
import light_conesFR from "@/static/light_conesFR.json";

export default async function StatsID({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const dataStats: CharacterStatsType = await getData(
    `${process.env.WWW}/api/stats/${id}`,
    3600
  );

  const character = charactersFR.find((character: any) => character.id === id);

  if (character && (dataStats.error || dataStats.data.length === 0))
    return (
      <>
        <NavBar />
        <StarBGAnimation />
        <div className="flex min-h-[calc(100vh-335px)] relative text-white mt-10 justify-center text-3xl">
          <p>
            {"Aucune statistique pour "}
            {character.name} T_T
          </p>
        </div>
        <Footer />
      </>
    );

  if (dataStats.error || !character) return notFound();
  const date = new Date(dataStats.updatedAt);

  return (
    <StatsPage
      date={date}
      dataStats={dataStats}
      character={character}
      relicsList={relic_setsFR}
      lightConesList={light_conesFR}
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
