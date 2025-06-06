"use client";
import NavBar from "@/components/Front/NavBar";
import { notFound } from "next/navigation";
import { CDN } from "@/utils/cdn";
import Footer from "@/components/Front/UID/Footer";
import { CharacterType, Data } from "@/types/CharacterModel";
import { useEffect, useState } from "react";
import BuildShow from "@/components/Front/Showcase/BuildShow";
import Aos from "aos";
import { replaceCharacterName } from "@/utils/PioneerType";
import StarBGAnimation from "../StarBGAnimation";
import LoadingSpin from "@/components/LoadingSpin";

interface ShowCasePageProps {
  character: CharacterType | undefined | { error: true };
  lightCones: any;
  relicsSet: any;
  properties: any;
  lightconesRanks: any;
}

const ShowCasePage: React.FC<ShowCasePageProps> = ({
  character,
  lightCones,
  relicsSet,
  properties,
  lightconesRanks,
}) => {
  const initCharacter = () => {
    return replaceCharacterName(character as CharacterType).then((character) =>
      setCharacterName(character as string)
    );
  };

  useEffect(() => {
    Aos.init({ disable: window.innerWidth <= 1450 });
    if (character) initCharacter();
  }, []);

  const [characterName, setCharacterName] = useState<string>("");

  const hasStatus = (value: any): value is { status: number } => {
    return typeof value === "object" && "error" in value;
  };
  if (hasStatus(character)) return notFound();

  if (
    character &&
    "portrait" in character &&
    lightCones &&
    relicsSet &&
    properties
  ) {
    const date = new Date(character.updatedAt);
    return (
      <>
        <NavBar />
        <StarBGAnimation />
        <div className="min-h-[calc(100vh-205px)] relative text-white">
          <img
            src={`${CDN}/${character.portrait}`}
            alt={characterName}
            className="fixed -right-1/2 -left-1/2 grayscale opacity-50 object-cover h-full translate-y-5 -z-10 mx-auto"
            fetchPriority="low"
          />
          <p className="font-bold text-4xl text-center mt-10">
            {/* Adapte le nom du personnage, */}
            {characterName}
          </p>
          <p className="text-right mr-3 mmd:absolute mmd:right-3 mmd:top-3 mmd:mr-0">
            {"Dernière mise à jour : "} {date.toLocaleDateString()}
          </p>
          <section className="flex flex-col gap-y-10 mt-10">
            {character.data.map((build: Data, i: number) => (
              <article
                key={`build${i}`}
                className="bg-black/75 p-3 md:p-5 xl:w-[1350px] xl:mx-auto xl:rounded-3xl"
              >
                <BuildShow
                  build={build}
                  i={i}
                  characterID={character.id}
                  lightCones={lightCones}
                  lightconesRanks={lightconesRanks}
                  properties={properties}
                  relicsSet={relicsSet}
                />
              </article>
            ))}
          </section>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <StarBGAnimation />
      <div className="flex w-screen h-[calc(100vh-295px)] justify-center items-center">
        <LoadingSpin />
      </div>
      <Footer />
    </>
  );
};

export default ShowCasePage;
