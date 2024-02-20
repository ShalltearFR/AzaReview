import UidPage from "@/components/Character/UidPage";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const uid = params.slug;

  const product = await fetch(
    `https://review-hsr.vercel.app/api/uid/${uid}`
  ).then((res) => res.json());

  return {
    title: `Review HSR de ${product.player.nickname}`,
    description: `Review Honkai : Star Rail sur le compte de ${product.player.nickname}`,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

export default function Page({ params }: { params: { slug: number } }) {
  return (
    <>
      <UidPage uid={params.slug} />
    </>
  );
}
