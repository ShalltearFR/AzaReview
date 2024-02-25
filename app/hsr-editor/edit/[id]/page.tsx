"use client";
import { CharacterType } from "@/types/CharacterModel";
import { CDN } from "@/utils/cdn";
import { useEffect, useState } from "react";
import { LightCone as LightConeType } from "@/types/LightCone";
import { SingleValue } from "react-select";
import GlobalLightCone from "@/components/Editor/Global/GlobalLightCone";

interface Option {
  value: string;
  label: string;
}

interface LightConeOption {
  value: any;
  id: string;
  recommanded: boolean;
  label: string;
}

function Page({ params }: { params: { id: number } }) {
  const [characterData, setCharacterData] = useState<
    CharacterType | "Loading" | { error: true }
  >("Loading");
  const [lightConeOptions, setLightConeOptions] = useState<Option[]>([]);
  const [lightConesSetup, setLightConesSetup] = useState<LightConeOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/character/${params.id}`);
        const data: CharacterType = await response.json();
        setCharacterData(data);
        console.log("characterData", data);
      } catch (error) {
        setCharacterData({ error: true });
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    if (
      characterData !== "Loading" &&
      typeof characterData === "object" &&
      (!("error" in characterData) || characterData.error !== true)
    ) {
      const fetchLightCones = async () => {
        try {
          const response = await fetch(
            "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/index_min/fr/light_cones.json"
          );
          const data: any = await response.json();
          const toArray = Object.values(data).map((item) => item);
          const character = characterData as unknown as CharacterType;

          const filtered: LightConeType[] = toArray.filter(
            (obj): obj is LightConeType => {
              if (obj instanceof Object && "path" in obj) {
                return (
                  obj.path === (character.path as unknown as CharacterType)
                );
              }
              return false;
            }
          );

          const options = filtered.map((el) => ({
            value: el.id,
            label: el.name,
          }));
          console.log(options);
          setLightConeOptions(options);
        } catch (error) {
          console.error("Error fetching light cones", error);
        }
      };

      fetchLightCones();
    }
  }, [characterData]);

  const handleLightConeChange = (
    option: SingleValue<Option>,
    index: number,
    isRecommanded: boolean
  ) => {
    setLightConesSetup((prevLightConesSetup) => {
      const newSetup = [...prevLightConesSetup];
      newSetup[index] = {
        id: option?.value || "",
        recommanded: isRecommanded,
        value: option?.label || "",
        label: option?.label || "",
      };
      return newSetup;
    });
  };

  const deleteLightCone = (index: number) => {
    console.log("delete");
    setLightConesSetup((prevLightConesSetup) => {
      const newSetup = [...prevLightConesSetup];
      newSetup.splice(index, 1);
      return newSetup;
    });
  };

  const addLightCone = (isRecommanded: boolean) => {
    console.log("add");
    setLightConesSetup((prevLightConesSetup) => [
      ...prevLightConesSetup,
      { id: "", recommanded: isRecommanded, value: "", label: "" },
    ]);
  };

  const isLoading = characterData === "Loading";
  const isError = typeof characterData === "object" && "error" in characterData;

  if (isLoading) {
    return <div className="text-white">Page chargement</div>;
  }

  if (isError) {
    return <div className="text-white">Personnage non existant</div>;
  }

  return (
    <div>
      <div className="relative">
        <img
          src={`${CDN}/${characterData.portrait}`}
          className="grayscale opacity-50 absolute -z-10"
        />
        <p className="text-white text-center text-4xl my-5">
          {characterData.name}
        </p>

        {/* BUILD */}
        <div className="mx-5 p-5 text-white border border-white">
          <label>
            <span className="text-2xl">Nom du build : </span>
            <input />
          </label>
          {/* CONES DE LUMIERE */}
          <div className="border border-white p-5 mx-5 mt-5">
            <div className="flex">
              <span className="text-2xl mx-auto font-bold mb-5">
                Cones de lumière
              </span>
            </div>
            {/* SEPARATION CONE ET RECOMMANDÉ */}
            <div className="grid grid-cols-[1fr_1fr]">
              <GlobalLightCone
                lightConeOptions={lightConeOptions}
                lightConesSetup={lightConesSetup}
                handleChange={handleLightConeChange}
                addLightCone={addLightCone}
                deleteLightCone={deleteLightCone}
                addButtonText={"Ajouter un cone"}
                isRecommanded={false}
              />

              <GlobalLightCone
                lightConeOptions={lightConeOptions}
                lightConesSetup={lightConesSetup}
                handleChange={handleLightConeChange}
                addLightCone={addLightCone}
                deleteLightCone={deleteLightCone}
                addButtonText={"Ajouter un cone recommandé"}
                isRecommanded={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
