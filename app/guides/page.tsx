"use client";
import NavBar from "@/components/Front/NavBar";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "next-client-cookies";
import { CharacterType } from "@/types/CharacterModel";
import CharactersList from "@/components/Front/Showcase/CharactersList";
import Footer from "@/components/Front/UID/Footer";
import Aos from "aos";
import { CDN2 } from "@/utils/cdn";
import { PioneerToRemove } from "@/utils/PioneerType";

interface charactersListJSON {
  status: number;
  data?: CharacterType[];
}

const Guides: React.FC = () => {
  const characterList = useRef<CharacterType[] | undefined>(undefined);

  const [charactersSearch, setCharactersSearch] = useState<
    CharacterType[] | { status: number } | undefined
  >(undefined);
  const [searchInput, setSearchInput] = useState<string>("");

  const cookies = useCookies();
  const lang = cookies.get("lang");

  function hasStatus(value: any): value is { status: number } {
    return typeof value === "object" && "status" in value;
  }

  useEffect(() => {
    Aos.init({ disable: window.innerWidth <= 1450 });

    fetch("/api/characters/all", { next: { revalidate: 300 } })
      .then((res) => res.json())
      .then((json: charactersListJSON) => {
        if (json.status === 200) {
          // Filtre les doublons de pionniers
          const Data = json.data as CharacterType[];
          const filteredCharacters = Data.filter(
            (objet) => !PioneerToRemove.includes(objet.id)
          );
          setCharactersSearch(filteredCharacters);
          characterList.current = filteredCharacters;
        } else setCharactersSearch({ status: 404 });
      })
      .catch(() => setCharactersSearch({ status: 404 }));
  }, []);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    if (characterList.current) {
      const dataBaseCharactersCopy = [...characterList.current].filter((text) =>
        text.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setCharactersSearch(dataBaseCharactersCopy);
    }
  };

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
          <input
            className="flex mt-10 mx-auto sm:ml-auto sm:mr-5 rounded-full pl-5 text-lg h-10 w-64"
            value={searchInput}
            onChange={(e) => {
              handleChangeInput(e);
            }}
            placeholder="Rechercher un personnage"
          />
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

export default Guides;
