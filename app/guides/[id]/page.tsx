import ShowCasePage from "@/components/Front/Showcase/ShowCasePage";
import { TranslateSection } from "@/types/homepageDictionnary";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";
import { cookies } from "next/headers";

type Props = {
  params: { id: number };
};

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await getData(
    `${process.env.WWW}/api/character/${params.id}`,
    18000,
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

const GuideID = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value as keyof TranslateSection;

  try {
    const [lightcones, relicsSet, properties, character] = await Promise.all([
      getData(`${CDN}/index_min/${lang || "fr"}/light_cones.json`, 18000, true),
      getData(`${CDN}/index_min/${lang || "fr"}/relic_sets.json`, 18000, true),
      getData(`${CDN}/index_min/${lang || "fr"}/properties.json`, 18000, true),
      getData(`${process.env.WWW}/api/character/${params.id}`, 300, false),
    ]);

    if (lightcones && relicsSet && properties) {
      return (
        <ShowCasePage
          character={character}
          lang={lang}
          lightCones={lightcones}
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
