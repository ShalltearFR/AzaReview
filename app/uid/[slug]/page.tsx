import Footer from "@/components/Front/UID/Footer";
import UidPage from "@/components/Front/Homepage/UidPage";
import { CharacterType } from "@/types/CharacterModel";
import { jsonUID } from "@/types/jsonUid";
import { CDN, CDN2 } from "@/utils/cdn";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import NavBar from "@/components/Front/NavBar";

type Props = {
  params: { slug: number };
};

interface ReviewData {
  data: CharacterType[];
}

async function getData(url: string, revalidationValue: number) {
  const data = await fetch(url, {
    next: { revalidate: revalidationValue },
  });
  const dataJson = await data.json();
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
  const lang = cookieStore.get("lang");

  //Recupère les infos du joueur
  const resUid = await getDataUid(params.slug, lang?.value);
  const jsonUid: jsonUID = await resUid.json();

  //Recupère les reviews
  const resReview: ReviewData = await getData(
    `${process.env.WWW}/api/characters/all`,
    300 //Cache de 5min
  );

  //Recupère les traductions de stats
  const statsTranslate: Array<any> = await getData(
    `${CDN}/index_min/${lang?.value || "fr"}/properties.json`,
    86400 //Cache de 24h
  );
  const statsTranslateToArray = Object.values(statsTranslate);

  //Recupère les traductions des sets de relics
  const relicsSetTranslate: Array<any> = await getData(
    `${CDN}/index_min/${lang?.value || "fr"}/relic_sets.json`,
    18000 //Cache de 5h
  );
  const relicsSetTranslateToArray = Object.values(relicsSetTranslate);

  //Recupère les traductions des lightcones
  const lightconesTranslate: Array<any> = await getData(
    `${CDN}/index_min/${lang?.value || "fr"}/light_cones.json`,
    18000 //Cache de 5h
  );
  const lightconesTranslateToArray = Object.values(lightconesTranslate);

  //Recupère les traductions des relics
  const relicsList: Array<any> = await getData(
    `${CDN}/index_min/${lang?.value || "fr"}/relics.json`,
    18000 //Cache de 5h
  );
  const relicsListArray = Object.values(relicsList);

  //Recupère la liste des eidolons de tous les personnages
  const eidolonsList: Array<any> = await getData(
    `${CDN}/index_min/${lang?.value || "fr"}/character_ranks.json`,
    18000 //Cache de 5h
  );
  const eidolonsListArray = Object.values(eidolonsList);

  if (!jsonUid || !resReview) {
    return <div className="text-center mt-10">Chargement en cours ...</div>;
  }

  if (jsonUid.status === 504) {
    return (
      <>
        <div className="overflow-hidden min-h-[calc(100vh-270px)]">
          <div
            style={{
              backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
              zIndex: -10,
            }}
            data-aos="animate-stars"
          />
          <NavBar />
          <div className="text-3xl text-white font-bold">
            {"L'API reçoit trop de requetes, veuillez relancer plus tard"}
          </div>
        </div>
        <Footer lang={lang?.value} />
      </>
    );
  }

  console.log(jsonUid);

  return (
    <>
      <UidPage
        jsonUid={jsonUid}
        jsonReview={resReview}
        statsTranslate={statsTranslateToArray}
        relicsSetTranslate={relicsSetTranslateToArray}
        lightconesTranslate={lightconesTranslateToArray}
        RelicsList={relicsListArray}
        eidolonsList={eidolonsListArray}
        lang={lang?.value}
      />
      <Footer lang={lang?.value} />
    </>
  );
}
