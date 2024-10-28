import GuidesPage from "@/components/Front/Showcase/GuidesPage";
import { CharacterType } from "@/types/CharacterModel";
import type { TranslateSection } from "@/types/homepageDictionnary";
import { PioneerToRemove, replacePioneersName } from "@/utils/PioneerType";
import { CDN2 } from "@/utils/cdn";
import { Metadata } from "next";
import { cookies } from "next/headers";

interface charactersListJSON {
  status: number;
  data?: CharacterType[];
}

export const metadata: Metadata = {
  metadataBase: new URL(CDN2),
  title: `Review HSR - Liste des personnages`,
  description: `Liste des personnages Honkai: Star Rail`,
  openGraph: {
    images: [`/img/homepage/logo_SRE.webp`],
  },
};

export const dynamic = "force-static";
export const revalidate = 3600; // refresh toutes les heures

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
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value as keyof TranslateSection;

  const character: charactersListJSON = await getData(
    `${process.env.WWW}/api/characters/all`,
    3600
  );

  if (character?.data) {
    const Data: CharacterType[] = character.data;
    const filteredCharacters = Data.filter(
      (objet) => !PioneerToRemove.includes(objet.id)
    );
    const remplacedCharacters = await replacePioneersName(
      lang,
      filteredCharacters
    );

    return <GuidesPage character={remplacedCharacters} lang={lang} />;
  }

  return (
    <div className="mt-10 text-center text-xl font-bold">
      {"Erreur avec le site, veuillez contacter l'administrateur, pages Guides"}
    </div>
  );
};

export default Guides;
