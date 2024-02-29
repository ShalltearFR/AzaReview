import Footer from "@/components/Front/Footer";
import UidPage from "@/components/Front/UidPage";
import { CharacterType } from "@/types/CharacterModel";
import { Character, jsonUID } from "@/types/jsonUid";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";

type Props = {
  params: { slug: number };
};

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

async function getData(url: string) {
  const data = await fetch(`${process.env.WWW}/${url}`, {
    next: { revalidate: 300 },
  });

  const jsonData = await data.json();
  return Response.json(jsonData);
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

  //Recupère les characters ID du joueur
  const charactersIds = jsonUid.characters
    .map((character) => character.id)
    .join(",");

  //Recupère les infos de review
  const resReview = await getData(`/api/characters?ids=${charactersIds}`);
  const jsonReview: CharacterType[] = await resReview.json();

  return (
    <>
      {jsonUid && jsonReview && (
        <>
          <UidPage jsonUid={jsonUid} jsonReview={jsonReview} />
          <Footer />
        </>
      )}
    </>
  );
}
