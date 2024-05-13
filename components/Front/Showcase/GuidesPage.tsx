"use client";
import NavBar from "@/components/Front/NavBar";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "next-client-cookies";
import { CharacterType } from "@/types/CharacterModel";
import CharactersList from "@/components/Front/Showcase/CharactersList";
import Footer from "@/components/Front/UID/Footer";
import Aos from "aos";
import { CDN2 } from "@/utils/cdn";
import { PioneerToRemove, replacePioneerName } from "@/utils/PioneerType";
import AddToggleButton from "@/components/Editor/Add/AddToggleButton";

interface charactersListJSON {
  status: number;
  data?: CharacterType[];
}

interface GuidesPageProps {
  character: charactersListJSON;
}

const GuidesPage: React.FC<GuidesPageProps> = ({ character }) => {
  const characterList = useRef<CharacterType[] | undefined>(undefined);

  const [charactersSearch, setCharactersSearch] = useState<
    CharacterType[] | { status: number } | undefined
  >(undefined);
  const [searchInput, setSearchInput] = useState<string>("");
  const [CBA, setCBA] = useState<boolean>(false);
  const [releaseDate, setReleaseDate] = useState<boolean>(true);

  const cookies = useCookies();
  const lang = cookies.get("lang");

  function hasStatus(value: any): value is { status: number } {
    return typeof value === "object" && "status" in value;
  }

  useEffect(() => {
    Aos.init({ disable: window.innerWidth <= 1450 });

    if ("status" in character && character.status === 404) {
      setCharactersSearch({ status: 404 });
      return;
    }

    if (character && character.data) {
      // Filtre les doublons de pionniers
      const Data: CharacterType[] = character.data;
      const filteredCharacters = Data.filter(
        (objet) => !PioneerToRemove.includes(objet.id)
      );
      const remplacedCharacters = replacePioneerName(lang, filteredCharacters);

      characterList.current = remplacedCharacters;
      setCharactersSearch(remplacedCharacters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(charactersSearch) && characterList.current) {
      const remplacedCharacters = replacePioneerName(
        lang,
        characterList.current
      );

      characterList.current = remplacedCharacters;
      const charactersSearchCopy = [...remplacedCharacters].filter((text) =>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CBA, searchInput, releaseDate, lang]);

  if (charactersSearch) {
    return (
      <>
        <NavBar />
        <div
          style={{
            backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
            zIndex: -10,
          }}
          data-aos="animate-stars"
        />
        <div className="min-h-[calc(100vh-205px)]">
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
        <div
          style={{
            backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
            zIndex: -10,
          }}
          data-aos="animate-stars"
        />
        <div className="min-h-[calc(100vh-226px)]">
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
      <div
        style={{
          backgroundImage: `url("${CDN2}/img/homepage/stars.svg")`,
          zIndex: -10,
        }}
        data-aos="animate-stars"
      />
      <div className="flex w-screen h-[calc(100vh-205px)] justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-24 h-24 text-gray animate-spin  fill-orange"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      </div>
      <Footer lang={lang} />
    </>
  );
};

export default GuidesPage;
