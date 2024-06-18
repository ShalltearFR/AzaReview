"use client";
import NavBar from "@/components/Front/NavBar";
import { useEffect, useRef, useState } from "react";
import { CharacterType } from "@/types/CharacterModel";
import CharactersList from "@/components/Front/Showcase/CharactersList";
import Footer from "@/components/Front/UID/Footer";
import Aos from "aos";
import AddToggleButton from "@/components/Editor/Add/AddToggleButton";
import StarBGAnimation from "../StarBGAnimation";
import LoadingSpin from "@/components/LoadingSpin";
import { TranslateSection } from "@/types/homepageDictionnary";

interface GuidesPageProps {
  character: CharacterType[];
  lang: keyof TranslateSection | undefined;
}

const GuidesPage: React.FC<GuidesPageProps> = ({ character, lang }) => {
  const characterList = useRef<CharacterType[] | undefined>(undefined);

  const [charactersSearch, setCharactersSearch] = useState<
    CharacterType[] | { status: number } | undefined
  >(undefined);
  const [searchInput, setSearchInput] = useState<string>("");
  const [CBA, setCBA] = useState<boolean>(false);
  const [releaseDate, setReleaseDate] = useState<boolean>(true);

  function hasStatus(value: any): value is { status: number } {
    return typeof value === "object" && "status" in value;
  }

  useEffect(() => {
    Aos.init({ disable: window.innerWidth <= 1450 });
    const init = async () => {
      if ("status" in character && character.status === 404)
        return { status: 404 };

      characterList.current = character;
      return character;
    };

    init().then((data) => setCharactersSearch(data));
  }, []);

  useEffect(() => {
    if (Array.isArray(charactersSearch) && characterList.current) {
      characterList.current = [...character];
      const charactersSearchCopy = [...character].filter((text) =>
        text.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (!releaseDate) {
        // Trie par ordre alphabetique
        charactersSearchCopy.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      }
      if (CBA) charactersSearchCopy.reverse();
      setCharactersSearch(charactersSearchCopy);
    }
  }, [CBA, searchInput, releaseDate, lang]);

  if (charactersSearch) {
    return (
      <>
        <NavBar />
        <StarBGAnimation />
        <div className="min-h-[calc(100vh-295px)]">
          <div className="mx-auto p-5 bg-gray/45 w-full smd:w-[670px] smd:rounded-3xl mt-10">
            <p className="text-center text-white font-bold text-xl mb-2">
              {lang === "en" ? "Sort by:" : "Trier par :"}
            </p>
            <div className="flex flex-col items-center smd:flex-row gap-2 justify-around">
              <AddToggleButton
                className={lang === "en" ? "w-60" : "w-[320px]"}
                onChange={() => setCBA(!CBA)}
                value={CBA}
                name={
                  lang === "en"
                    ? ["Asc. order", "Desc. order"]
                    : ["Ordre croissant", "Ordre décroissant"]
                }
              />
              <AddToggleButton
                className={lang === "en" ? "w-72" : "w-[300px]"}
                onChange={() => setReleaseDate(!releaseDate)}
                value={releaseDate}
                name={
                  lang === "en"
                    ? ["Alphabetic", "Guide arrivals"]
                    : ["Alphabetique", "Sorties de guide"]
                }
              />
            </div>
            <input
              className="flex mx-auto rounded-full pl-5 text-lg h-10 w-64 mt-5"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={
                lang === "en" ? "Character search" : "Rechercher un personnage"
              }
            />
          </div>
          <CharactersList
            list={charactersSearch as CharacterType[]}
            lang={lang}
          />
        </div>
        <Footer lang={lang} />
      </>
    );
  }

  if (charactersSearch && hasStatus(charactersSearch)) {
    return (
      <>
        <NavBar />
        <StarBGAnimation />
        <div className="min-h-[calc(100vh-295px)]">
          <p className="text-center text-bold text-xl text-white mt-6">
            {"Erreur de requete serveur, contactez l'administrateur"}
          </p>
        </div>
        <Footer lang={lang} />
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
      <Footer lang={lang} />
    </>
  );
};

export default GuidesPage;
