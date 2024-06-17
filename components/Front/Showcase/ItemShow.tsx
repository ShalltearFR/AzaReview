"use-client";
import { CDN } from "@/utils/cdn";
import { useState } from "react";

interface ItemShowProps {
  type: any;
  id: string;
  className?: string;
  relicSet?: any;
}

const ItemShow: React.FC<ItemShowProps> = ({
  type,
  id,
  className,
  relicSet,
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const itemName = type.find((item: any) => item.id === id);

  return (
    <div className="relative">
      {relicSet && (
        <p
          className={`bg-gray flex justify-center items-center rounded-full absolute -top-2 -left-2 text-black font-semibold text-lg z-10 h-8 ${
            relicSet.num === 2.4 ? "w-12" : "w-8" // Si 2 et 4P
          }`}
        >
          {/* Si 2 et 4P */}
          {relicSet.num === 2.4 ? "2/4P" : `${relicSet.num}P`}
        </p>
      )}
      <div
        className={`${
          showTooltip ? "bg-white/5" : "bg-black/75"
        } rounded-tr-3xl py-2 relative overflow-hidden ${
          className ? className : ""
        }`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && (
          <p className="absolute bottom-0 bg-black z-20 w-full px-1 text-center">
            {itemName.name}
          </p>
        )}
        <img
          src={`${CDN}/${itemName.icon}`}
          className="m-auto"
          width={128}
          height={128}
        />

        <p className="absolute bottom-0 px-1 text-center w-full bg-black/75">
          {itemName.name.length > 14
            ? `${itemName.name.substring(0, 14)}...`
            : itemName.name}
        </p>
      </div>
    </div>
  );
};

export default ItemShow;
