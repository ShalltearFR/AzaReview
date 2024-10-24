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
import Filter from "./Filter";
import { FilterListProps } from "@/types/Filter";
import { Star } from "./StarIcon";

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
  const [filterList, setFilterList] = useState<FilterListProps>({
    rarity: {
      star4: false,
      star5: false,
    },
    element: {
      Fire: false,
      Ice: false,
      Imaginary: false,
      Physical: false,
      Quantum: false,
      Thunder: false,
      Wind: false,
    },
    path: {
      Knight: false,
      Mage: false,
      Priest: false,
      Rogue: false,
      Shaman: false,
      Warlock: false,
      Warrior: false,
    },
  });

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

      // Filtrer par nom
      let charactersSearchCopy = [...character].filter((text) =>
        text.name.toLowerCase().includes(searchInput.toLowerCase())
      );

      // Filtrer par rareté
      if (filterList.rarity.star4 || filterList.rarity.star5) {
        charactersSearchCopy = charactersSearchCopy.filter((char) => {
          if (filterList.rarity.star4 && char.rarity === "4") {
            return true;
          }
          if (filterList.rarity.star5 && char.rarity === "5") {
            return true;
          }
          return false; // Exclure ceux qui ne correspondent pas
        });
      }

      // Filtrer par élément
      const activeElements = Object.entries(filterList.element)
        .filter(([_, isActive]) => isActive)
        .map(([element]) => element);

      if (activeElements.length > 0) {
        charactersSearchCopy = charactersSearchCopy.filter((char) =>
          activeElements.includes(char.element)
        );
      }

      // Filtrer par chemin
      const activePaths = Object.entries(filterList.path)
        .filter(([_, isActive]) => isActive)
        .map(([path]) => path);

      if (activePaths.length > 0) {
        charactersSearchCopy = charactersSearchCopy.filter((char) =>
          activePaths.includes(char.path)
        );
      }

      // Appliquer le tri
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
  }, [descentOrder, searchInput, sortArrival, lang, filterList]);

  const handleRarity = (rarity: "star4" | "star5") => {
    const newData = {
      ...filterList,
      rarity: {
        ...filterList.rarity,
        [rarity]: !filterList.rarity[rarity],
      },
    };
    setFilterList(newData);
  };

  if (charactersSearch) {
    return (
      <>
        <NavBar />
        <StarBGAnimation />
        <div className="min-h-[calc(100vh-295px)]">
          <div className="mx-auto p-5 bg-gray/45 w-full smd:w-[670px] smd:rounded-3xl mt-10">
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

            <div className="smd:grid smd:grid-cols-2 mt-5 items-center">
              <input
                className="flex rounded-full pl-5 text-lg h-10 w-64 mx-auto"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={UIDtitles[lang ?? "fr"].CharacterSearch}
              />
              <div className="flex gap-5 mx-auto justify-center mt-5 smd:mt-0 text-white text-lg font-semibold">
                <button
                  className={`flex bg-black/60 rounded-lg items-center p-1 ${
                    filterList.rarity.star4
                      ? "bg-darkGreen2/75 outline-dashed outline-1 outline-red-500"
                      : "bg-black/50"
                  }`}
                  onClick={() => handleRarity("star4")}
                >
                  <Star number={"4"} className="w-7 star4" />
                </button>
                <button
                  className={`flex bg-black/60 rounded-lg items-center p-1 ${
                    filterList.rarity.star5
                      ? "bg-darkGreen2/75 outline-dashed outline-1 outline-red-500"
                      : "bg-black/50"
                  }`}
                  onClick={() => handleRarity("star5")}
                >
                  <Star number={"5"} className="w-7 star5" />
                </button>
              </div>
            </div>

            <div>
              <Filter setData={setFilterList} data={filterList} />
            </div>
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
