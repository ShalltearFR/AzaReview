import Footer from "@/components/Front/UID/Footer";
import UidPage from "@/components/Front/UID/UidPage";
import { TranslateSection } from "@/types/homepageDictionnary";
import { Character, jsonUID } from "@/types/jsonUid";
import { CDN } from "@/utils/cdn";
import shareCharactersStats from "@/utils/shareCharactersStats";
import type { Metadata } from "next";
import { cookies } from "next/headers";

type Props = {
  params: { slug: number };
};

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

async function getDataUid(uid: number, lang: string | undefined) {
  const data = await fetch(
    `https://api.mihomo.me/sr_info_parsed/${uid}?lang=${
      lang ?? "fr"
    }&is_force_update=true`,
    {
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await getDataUid(params.slug, undefined);
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

export default async function Page({ params }: { params: { slug: number } }) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value as keyof TranslateSection;

  //Recupère les infos du joueur
  const resUid = await getDataUid(params.slug, lang);
  const jsonUid: jsonUID = await resUid.json();
  // Partage les stats des personnages
  jsonUid.characters.map((character: Character) =>
    shareCharactersStats(character, jsonUid.player.uid)
  );

  const [
    resReview,
    statsTranslate,
    relicsSetTranslate,
    lightconesTranslate,
    relicsList,
    eidolonsList,
    changelog,
  ] = await Promise.all([
    getData(`${process.env.WWW}/api/characters/all`, 5, false),
    getData(`${CDN}/index_min/${lang || "fr"}/properties.json`, 86400, true),
    getData(`${CDN}/index_min/${lang || "fr"}/relic_sets.json`, 18000, true),
    getData(`${CDN}/index_min/${lang || "fr"}/light_cones.json`, 18000, true),
    getData(`${CDN}/index_min/${lang || "fr"}/relics.json`, 18000, true),
    getData(
      `${CDN}/index_min/${lang || "fr"}/character_ranks.json`,
      18000,
      true
    ),
    getData(`${process.env.WWW}/api/changelog/all`, 18000, false),
  ]);

  if (!jsonUid || !resReview) {
    return <div className="text-center mt-10">Chargement en cours ...</div>;
  }

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
}
