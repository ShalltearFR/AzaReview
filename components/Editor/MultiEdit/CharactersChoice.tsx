/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { CharacterType } from "@/types/CharacterModel";
import { CharacterMultiEdit } from "@/types/EditorPage";
import { CDN } from "@/utils/cdn";

import {
  ArrowLeftStartOnRectangleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

interface CharactersChoiceProps {
  data: CharacterType[];
  setCharacters: React.Dispatch<React.SetStateAction<CharacterMultiEdit[]>>;
  characters: CharacterMultiEdit[];

  /**
   * false ou non fourni = affichage normal avec image
   * true = affichage texte à la place de l'image
   */
  textMode?: boolean;
  openMenu?: boolean;
}

interface Option {
  value: string;
  label: string;
  preview: string;
}

const CharactersChoice: React.FC<CharactersChoiceProps> = ({
  data,
  setCharacters,
  characters,
  textMode = false,
  openMenu = false,
}) => {
  const [openCharactersMenu, setOpenCharactersMenu] = useState(openMenu);

  const [charactersOptions, setCharactersOptions] = useState<Option[]>([]);

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    const options: Option[] = data.map((el) => ({
      value: el.id,
      label: el.name,
      preview: el.preview,
    }));

    setCharactersOptions(options);
    setSelectedOption(options[0] ?? null);
  }, [data]);

  const handleAddCharacter = () => {
    if (!selectedOption) {
      return;
    }

    const currentCharacter = data.find((el) => el.id === selectedOption.value);

    if (!currentCharacter) {
      return;
    }

    const newCharacter: CharacterMultiEdit = {
      id: selectedOption.value,
      preview: selectedOption.preview,
      buildsChecked: Array(currentCharacter.data?.length ?? 1).fill(true),
      buildsName: currentCharacter.data?.map((el) => el.buildName) ?? [],
    };

    setCharacters((currentCharacters) => [...currentCharacters, newCharacter]);

    const newOptions = charactersOptions.filter(
      (option) => option.value !== selectedOption.value
    );

    setCharactersOptions(newOptions);
    setSelectedOption(newOptions[0] ?? null);
  };

  const handleDeleteCharacter = (id: string) => {
    const currentCharacter = data.find((el) => el.id === id);

    if (!currentCharacter) {
      return;
    }

    const newOption: Option = {
      value: currentCharacter.id,
      label: currentCharacter.name,
      preview: currentCharacter.preview,
    };

    const newOptions = [...charactersOptions, newOption];

    setCharactersOptions(newOptions);

    setCharacters((currentCharacters) =>
      currentCharacters.filter((character) => character.id !== id)
    );

    setSelectedOption(newOptions[0] ?? null);
  };

  const handleCheck = (
    id: string,
    characterIndex: number,
    characterBooleanCheck: number
  ) => {
    const currentCharacter = data.find((el) => el.id === id);

    if (!currentCharacter) {
      return;
    }

    setCharacters((currentCharacters) => {
      const newCharacters = [...currentCharacters];

      newCharacters[characterIndex] = {
        ...newCharacters[characterIndex],
        buildsChecked: [...newCharacters[characterIndex].buildsChecked],
      };

      newCharacters[characterIndex].buildsChecked[characterBooleanCheck] =
        !newCharacters[characterIndex].buildsChecked[characterBooleanCheck];

      return newCharacters;
    });
  };

  return (
    <div className="bg-black/50">
      <div className="bg-gray-800 p-4 text-white">
        <button
          type="button"
          className="flex w-full justify-between items-center border-b border-gray-600 pb-2"
          onClick={() => setOpenCharactersMenu(!openCharactersMenu)}
        >
          <h2 className="text-xl font-bold">Liste des personnages</h2>

          <span className="text-lg focus:outline-none">
            {openCharactersMenu ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </span>
        </button>

        <div
          className={`${
            openCharactersMenu
              ? "min-h-60 max-h-full"
              : "min-h-0 max-h-0 overflow-hidden"
          }`}
        >
          <div className="flex justify-center items-center mt-5 gap-5">
            <div className="relative w-72">
              <ReactSelect<Option, false>
                options={charactersOptions}
                value={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                hideSelectedOptions
                styles={{
                  control: (base) => ({
                    ...base,
                    border: "0",
                    borderRadius: "0",
                    backgroundColor: "white",
                    color: "black",
                  }),

                  input: (base) => ({
                    ...base,
                    paddingLeft: "40px",
                    color: "black",
                  }),

                  menu: (base) => ({
                    ...base,
                    backgroundColor: "white",
                  }),
                }}
                formatOptionLabel={(option: Option) => (
                  <div>
                    <span className="ml-10 text-black">{option.label}</span>
                  </div>
                )}
              />

              <button
                type="button"
                className="absolute p-2 h-10 w-10 bg-green rounded-full text-black bottom-0 left-0"
                onClick={handleAddCharacter}
              >
                <ArrowLeftStartOnRectangleIcon className="-rotate-90" />
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-700">
            {textMode ? (
              // =========================
              // MODE TEXTE
              // =========================
              <div className="flex gap-2 flex-wrap justify-center items-center">
                {characters.map((character) => (
                  <div
                    key={`characterText+${character.id}`}
                    className="flex items-center justify-between bg-white text-black rounded-md w-24 p-2"
                  >
                    <img
                      src={`${CDN}/icon/avatar/${character.id}.png`}
                      className="w-10 h-10 rounded-full"
                    />

                    <button
                      type="button"
                      className="p-2 bg-red rounded-md"
                      onClick={() => handleDeleteCharacter(character.id)}
                    >
                      <ArrowLeftStartOnRectangleIcon className="rotate-90 w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              // =========================
              // MODE IMAGE
              // =========================
              <div className="grid grid-cols-5 gap-4">
                {characters.map((character, characterListIndex) => (
                  <div
                    key={`characterCard+${character.id}`}
                    className="bg-white text-black p-2 rounded shadow-md text-center"
                  >
                    <div className="relative flex justify-center">
                      <img
                        src={`${CDN}/${character.preview}`}
                        alt="Personnage"
                        className="absolute mx-auto mb-2 h-36"
                      />

                      <Link
                        href={`/guides/${character.id}`}
                        target="_blank"
                        className="absolute bg-yellow font-bold bottom-0 right-0 p-2 rounded-tl-xl text-xs"
                      >
                        Guide
                      </Link>

                      <button
                        type="button"
                        className="absolute p-2 h-10 w-10 bg-red rounded-bl-full text-black top-0 right-0"
                        onClick={() => handleDeleteCharacter(character.id)}
                      >
                        <ArrowLeftStartOnRectangleIcon className="rotate-90 pr-[6px]" />
                      </button>

                      <div className="h-36 w-full bg-black rounded-xl" />
                    </div>

                    <ul className="flex flex-col gap-2 justify-center mt-2">
                      {character.buildsChecked.map(
                        (isChecked, characterIndex) => (
                          <li
                            key={`characterCardChecked+${character.id}+${characterIndex}`}
                            className="flex gap-2 items-center"
                          >
                            <button
                              type="button"
                              className="flex justify-center items-center w-6 h-6 border rounded-md"
                              onClick={() =>
                                handleCheck(
                                  character.id,
                                  characterListIndex,
                                  characterIndex
                                )
                              }
                            >
                              {isChecked ? (
                                <CheckIcon className="w-5 h-5" />
                              ) : null}
                            </button>

                            <span className="text-sm">
                              {character.buildsName[characterIndex]}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharactersChoice;
