import UidPage from "@/components/Character/UidPage";
import { CDN } from "@/utils/cdn";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: number };
};

async function getData(uid: number) {
  const res = await fetch(`https://review-hsr.vercel.app/api/uid/${uid}`);
  return res.json();
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const res = await getData(params.slug);

  return {
    metadataBase: new URL(CDN),
    title: `Review HSR de ${res.player.nickname}`,
    description: `Review Honkai : Star Rail sur le compte de ${res.player.nickname} - Pionnier ${res.player.level} - UID : ${res.player.uid}`,
    openGraph: {
      images: [`/${res.player.avatar.icon}`],
    },
  };
}

export default async function Page({ params }: { params: { slug: number } }) {
  const data = await getData(params.slug);
  return (
    <>
      <UidPage json={data} />
    </>
  );
}
