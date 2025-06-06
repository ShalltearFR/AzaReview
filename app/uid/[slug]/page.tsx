import Footer from "@/components/Front/UID/Footer";
import UidPage from "@/components/Front/UID/UidPage";
import { Character, jsonUID } from "@/types/jsonUid";
import { CDN } from "@/utils/cdn";
import shareCharactersStats from "@/utils/shareCharactersStats";
import type { Metadata } from "next";
import relic_setsFR from "@/static/relic_setsFR.json";
import light_conesFR from "@/static/light_conesFR.json";
import character_ranksFR from "@/static/character_ranksFR.json";
import relicsFR from "@/static/relicsFR.json";
import propertiesFR from "@/static/propertiesFR.json";

export const dynamic = "force-dynamic";

async function getData(url: string, convertToObject?: boolean) {
  const data = await fetch(url, {
    cache: "no-store",
  });
  const dataJson = await data.json();
  if (convertToObject) {
    const toArray = Object.values(dataJson).map((item) => item);
    return toArray;
  }
  return dataJson;
}

async function getDataUid(endpoint: string, uid: number) {
  const data = await fetch(
    `https://api.mihomo.me/${endpoint}/${uid}?lang=fr&is_force_update=true`,
    {
      headers: {
        "User-Agent": "https://review-hsr.vercel.app",
        Host: "api.mihomo.me",
      },
      next: { revalidate: 300 },
    }
  );

  const jsonData = await data.json();
  // const status = 504; // Simule une erreur 504 pour les tests
  // return Response.json({ status });
  if (!data.ok) {
    let status;
    switch (jsonData.detail) {
      case "User not found":
        status = 404;
        break;
      case "Invalid uid":
        status = 400;
        break;
      default:
        status = 504;
    }
    return Response.json({ status });
  }
  return Response.json({ status: 200, ...jsonData });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: number }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await getDataUid("sr_info_parsed", slug);
  const json = await res.json();

  if (json.player) {
    return {
      metadataBase: new URL(CDN),
      title: `Review HSR de ${json.player.nickname}`,
      description: `Review Honkai : Star Rail sur le compte de ${json.player.nickname} - Pionnier ${json.player.level} - UID : ${json.player.uid}`,
      openGraph: {
        images: [`/${json.player.avatar.icon}`],
      },
    };
  }

  return {
    metadataBase: new URL(CDN),
    title: `Review HSR`,
    description: `Review Honkai : Star Rail - UID non existant`,
    openGraph: {
      images: [`/icon/avatar/8004.png`],
    },
  };
}

const sharedUID: string[] = [];
const isAllreadyShared = (uid: string) => {
  if (sharedUID.includes(uid)) return true;
  return false;
};

// Remise à zéro de la liste des UID partagés toutes les 30 minutes
setInterval(
  () => {
    sharedUID.length = 0;
  },
  1000 * 60 * 30
);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const { slug } = await params;

  //Recupère les infos du joueur
  const resUid = await getDataUid("sr_info_parsed", slug);
  const jsonUid: jsonUID = await resUid.json();

  // Partage les stats des personnages
  if (jsonUid.characters && !isAllreadyShared(jsonUid.player.uid)) {
    jsonUid.characters.map((character: Character) =>
      shareCharactersStats(character, jsonUid.player.uid)
    );
    sharedUID.push(jsonUid.player.uid);
  }

  const [resReview, changelog] = await Promise.all([
    getData(`${process.env.WWW}/api/characters/all`, false),
    getData(`${process.env.WWW}/api/changelog/all`, false),
  ]);

  if (!jsonUid || !resReview) {
    return <div className="text-center mt-10">Chargement en cours ...</div>;
  }

  try {
    if (jsonUid.status === 504) {
      return (
        <>
          <UidPage
            jsonUid={{ status: 200 }}
            jsonReview={resReview}
            statsTranslate={propertiesFR}
            relicsSetTranslate={relic_setsFR}
            lightconesTranslate={light_conesFR}
            RelicsList={relicsFR}
            eidolonsList={character_ranksFR}
            changelog={changelog}
            error504
          />
          <Footer />
        </>
      );
    }

    return (
      <>
        <UidPage
          jsonUid={jsonUid}
          jsonReview={resReview}
          statsTranslate={propertiesFR}
          relicsSetTranslate={relic_setsFR}
          lightconesTranslate={light_conesFR}
          RelicsList={relicsFR}
          eidolonsList={character_ranksFR}
          changelog={changelog}
        />
        <Footer />
      </>
    );
  } catch (err) {
    return (
      <>
        <UidPage
          jsonUid={{ status: 200 }}
          jsonReview={resReview}
          statsTranslate={propertiesFR}
          relicsSetTranslate={relic_setsFR}
          lightconesTranslate={light_conesFR}
          RelicsList={relicsFR}
          eidolonsList={character_ranksFR}
          changelog={changelog}
          error504
        />
        <Footer />
      </>
    );
  }
}
