"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import ReactSelect from "react-select";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Modal from "react-modal";
import NavBarEditor from "@/components/Editor/NavBarEditor";
import CharacterCard from "@/components/Editor/CharacterCard";
import { CDN } from "@/utils/cdn";
import { toast } from "react-toastify";

type Character = {
  id: string;
  preview: string;
  name: string;
  portrait: string;
  path: string;
};

interface Option {
  value: string;
  label: string;
  preview: string;
  name: string;
  portrait: string;
  path: string;
}

const CharacterList: React.FC = () => {
  const allCharactersRef = useRef<Character[] | undefined>();

  const dataBaseCharactersRef = useRef<any>(undefined);
  const [charactersSearch, setCharactersSearch] = useState<any>(undefined);
  const [charactersSearchInput, setCharactersSearchInput] =
    useState<string>("");

  const selectOptionsRef = useRef<Option[] | undefined>();

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [enableDeleteModal, setEnableDeleteModal] = useState<boolean>(false);
  const [cardCharacterID, setCardCharacterID] = useState<string>("");

  const getAllCharacters = async () => {
    const res = await fetch(`${CDN}/index_min/fr/characters.json`, {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return Object.values(data).map((item) => item) as Character[];
  };

  const getDataBaseCharacters = async () => {
    const res = await fetch("/api/characters");
    return res.json();
  };

  const getCharactersOptions = useMemo(
    () => () => {
      if (allCharactersRef.current && dataBaseCharactersRef.current) {
        const filter = allCharactersRef.current.filter(
          (obj: Character) =>
            !dataBaseCharactersRef.current.some(
              (item: Character) => item.id === obj.id
            )
        );

        const options = filter.map((el) => ({
          value: el.id,
          label: el.name.toLocaleLowerCase(),
          preview: el.preview,
          portrait: el.portrait,
          name: el.name,
          path: el.path,
        }));

        selectOptionsRef.current = options;
        setSelectedOption(options[0]);
      }
    },
    []
  );

  const init = async () => {
    const allCharactersData = await getAllCharacters();
    const dataBaseCharactersData = await getDataBaseCharacters();

    allCharactersRef.current = allCharactersData;
    setCharactersSearch(dataBaseCharactersData);
    dataBaseCharactersRef.current = dataBaseCharactersData;
    getCharactersOptions();
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCharactersOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCharactersRef.current, dataBaseCharactersRef.current]);

  const addCharacterToDB = (
    e: React.MouseEvent<HTMLButtonElement>,
    character: Option
  ) => {
    e.stopPropagation();
    const data = {
      data: {
        id: character.value,
        preview: character.preview,
        portrait: character.portrait,
        name: character.name,
        path: character.path,
      },
    };

    fetch("/api/character", {
      method: "POST",
      cache: "no-cache",
      next: { revalidate: 0 },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) toast.success("Ajout de personnage réussi");
        else toast.error("Erreur d'ajout de personnage");
        init();
      });
  };

  const deleteCharacterFromDB = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    setCardCharacterID(id);
    setEnableDeleteModal(true);
  };

  const deleteConfirmCharacterFromDB = () => {
    fetch("/api/character", {
      method: "DELETE",
      cache: "no-cache",
      next: { revalidate: 0 },
      body: JSON.stringify({ id: cardCharacterID }),
    })
      .then((res) => res.json())
      .then((data: any) => {
        if (data && data.message === "ok")
          toast.success("Suppression de personnage réussi");
        else toast.error("Erreur de suppression de personnage");
        init();
        setEnableDeleteModal(false);
      });
  };

  useEffect(() => {
    if (dataBaseCharactersRef.current) {
      const dataBaseCharactersCopy = [...dataBaseCharactersRef.current].filter(
        (text) =>
          text.name.toLowerCase().includes(charactersSearchInput.toLowerCase())
      );
      setCharactersSearch(dataBaseCharactersCopy);
    }
  }, [charactersSearchInput]);

  return (
    <div>
      <NavBarEditor />

      <div className="mt-5">
        <Modal
          isOpen={enableDeleteModal}
          onRequestClose={() => setEnableDeleteModal(false)}
          ariaHideApp={false}
          style={{
            overlay: {
              zIndex: "50",
              backgroundColor: "#000000CC",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#FFFFFF",
            },
          }}
        >
          <div className="flex flex-col justify-center">
            <p className="mb-5 text-xl font-bold">
              {"C'est votre ultime bafouille ?"}
            </p>
            <button
              onClick={deleteConfirmCharacterFromDB}
              className="bg-red p-2 border mx-auto rounded-full"
            >
              Supprimer le personnage
            </button>
          </div>
        </Modal>
        <section className="grid grid-cols-[1fr_320px] justify-center min-h-[calc(100vh-260px)]">
          <div>
            <div className="relative">
              <input
                placeholder="Recherche de personnage dans la DB"
                className="absolute right-0 rounded-xl p-2 w-72"
                onChange={(e) => setCharactersSearchInput(e.target.value)}
                value={charactersSearchInput}
              />
              <div className="text-center font-bold text-white mx-auto w-96 p-2 rounded-full bg-black mb-5">
                Personnages dans la base de donnée
              </div>
            </div>
            <div className="flex flex-wrap gap-5 px-5 justify-center border-r border-dashed">
              {charactersSearch &&
                charactersSearch.map((data: Character) => (
                  <div key={`dataCard+${data.id}`}>
                    <CharacterCard
                      id={data.id}
                      preview={data.preview}
                      del={deleteCharacterFromDB}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div>
            {selectOptionsRef.current && (
              <div className="mx-auto w-[211px]">
                <p className="flex text-center font-bold rounded-t-full text-white bg-black box-border h-7 items-end justify-center mt-[60px]">
                  Personnages non setup
                </p>

                <div className="bg-black relative">
                  <button
                    className={`absolute z-10 w-12 p-2 bg-green rounded-full border-black border bottom-0`}
                    onMouseDown={
                      selectedOption
                        ? (e) => addCharacterToDB(e, selectedOption)
                        : () => {}
                    }
                  >
                    <ArrowLeftStartOnRectangleIcon />
                  </button>

                  <ReactSelect
                    options={selectOptionsRef.current}
                    value={selectedOption}
                    onChange={(option) => setSelectedOption(option)}
                    hideSelectedOptions
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: "0",
                        borderRadius: "0",
                        backgroundColor: "black",
                      }),
                      input: (base) => ({
                        ...base,
                        paddingLeft: "40px",
                        color: "white",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "black",
                      }),
                    }}
                    formatOptionLabel={(option: Option) => (
                      <div>
                        <img
                          src={`${CDN}/${option.preview}`}
                          className="w-48"
                          alt={option.label}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CharacterList;
