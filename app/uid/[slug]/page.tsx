import Footer from "@/components/Front/Footer";
import UidPage from "@/components/Front/UidPage";
import { CDN } from "@/utils/cdn";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: number };
};

async function getData(uid: number) {
  const data = await fetch(
    `https://api.mihomo.me/sr_info_parsed/${uid}?lang=fr&is_force_update=true`,
    {
      next: { revalidate: 300 },
    }
  );

  const jsonData = await data.json();
  if (!data.ok) {
    if (jsonData.detail === "User not found") {
      return Response.json({ status: 404 });
    }

    if (jsonData.detail === "Invalid uid") {
      return Response.json({ status: 400 });
    }

    return Response.json({ status: 503 });
  }

  return Response.json({ status: 200, ...jsonData });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await getData(params.slug);
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
  const res = await getData(params.slug);
  const json = await res.json();
  return (
    <>
      <UidPage json={json} />
      <Footer />
    </>
  );
}
