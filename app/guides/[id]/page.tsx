import ShowCasePage from "@/components/Front/Showcase/ShowCasePage";
import { TranslateSection } from "@/types/homepageDictionnary";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const dynamic = "force-static";
export const revalidate = 3600; // refresh toutes les heures

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await getData(
    `${process.env.WWW}/api/character/${id}`,
    3600,
    false,
    true
  );
  const json = await res.json();

  if (json.name) {
    return {
      metadataBase: new URL(CDN),
      title: `Review HSR - Guide`,
      description: `Guide sur ${json.name}`,
      openGraph: {
        images: [`/${json.preview}`],
      },
    };
  }

  return {
    metadataBase: new URL(CDN),
    title: `Review HSR`,
    description: `Guide des personnages`,
    openGraph: {
      images: [`/icon/avatar/202002.png`],
    },
  };
}

const GuideID = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value as keyof TranslateSection;

  try {
    const [lightcones, lightconesRanks, relicsSet, properties, character] =
      await Promise.all([
        getData(
          `${CDN}/index_min/${lang || "fr"}/light_cones.json`,
          18000,
          true
        ),
        getData(
          `${CDN}/index_min/${lang || "fr"}/light_cone_ranks.json`,
          18000,
          true
        ),
        getData(
          `${CDN}/index_min/${lang || "fr"}/relic_sets.json`,
          18000,
          true
        ),
        getData(
          `${CDN}/index_min/${lang || "fr"}/properties.json`,
          18000,
          true
        ),
        getData(`${process.env.WWW}/api/character/${id}`, 5, false),
      ]);

    if (lightcones && relicsSet && properties && lightconesRanks) {
      return (
        <ShowCasePage
          character={character}
          lang={lang}
          lightCones={lightcones}
          lightconesRanks={lightconesRanks}
          relicsSet={relicsSet}
          properties={properties}
        />
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <div className="mt-10 text-center text-xl font-bold">
      {"Erreur avec le site, veuillez contacter l'administrateur, page Guide"}
    </div>
  );
};

export default GuideID;
