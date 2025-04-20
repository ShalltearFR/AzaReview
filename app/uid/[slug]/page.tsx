import Footer from "@/components/Front/UID/Footer";
import UidPage from "@/components/Front/UID/UidPage";
import { TranslateSection } from "@/types/homepageDictionnary";
import { Character, jsonUID } from "@/types/jsonUid";
import { CDN } from "@/utils/cdn";
import shareCharactersStats from "@/utils/shareCharactersStats";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import relic_setsFR from "@/static/relic_setsFR.json";
import relic_setsEN from "@/static/relic_setsEN.json";
import light_conesFR from "@/static/light_conesFR.json";
import light_conesEN from "@/static/light_conesEN.json";
import character_ranksFR from "@/static/character_ranksFR.json";
import character_ranksEN from "@/static/character_ranksEN.json";
import relicsFR from "@/static/relicsFR.json";
import relicsEN from "@/static/relicsEN.json";
import propertiesEN from "@/static/propertiesEN.json";
import propertiesFR from "@/static/propertiesFR.json";

async function getData(
  url: string,
  revalidationValue: number,
  convertToObject?: boolean
) {
  const data = await fetch(url, {
    next: { revalidate: revalidationValue },
  });
  const dataJson = await data.json();
  if (convertToObject) {
    const toArray = Object.values(dataJson).map((item) => item);
    return toArray;
  }
  return dataJson;
}

async function getDataUid(
  endpoint: string,
  uid: number,
  lang: string | undefined
) {
  const data = await fetch(
    `https://api.mihomo.me/${endpoint}/${uid}?lang=${
      lang ?? "fr"
    }&is_force_update=true`,
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
  const res = await getDataUid("sr_info_parsed", slug, undefined);
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
setInterval(() => {
  sharedUID.length = 0;
}, 1000 * 60 * 30);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: number }>;
}) {
  const cookieStore = cookies();
  const lang = (await cookieStore).get("lang")?.value as keyof TranslateSection;
  const { slug } = await params;

  //Recupère les infos du joueur
  const resUid = await getDataUid("sr_info_parsed", slug, lang);
  const jsonUid: jsonUID = await resUid.json();

  // Partage les stats des personnages
  if (jsonUid.characters && !isAllreadyShared(jsonUid.player.uid)) {
    jsonUid.characters.map((character: Character) =>
      shareCharactersStats(character, jsonUid.player.uid)
    );
    sharedUID.push(jsonUid.player.uid);
  }

  const [resReview, changelog] = await Promise.all([
    getData(`${process.env.WWW}/api/characters/all`, 5, false),
    getData(`${process.env.WWW}/api/changelog/all`, 18000, false),
  ]);

  const statsTranslate = lang === "en" ? propertiesEN : propertiesFR;
  const relicsSetTranslate = lang === "en" ? relic_setsEN : relic_setsFR;
  const lightconesTranslate = lang === "en" ? light_conesEN : light_conesFR;
  const relicsList = lang === "en" ? relicsEN : relicsFR;
  const eidolonsList = lang === "en" ? character_ranksEN : character_ranksFR;

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
            statsTranslate={statsTranslate}
            relicsSetTranslate={relicsSetTranslate}
            lightconesTranslate={lightconesTranslate}
            RelicsList={relicsList}
            eidolonsList={eidolonsList}
            lang={lang}
            changelog={changelog}
            error504
          />
          <Footer lang={lang} />
        </>
      );
    }

    return (
      <>
        <UidPage
          jsonUid={jsonUid}
          jsonReview={resReview}
          statsTranslate={statsTranslate}
          relicsSetTranslate={relicsSetTranslate}
          lightconesTranslate={lightconesTranslate}
          RelicsList={relicsList}
          eidolonsList={eidolonsList}
          changelog={changelog}
          lang={lang}
        />
        <Footer lang={lang} />
      </>
    );
  } catch (err) {
    return (
      <>
        <UidPage
          jsonUid={{ status: 200 }}
          jsonReview={resReview}
          statsTranslate={statsTranslate}
          relicsSetTranslate={relicsSetTranslate}
          lightconesTranslate={lightconesTranslate}
          RelicsList={relicsList}
          eidolonsList={eidolonsList}
          lang={lang}
          changelog={changelog}
          error504
        />
        <Footer lang={lang} />
      </>
    );
  }
}
