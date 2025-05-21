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
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import ReactSelect from "react-select";

interface CharactersChoiceProps {
  data: CharacterType[];
  setCharacters: React.Dispatch<React.SetStateAction<CharacterMultiEdit[]>>;
  characters: CharacterMultiEdit[];
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
}) => {
  const [openCharactersMenu, setOpenCharactersMenu] = useState(false);
  const [charactersOptions, setCharactersOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    // Récupération des options de personnages
    const options = data.map((el) => ({
      value: el.id,
      label: el.name,
      preview: el.preview,
    }));
    setCharactersOptions(options);
    setSelectedOption(options[0]);
    setClient(true);
  }, []);

  if (!client) return null;

  const handleAddCharacter = () => {
    if (selectedOption) {
      // Ajoute le personnage sélectionné à la liste des personnages
      const newCharacters = [...characters];
      const currentCharacter = data.find(
        (el) => el.id === selectedOption.value
      );
      newCharacters.push({
        id: selectedOption.value,
        preview: selectedOption.preview,
        buildsChecked: Array(currentCharacter?.data?.length ?? 1).fill(true),
        buildsName: currentCharacter?.data?.map((el) => el.buildName) ?? [],
      });
      setCharacters(newCharacters);

      // Retire le personnage sélectionné de la liste des options
      const newOptions = [...charactersOptions];
      newOptions.splice(
        newOptions.findIndex((el) => el.value === selectedOption.value),
        1
      );
      setCharactersOptions(newOptions);
      setSelectedOption(newOptions[0]);
    }
  };

  const handleDeleteCharacter = (id: string) => {
    const currentCharacter = data.find((el) => el.id === id);

    if (currentCharacter) {
      // Ajoute le personnage sélectionné à la liste des options
      const newOptions = [...charactersOptions];
      newOptions.push({
        value: currentCharacter.id,
        label: currentCharacter.name,
        preview: currentCharacter.preview,
      });

      // Supprime le personnage sélectionné de la liste des personnages
      const newCharacters = [...characters];
      newCharacters.splice(
        newCharacters.findIndex((el) => el.id === id),
        1
      );
      setCharacters(newCharacters);
      setCharactersOptions(newOptions);
      setSelectedOption(newOptions[0]);
    }
  };

  const handleCheck = (
    id: string,
    characterIndex: number,
    characterBooleanCheck: number
  ) => {
    const currentCharacter = data.find((el) => el.id === id);
    const newCharacters = [...characters];
    newCharacters[characterIndex].buildsChecked[characterBooleanCheck] =
      !newCharacters[characterIndex].buildsChecked[characterBooleanCheck];
    setCharacters(newCharacters);
  };

  return (
    <div className="bg-black/50">
      <div className="bg-gray-800 p-4 text-white">
        {/* Barre supérieure du menu avec le bouton */}
        <button
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

        {/* Contenu du menu déroulant */}
        <div
          className={`${
            openCharactersMenu
              ? "min-h-60 max-h-full"
              : "min-h-0 max-h-0 overflow-hidden"
          }`}
        >
          <div className="flex justify-center items-center mt-5 gap-5">
            <div className="relative w-72">
              <ReactSelect
                options={charactersOptions}
                value={selectedOption}
                onChange={(option: any) => setSelectedOption(option)}
                hideSelectedOptions
                styles={{
                  // width: "160px",
                  control: (base: any) => ({
                    ...base,
                    border: "0",
                    borderRadius: "0",
                    backgroundColor: "white",
                    color: "black",
                  }),
                  input: (base: any) => ({
                    ...base,
                    paddingLeft: "40px",
                    color: "black",
                  }),
                  menu: (base: any) => ({
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
                className="absolute p-2 h-10 w-10 bg-green rounded-full text-black bottom-0 left-0"
                onClick={() => handleAddCharacter()}
              >
                <ArrowLeftStartOnRectangleIcon className="-rotate-90" />
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-700 grid grid-cols-5 gap-4">
            {/* Exemple d'éléments du menu */}
            {characters.map((character, characterListIndex) => (
              <div
                key={`characterCard+${character.id}`}
                className="bg-white text-black p-2 rounded shadow-md text-center"
              >
                <div className="relative flex justify-center">
                  <img
                    src={`${CDN}/${character.preview}`} // Remplace avec l'image de personnage réelle
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
                  <button className="absolute p-2 h-10 w-10 bg-red rounded-bl-full text-black top-0 right-0">
                    <ArrowLeftStartOnRectangleIcon
                      className="rotate-90 pr-[6px]"
                      onClick={() => handleDeleteCharacter(character.id)}
                    />
                  </button>
                  <div className="h-36 w-full bg-black rounded-xl" />
                </div>
                <ul className="flex flex-col gap-2 justify-center mt-2">
                  {character.buildsChecked.map((ischecked, characterIndex) => (
                    <li
                      key={`characterCardChecked+${character.id}+${characterIndex}`}
                      className="flex gap-2 items-center"
                    >
                      <span
                        className="flex justify-center items-center w-6 h-6 border rounded-md"
                        onClick={() =>
                          handleCheck(
                            character.id,
                            characterListIndex,
                            characterIndex
                          )
                        }
                      >
                        {ischecked ? <CheckIcon className="w-5 h-5" /> : ""}
                      </span>
                      <span className="text-sm">
                        {character.buildsName[characterIndex]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharactersChoice;
