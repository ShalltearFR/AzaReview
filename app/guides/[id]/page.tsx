import ShowCasePage from "@/components/Front/Showcase/ShowCasePage";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";
import relic_setsFR from "@/static/relic_setsFR.json";
import light_conesFR from "@/static/light_conesFR.json";
import light_cone_ranksFR from "@/static/light_cone_ranksFR.json";
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

const GuideID = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  try {
    const character = await getData(
      `${process.env.WWW}/api/character/${id}`,
      300,
      false
    );

    if (light_conesFR && relic_setsFR && propertiesFR && light_cone_ranksFR) {
      return (
        <ShowCasePage
          character={character}
          lightCones={light_conesFR}
          lightconesRanks={light_cone_ranksFR}
          relicsSet={relic_setsFR}
          properties={propertiesFR}
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
