import ShowCasePage from "@/components/Front/Showcase/ShowCasePage";
import { TranslateSection } from "@/types/homepageDictionnary";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import relic_setsFR from "@/static/relic_setsFR.json";
import relic_setsEN from "@/static/relic_setsEN.json";
import light_conesFR from "@/static/light_conesFR.json";
import light_conesEN from "@/static/light_conesEN.json";
import light_cone_ranksFR from "@/static/light_cone_ranksFR.json";
import light_cone_ranksEN from "@/static/light_cone_ranksEN.json";
import propertiesEN from "@/static/propertiesEN.json";
import propertiesFR from "@/static/propertiesFR.json";

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

const toArray = (object: Object) => Object.values(object).map((item) => item);

const GuideID = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value as keyof TranslateSection;

  try {
    const character = await getData(
      `${process.env.WWW}/api/character/${id}`,
      300,
      false
    );

    const lightcones =
      lang === "en" ? toArray(light_conesEN) : toArray(light_conesFR);
    const relicsSet =
      lang === "en" ? toArray(relic_setsEN) : toArray(relic_setsFR);
    const properties =
      lang === "en" ? toArray(propertiesEN) : toArray(propertiesFR);
    const lightconesRanks =
      lang === "en" ? toArray(light_cone_ranksEN) : toArray(light_cone_ranksFR);

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
