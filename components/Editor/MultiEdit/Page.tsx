"use client";
import { CharacterType, LightCone, RelicsSet } from "@/types/CharacterModel";
import CharactersChoice from "./CharactersChoice";
import { useEffect, useState } from "react";
import {
  CharacterMultiEdit,
  LightConeOption,
  RelicSetOption,
} from "@/types/EditorPage";
import Actions from "./Actions";
import LightConesChoice from "./LightConesChoice";
import RelicsChoice from "./RelicsChoice";
import OrnamentsChoice from "./OrnamentsChoice";
import { toast } from "react-toastify";
import { CDN } from "@/utils/cdn";
import light_conesFR from "@/static/light_conesFR.json";
import relic_setsFR from "@/static/relic_setsFR.json";
import translateBBCode from "@/utils/translateBBCode";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingSpin from "@/components/LoadingSpin";

interface CustomToastProps {
  image: string;
  itemName: string;
  existing: boolean;
  characterName: string;
}

const Page: React.FC = ({}) => {
  const [characters, setCharacters] = useState<CharacterMultiEdit[]>([]);
  const [action, setAction] = useState<"add" | "delete">("add");
  const [lightCones, setLightCones] = useState<LightConeOption[]>([]);
  const [relics, setRelics] = useState<RelicSetOption[]>([]);
  const [ornaments, setOrnaments] = useState<RelicSetOption[]>([]);
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(false);
  const [data, setData] = useState<CharacterType[]>([]);

  const fetchData = () => {
    setData([]);
    fetch(`/api/characters`, { cache: "no-cache", next: { revalidate: false } })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetch multi edit:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data.length === 0) {
    return (
      <div className="flex w-screen h-screen justify-center mt-10">
        <LoadingSpin />
      </div>
    );
  }

  const CustomErrorToast: React.FC<CustomToastProps> = ({
    image,
    itemName,
    existing,
    characterName,
  }) => {
    const name =
      itemName.length > 20 ? `${itemName.substring(0, 20)}...` : itemName;
    const typeText = existing ? "est déjà présent" : "n'est pas présent";
    return (
      <div className="relative flex items-center text-sm">
        <XMarkIcon className="h-12 w-12 text-red" />
        <img src={`${CDN}/${image}`} className="h-12 w-12" />
        <p className="ml-2">
          {translateBBCode(
            `[b]${name}[/b] ${typeText} pour [b]${characterName}[/b]`
          )}
        </p>
      </div>
    );
  };

  const handleSave = () => {
    fetchData();
    const relic_set = [...relics, ...ornaments];
    if (
      characters.length === 0 ||
      (relic_set.length === 0 && lightCones.length === 0)
    )
      return;

    setDisableSaveButton(true);
    let doNotSave: boolean = false;

    const dataToSend = {
      lightCones: [] as LightCone[],
      relics_set: [] as RelicsSet[],
    };

    characters.map((character) => {
      const characterReview = data.find(
        (el) => el.id === character.id
      ) as CharacterType;
      characterReview?.data.map((build, buildIndex) => {
        build.lightCones;
        if (!character.buildsChecked[buildIndex]) return null; // Si le build n'est pas coché, on ne le modifie pas

        // Verifie les cones de lumière
        lightCones.map((lightCone) => {
          if (lightCone.id === "0") return null;
          const isLightConeExist = !!build.lightCones.find(
            (el) =>
              el.id === lightCone.id && el.recommended === lightCone.recommended
          );
          if (isLightConeExist && action === "add") {
            const lightConeInfo = light_conesFR.find(
              (el) => el.id === lightCone.id
            );
            toast(
              <CustomErrorToast
                image={lightConeInfo?.icon as string}
                existing={true}
                itemName={lightConeInfo?.name as string}
                characterName={characterReview.name}
              />
            );
            doNotSave = true;
            return;
          }
          if (!isLightConeExist && action === "delete") {
            const lightConeInfo = light_conesFR.find(
              (el) => el.id === lightCone.id
            );
            toast(
              <CustomErrorToast
                image={lightConeInfo?.icon as string}
                existing={false}
                itemName={lightConeInfo?.name as string}
                characterName={characterReview.name}
              />
            );
            doNotSave = true;
            return;
          }
          dataToSend.lightCones.push({
            id: lightCone.id,
            recommended: lightCone.recommended,
          });
        });
        // Verifie les reliques/Ornements
        relic_set.map((relic) => {
          if (relic.id === "0") return null;
          const isRelicExist = !!build.relics_set.find(
            (el) =>
              el.id === relic.id &&
              el.recommended === relic.recommended &&
              el.num === relic.num
          );
          if (isRelicExist && action === "add") {
            const relicInfo = relic_setsFR.find((el) => el.id === relic.id);
            toast(
              <CustomErrorToast
                image={relicInfo?.icon as string}
                existing={true}
                itemName={relicInfo?.name as string}
                characterName={characterReview.name}
              />
            );
            doNotSave = true;
            return;
          }
          if (!isRelicExist && action === "delete") {
            const relicInfo = relic_setsFR.find((el) => el.id === relic.id);
            toast(
              <CustomErrorToast
                image={relicInfo?.icon as string}
                existing={false}
                itemName={relicInfo?.name as string}
                characterName={characterReview.name}
              />
            );
            doNotSave = true;
            return;
          }
          dataToSend.relics_set.push({
            id: relic.id,
            recommended: relic.recommended,
            num: relic.num,
          });
        });
      });
    });

    if (doNotSave) setDisableSaveButton(false);

    if (!doNotSave) {
      characters.map((character) => {
        const characterReview = [...data].find(
          (el) => el.id === character.id
        ) as CharacterType;
        const newData = characterReview?.data
          ?.map((build, buildIndex) => {
            // Si le build n'est pas coché, ne le modifie pas
            if (!character.buildsChecked[buildIndex]) return { ...build };

            // Récupère les cones de lumière et reliques
            const newsLightCones = [...build.lightCones];
            const newsRelicsSet = [...build.relics_set];

            // Supprime/Ajoute les cones de lumière
            lightCones.map((lightCone) => {
              const indextoDelete = newsLightCones.findIndex(
                (el) =>
                  el.id === lightCone.id &&
                  el.recommended === lightCone.recommended
              );

              if (action === "delete" && indextoDelete !== -1)
                newsLightCones.splice(indextoDelete, 1);

              if (action === "add" && indextoDelete === -1)
                newsLightCones.push({
                  id: lightCone.id,
                  recommended: lightCone.recommended,
                });
            });

            // Supprime/Ajoute les reliques
            relic_set.map((relic) => {
              const indextoDelete = newsRelicsSet.findIndex(
                (el) =>
                  el.id === relic.id &&
                  el.recommended === relic.recommended &&
                  Number(el.num) === Number(relic.num)
              );
              console.log("indextoDelete", indextoDelete);
              if (action === "delete" && indextoDelete !== -1)
                newsRelicsSet.splice(indextoDelete, 1);

              if (action === "add" && indextoDelete === -1)
                newsRelicsSet.push({
                  id: relic.id,
                  recommended: relic.recommended,
                  num: Number(relic.num),
                });
            });

            // Retourne les données modifiées
            return {
              ...build,
              lightCones: newsLightCones,
              relics_set: newsRelicsSet,
            };
          })
          .filter((el) => el !== null);

        fetch("/api/character", {
          method: "PUT",
          cache: "no-cache",
          next: { revalidate: 0 },
          body: JSON.stringify({ characterId: character.id, data: newData }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "ok" && characterReview)
              // `Sauvegarde terminé pour ${characterReview.name}`
              toast(
                <div className="relative flex items-center text-sm">
                  <CheckIcon className="h-12 w-12 text-green" />
                  <img
                    src={`${CDN}/${characterReview.preview}`}
                    className="h-12 w-12"
                  />
                  <p className="ml-2">
                    {translateBBCode(
                      `Sauvegarde réussi pour [b]${characterReview.name}[/b]`
                    )}
                  </p>
                </div>
              );
            else toast.error("Erreur de sauvegarde");
          })
          .finally(() => {
            setDisableSaveButton(false);
            fetchData();
          });
      });
    }
  };

  return (
    <div className="flex flex-col mt-10 gap-y-10 w-3/4 mx-auto">
      {/* LISTE DES PERSONNAGES */}
      <CharactersChoice
        data={data}
        setCharacters={setCharacters}
        characters={characters}
      />
      {/* ACTIONS */}
      <Actions action={action} setAction={setAction} />
      {/* CONES DE LUMIERES */}
      <LightConesChoice lightCones={lightCones} setLightCones={setLightCones} />
      {/* SETS DE RELIQUES */}
      <RelicsChoice relics={relics} setRelics={setRelics} />
      {/* ORNEMENTS */}
      <OrnamentsChoice ornaments={ornaments} setOrnaments={setOrnaments} />

      <button
        className="p-3 bg-green rounded-xl mx-auto text-xl font-semibold disabled:bg-gray mb-10"
        onClick={() => handleSave()}
        disabled={disableSaveButton}
      >
        Effectuer la modification
      </button>
    </div>
  );
};

export default Page;
