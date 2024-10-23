"use-client";
import { CDN } from "@/utils/cdn";
import { generateText, splitAndKeepDelimiters } from "@/utils/format";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface ItemShowProps {
  type: any;
  id: string;
  className?: string;
  relicSet?: any;
  lightconesRanks?: any;
}

const ItemShow: React.FC<ItemShowProps> = ({
  type,
  id,
  className,
  relicSet,
  lightconesRanks,
}) => {
  const [showTooltipName, setShowTooltipName] = useState<boolean>(false);
  const [showTooltipDesc, setShowTooltipDesc] = useState<boolean>(false);
  const [itemDesc, setItemDesc] = useState<Array<string>>([""]);

  const itemName = type.find((item: any) => item.id === id);

  useEffect(() => {
    // Gère le texte si cone
    if (lightconesRanks) {
      const object = lightconesRanks.find((item: any) => item.id === id);
      const values = object.params.map((innerArray: any) =>
        innerArray.map((value: any) => value)
      );
      const descriptions = generateText(object.desc, values);
      const descriptionsArray = splitAndKeepDelimiters(descriptions, ". ");
      setItemDesc(descriptionsArray);
    } else {
      // Gère le texte si set de reliques/ornements
      const descriptionsArray = splitAndKeepDelimiters(
        itemName.desc[0] + itemName.desc[1],
        "."
      );
      setItemDesc(descriptionsArray);
    }
  }, [id, lightconesRanks]);

  if (itemName)
    return (
      <div className="relative">
        {relicSet && (
          <p
            className={`bg-gray flex justify-center items-center rounded-full absolute -top-2 -left-2 text-black font-semibold text-lg z-10 h-8 ${
              relicSet.num === 2.4 ? "w-12" : "w-8"
            }`}
          >
            {relicSet.num === 2.4 ? "2/4P" : `${relicSet.num}P`}
          </p>
        )}
        <div
          className={`${
            showTooltipName ? "bg-white/5" : "bg-black/75"
          } rounded-tr-3xl py-2 relative overflow-hidden ${
            className ? className : ""
          }`}
          onMouseEnter={() => setShowTooltipName(true)}
          onMouseLeave={() => setShowTooltipName(false)}
        >
          {showTooltipName && (
            <p className="absolute bottom-0 bg-black z-20 w-full px-1 text-center">
              {itemName.name}
            </p>
          )}
          <img
            src={`${CDN}/${itemName.icon}`}
            alt={itemName.name}
            className="m-auto"
            width={128}
            height={128}
          />
          <p className="absolute bottom-0 px-1 text-center w-full bg-black/75">
            {itemName.name.length > 14
              ? `${itemName.name.substring(0, 14)}...`
              : itemName.name}
          </p>
          <button
            className="absolute top-0 right-0 size-10"
            onMouseEnter={() => setShowTooltipDesc(true)}
            onMouseLeave={() => setShowTooltipDesc(false)}
          >
            <InformationCircleIcon
              color="black"
              fill="gray"
              className="hidden xl:block"
            />
          </button>
        </div>
        {/* Affiche la description de l'item */}
        {showTooltipDesc && (
          <div className="absolute bg-background -left-32 border border-orange rounded-xl z-20 p-2 hidden xl:flex xl:flex-col xl:w-[400px] xl:gap-3">
            {itemDesc.map((desc: string) => (
              <p key={`desc${id}`}>{desc}</p>
            ))}
          </div>
        )}
      </div>
    );

  return null;
};

export default ItemShow;
