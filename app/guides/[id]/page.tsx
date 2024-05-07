import ShowCasePage from "@/components/Front/Showcase/ShowCasePage";
import { CDN } from "@/utils/cdn";
import type { Metadata } from "next";
type Props = {
  params: { id: number };
};

async function getData(id: number) {
  const data = await fetch(`${process.env.WWW}/api/character/${id}`, {
    next: { revalidate: 18000 },
  });

  const jsonData = await data.json();

  return Response.json(jsonData);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const res = await getData(params.id);
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

const GuideID = ({ params }: { params: { id: string } }) => {
  return <ShowCasePage id={params.id} />;
};

export default GuideID;
