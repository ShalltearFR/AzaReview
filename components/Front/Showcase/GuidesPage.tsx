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
import { UIDtitles } from "@/utils/dictionnary";
import { useCookies } from "next-client-cookies";

import type { guidePref } from "@/types/userPref";

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
  const [descentOrder, setDescentOrder] = useState<boolean>(false);
  const [sortArrival, setSortArrival] = useState<boolean>(false);

  function hasStatus(value: any): value is { status: number } {
    return typeof value === "object" && "status" in value;
  }

  useEffect(() => {
    Aos.init({ disable: window.innerWidth <= 1450 });

    if ("status" in character && character.status === 404)
      setCharactersSearch({ status: 404 });
    else {
      characterList.current = character;
      setCharactersSearch(character);
    }

    // Set les prefs utilisateurs sinon les valeurs par defaut
    const item = localStorage.getItem("guidePref");
    const guidePref = item ? JSON.parse(item) : undefined;
    setDescentOrder(guidePref?.sortDescent ?? false);
    setSortArrival(guidePref?.sortArrival ?? false);
  }, []);

  // Sauvegarde les prefs utilisateurs
  useEffect(() => {
    localStorage.setItem(
      "guidePref",
      JSON.stringify({
        sortDescent: descentOrder,
        sortArrival: sortArrival,
      })
    );
  }, [sortArrival, descentOrder]);

  // Trie les personnages
  useEffect(() => {
    if (Array.isArray(charactersSearch) && characterList.current) {
      characterList.current = [...character];
      const charactersSearchCopy = [...character].filter((text) =>
        text.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (!sortArrival) {
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
      if (descentOrder) charactersSearchCopy.reverse();
      setCharactersSearch(charactersSearchCopy);
    }
  }, [descentOrder, searchInput, sortArrival, lang]);

  if (charactersSearch) {
    return (
      <>
        <NavBar />
        <StarBGAnimation />
        <div className="min-h-[calc(100vh-295px)]">
          <div className="mx-auto p-5 bg-gray/45 w-full smd:w-[670px] smd:rounded-3xl mt-10">
            <p className="text-center text-white font-bold text-xl mb-2">
              {UIDtitles[lang ?? "fr"].SortBy}
            </p>
            <div className="flex flex-col items-center smd:flex-row gap-2 justify-around">
              <AddToggleButton
                className={lang === "en" ? "w-60" : "w-[320px]"}
                onChange={() => setDescentOrder(!descentOrder)}
                value={descentOrder}
                name={
                  lang === "en"
                    ? ["Asc. order", "Desc. order"]
                    : ["Ordre croissant", "Ordre décroissant"]
                }
              />
              <AddToggleButton
                className={lang === "en" ? "w-72" : "w-[300px]"}
                onChange={() => setSortArrival(!sortArrival)}
                value={sortArrival}
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
              placeholder={UIDtitles[lang ?? "fr"].CharacterSearch}
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
            {"Erreur de requete serveur 001, contactez l'administrateur"}
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
