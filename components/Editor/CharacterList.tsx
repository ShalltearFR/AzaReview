"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import ReactSelect from "react-select";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Modal from "react-modal";
import NavBarEditor from "@/components/Editor/NavBarEditor";
import CharacterCard from "@/components/Editor/CharacterCard";
import { CDN } from "@/utils/cdn";

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
    const res = await fetch("/api/characters", {
      next: { revalidate: 300 },
    });
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
          label: el.id,
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
    }).then(() => init());
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
    }).then(() => {
      init();
      setEnableDeleteModal(false);
    });
  };

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
            <div className="text-center font-bold text-white mx-auto w-96 p-2 rounded-full bg-black mb-5">
              Personnages dans la base de donnée
            </div>
            <div className="flex flex-wrap gap-5 px-5 justify-center border-r border-dashed">
              {dataBaseCharactersRef.current &&
                dataBaseCharactersRef.current.map((data: Character) => (
                  <div key={crypto.randomUUID()}>
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
                  {/* Composant ReactSelect avec la clé ajoutée */}
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
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "black",
                      }),
                    }}
                    formatOptionLabel={(option: Option) => (
                      <div className="">
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
