"use client";

import { useEffect, useState } from "react";
import { RoleIconsOptions } from "./RoleIconsOptions";
import CharactersChoice from "./MultiEdit/CharactersChoice";

import { CharacterType } from "@/types/CharacterModel";
import { CharacterMultiEdit } from "@/types/EditorPage";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Team } from "@/types/Teams";

type TeamsEditorProps = {
  teamId: number;
  handleRemoveTeam: (id: number) => void;
  data: Team;
  handleChange: (data: Team, index: number) => void;
};

export const TeamsEditor = ({
  teamId,
  data,
  handleChange,
  handleRemoveTeam,
}: TeamsEditorProps) => {
  const [charactersData, setCharactersData] = useState<CharacterType[]>([]);
  const [teamName, setTeamName] = useState(data.teamName ?? "");
  const [charactersRole1, setCharactersRole1] = useState<CharacterMultiEdit[]>(
    []
  );
  const [charactersRole2, setCharactersRole2] = useState<CharacterMultiEdit[]>(
    []
  );
  const [charactersRole3, setCharactersRole3] = useState<CharacterMultiEdit[]>(
    []
  );
  const [charactersRole4, setCharactersRole4] = useState<CharacterMultiEdit[]>(
    []
  );

  const [roleIcon1, setRoleIcon1] = useState(
    data.roles?.[0]?.icon ?? "assassin-pocket"
  );

  const [roleIcon2, setRoleIcon2] = useState(
    data.roles?.[1]?.icon ?? "assassin-pocket"
  );

  const [roleIcon3, setRoleIcon3] = useState(
    data.roles?.[2]?.icon ?? "assassin-pocket"
  );

  const [roleIcon4, setRoleIcon4] = useState(
    data.roles?.[3]?.icon ?? "assassin-pocket"
  );

  /*
   * ============================================================
   * NOMS DES RÔLES
   * ============================================================
   */

  const [roleName1, setRoleName1] = useState(data.roles?.[0]?.name ?? "");

  const [roleName2, setRoleName2] = useState(data.roles?.[1]?.name ?? "");

  const [roleName3, setRoleName3] = useState(data.roles?.[2]?.name ?? "");

  const [roleName4, setRoleName4] = useState(data.roles?.[3]?.name ?? "");

  /*
   * ============================================================
   * FETCH DES PERSONNAGES
   * ============================================================
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/characters", {
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result: CharacterType[] = await response.json();

        setCharactersData(result);
      } catch (error) {
        console.error("Error fetch characters:", error);
      }
    };
    fetchData();
  }, []);

  /*
   * ============================================================
   * INITIALISATION DES PERSONNAGES
   * ============================================================
   */

  useEffect(() => {
    if (charactersData.length === 0 || !data.roles) {
      return;
    }

    const createCharacters = (ids: string[]): CharacterMultiEdit[] => {
      return ids
        .map((id) => {
          const character = charactersData.find(
            (character) => character.id === id
          );

          if (!character) {
            return null;
          }

          return {
            id: character.id,
            preview: character.preview,
            buildsChecked: Array(character.data?.length ?? 1).fill(true),
            buildsName: character.data?.map((build) => build.buildName) ?? [],
          };
        })
        .filter(
          (character): character is CharacterMultiEdit => character !== null
        );
    };

    setCharactersRole1(createCharacters(data.roles[0]?.id ?? []));

    setCharactersRole2(createCharacters(data.roles[1]?.id ?? []));

    setCharactersRole3(createCharacters(data.roles[2]?.id ?? []));

    setCharactersRole4(createCharacters(data.roles[3]?.id ?? []));
  }, [charactersData, data.roles]);

  /*
   * ============================================================
   * MISE À JOUR DE LA TEAM
   * ============================================================
   */

  const updateTeam = ({
    newTeamName = teamName,

    newRoleName1 = roleName1,
    newRoleName2 = roleName2,
    newRoleName3 = roleName3,
    newRoleName4 = roleName4,

    newRoleIcon1 = roleIcon1,
    newRoleIcon2 = roleIcon2,
    newRoleIcon3 = roleIcon3,
    newRoleIcon4 = roleIcon4,

    newCharactersRole1 = charactersRole1,
    newCharactersRole2 = charactersRole2,
    newCharactersRole3 = charactersRole3,
    newCharactersRole4 = charactersRole4,
  }: {
    newTeamName?: string;

    newRoleName1?: string;
    newRoleName2?: string;
    newRoleName3?: string;
    newRoleName4?: string;

    newRoleIcon1?: string;
    newRoleIcon2?: string;
    newRoleIcon3?: string;
    newRoleIcon4?: string;

    newCharactersRole1?: CharacterMultiEdit[];
    newCharactersRole2?: CharacterMultiEdit[];
    newCharactersRole3?: CharacterMultiEdit[];
    newCharactersRole4?: CharacterMultiEdit[];
  }) => {
    const team: Team = {
      teamName: newTeamName,
      roles: [
        {
          name: newRoleName1,
          icon: newRoleIcon1,
          id: newCharactersRole1.map((character) => character.id),
        },
        {
          name: newRoleName2,
          icon: newRoleIcon2,
          id: newCharactersRole2.map((character) => character.id),
        },
        {
          name: newRoleName3,
          icon: newRoleIcon3,
          id: newCharactersRole3.map((character) => character.id),
        },
        {
          name: newRoleName4,
          icon: newRoleIcon4,
          id: newCharactersRole4.map((character) => character.id),
        },
      ],
    };

    handleChange(team, teamId);
  };

  /*
   * ============================================================
   * TEAM NAME
   * ============================================================
   */

  const handleTeamNameChange = (value: string) => {
    setTeamName(value);

    updateTeam({
      newTeamName: value,
    });
  };

  /*
   * ============================================================
   * ROLE 1
   * ============================================================
   */

  const handleRoleName1Change = (value: string) => {
    setRoleName1(value);

    updateTeam({
      newRoleName1: value,
    });
  };

  const handleRoleIcon1Change = (value: string) => {
    setRoleIcon1(value);

    updateTeam({
      newRoleIcon1: value,
    });
  };

  const handleCharactersRole1 = (
    value: React.SetStateAction<CharacterMultiEdit[]>
  ) => {
    const newValue =
      typeof value === "function" ? value(charactersRole1) : value;

    setCharactersRole1(newValue);

    updateTeam({
      newCharactersRole1: newValue,
    });
  };

  /*
   * ============================================================
   * ROLE 2
   * ============================================================
   */

  const handleRoleName2Change = (value: string) => {
    setRoleName2(value);

    updateTeam({
      newRoleName2: value,
    });
  };

  const handleRoleIcon2Change = (value: string) => {
    setRoleIcon2(value);

    updateTeam({
      newRoleIcon2: value,
    });
  };

  const handleCharactersRole2 = (
    value: React.SetStateAction<CharacterMultiEdit[]>
  ) => {
    const newValue =
      typeof value === "function" ? value(charactersRole2) : value;

    setCharactersRole2(newValue);

    updateTeam({
      newCharactersRole2: newValue,
    });
  };

  /*
   * ============================================================
   * ROLE 3
   * ============================================================
   */

  const handleRoleName3Change = (value: string) => {
    setRoleName3(value);

    updateTeam({
      newRoleName3: value,
    });
  };

  const handleRoleIcon3Change = (value: string) => {
    setRoleIcon3(value);

    updateTeam({
      newRoleIcon3: value,
    });
  };

  const handleCharactersRole3 = (
    value: React.SetStateAction<CharacterMultiEdit[]>
  ) => {
    const newValue =
      typeof value === "function" ? value(charactersRole3) : value;

    setCharactersRole3(newValue);

    updateTeam({
      newCharactersRole3: newValue,
    });
  };

  /*
   * ============================================================
   * ROLE 4
   * ============================================================
   */

  const handleRoleName4Change = (value: string) => {
    setRoleName4(value);

    updateTeam({
      newRoleName4: value,
    });
  };

  const handleRoleIcon4Change = (value: string) => {
    setRoleIcon4(value);

    updateTeam({
      newRoleIcon4: value,
    });
  };

  const handleCharactersRole4 = (
    value: React.SetStateAction<CharacterMultiEdit[]>
  ) => {
    const newValue =
      typeof value === "function" ? value(charactersRole4) : value;

    setCharactersRole4(newValue);

    updateTeam({
      newCharactersRole4: newValue,
    });
  };

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div className="flex flex-col mx-5 p-5 text-white border border-white">
      <div className="relative">
        <input
          value={teamName}
          onChange={(event) => handleTeamNameChange(event.target.value)}
          className="flex p-2 mx-auto text-center w-10/12 justify-center text-black rounded-xl mt-5"
          placeholder="Nom de la team"
        />

        <button
          type="button"
          className="absolute p-2 h-10 w-10 bg-red rounded-full text-black bottom-0 right-14"
          onClick={() => handleRemoveTeam(teamId)}
        >
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-4 justify-center items-center">
        {/* ================================================== */}
        {/* ROLE 1 */}
        {/* ================================================== */}

        <div className="border border-white text-center">
          <CharactersChoice
            data={charactersData}
            setCharacters={handleCharactersRole1}
            characters={charactersRole1}
            textMode={true}
            openMenu={true}
          />

          <div className="flex gap-5 justify-center">
            <RoleIconsOptions
              value={roleIcon1}
              onChange={handleRoleIcon1Change}
            />

            <input
              value={roleName1}
              onChange={(event) => handleRoleName1Change(event.target.value)}
              className="p-2 justify-center text-black rounded-xl mb-2"
              placeholder="Role 1"
            />
          </div>
        </div>

        {/* ================================================== */}
        {/* ROLE 2 */}
        {/* ================================================== */}

        <div className="border border-white text-center">
          <CharactersChoice
            data={charactersData}
            setCharacters={handleCharactersRole2}
            characters={charactersRole2}
            textMode={true}
            openMenu={true}
          />

          <div className="flex gap-5 justify-center">
            <RoleIconsOptions
              value={roleIcon2}
              onChange={handleRoleIcon2Change}
            />

            <input
              value={roleName2}
              onChange={(event) => handleRoleName2Change(event.target.value)}
              className="p-2 justify-center text-black rounded-xl mb-2"
              placeholder="Role 2"
            />
          </div>
        </div>

        {/* ================================================== */}
        {/* ROLE 3 */}
        {/* ================================================== */}

        <div className="border border-white text-center">
          <CharactersChoice
            data={charactersData}
            setCharacters={handleCharactersRole3}
            characters={charactersRole3}
            textMode={true}
            openMenu={true}
          />

          <div className="flex gap-5 justify-center">
            <RoleIconsOptions
              value={roleIcon3}
              onChange={handleRoleIcon3Change}
            />

            <input
              value={roleName3}
              onChange={(event) => handleRoleName3Change(event.target.value)}
              className="p-2 justify-center text-black rounded-xl mb-2"
              placeholder="Role 3"
            />
          </div>
        </div>

        {/* ================================================== */}
        {/* ROLE 4 */}
        {/* ================================================== */}

        <div className="border border-white text-center">
          <CharactersChoice
            data={charactersData}
            setCharacters={handleCharactersRole4}
            characters={charactersRole4}
            textMode={true}
            openMenu={true}
          />

          <div className="flex gap-5 justify-center">
            <RoleIconsOptions
              value={roleIcon4}
              onChange={handleRoleIcon4Change}
            />

            <input
              value={roleName4}
              onChange={(event) => handleRoleName4Change(event.target.value)}
              className="p-2 justify-center text-black rounded-xl mb-2"
              placeholder="Role 4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
