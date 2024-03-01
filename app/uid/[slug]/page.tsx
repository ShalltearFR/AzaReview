import Footer from "@/components/Front/Footer";
import UidPage from "@/components/Front/UidPage";
import { CharacterType } from "@/types/CharacterModel";
import { Character, jsonUID } from "@/types/jsonUid";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";

type Props = {
  params: { slug: number };
};

interface ReviewData {
  data: CharacterType[];
}

async function getData(url: string) {
  const data = await fetch(url, {
    next: { revalidate: 0 },
  });
  const dataJson = await data.json();
  return dataJson;
}

async function getDataUid(uid: number) {
  const data = await fetch(
    `https://api.mihomo.me/sr_info_parsed/${uid}?lang=fr&is_force_update=true`,
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
        status = 503;
    }
    return Response.json({ status });
  }
  return Response.json({ status: 200, ...jsonData });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await getDataUid(params.slug);
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
  //Recupère les infos du joueur
  const resUid = await getDataUid(params.slug);
  const jsonUid: jsonUID = await resUid.json();

  //Recupère les reviews
  const resReview: ReviewData = await getData(
    `${process.env.WWW}/api/characters/all`
  );

  if (!jsonUid || !resReview) {
    return <div className="text-center mt-10">Chargement en cours ...</div>;
  }

  return (
    <>
      <UidPage jsonUid={jsonUid} jsonReview={resReview} />
      <Footer />
    </>
  );
}
