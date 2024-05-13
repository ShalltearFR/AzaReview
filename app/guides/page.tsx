import GuidesPage from "@/components/Front/Showcase/GuidesPage";
import { CharacterType } from "@/types/CharacterModel";
import { CDN2 } from "@/utils/cdn";
import { Metadata } from "next";

interface charactersListJSON {
  status: number;
  data?: CharacterType[];
}

export const metadata: Metadata = {
  metadataBase: new URL(CDN2),
  title: `Review HSR - Guides`,
  description: `Guides des personnages Honkai: Star Rail`,
  openGraph: {
    images: [`/img/homepage/logo_SRE.webp`],
  },
};

const getData = async (
  url: string,
  revalidate: number,
  isMetadata?: boolean
) => {
  const data = await fetch(url, {
    next: { revalidate: revalidate },
  });
  const jsonData = await data.json();

  if (isMetadata) return Response.json(jsonData);

  return jsonData;
};

const Guides: React.FC = async () => {
  const character: charactersListJSON = await getData(
    `${process.env.WWW}/api/characters/all`,
    300
  );

  if (!character)
    return (
      <div className="mt-10 text-center text-xl font-bold">
        {"Erreur avec le site, veuillez contacter l'administrateur"}
      </div>
    );

  return <GuidesPage character={character} />;
};

export default Guides;
