"use client";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";

interface ClientShowProps {
  data: any;
}

const DetailsShow: React.FC<ClientShowProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div className="mt-2 bg-white rounded-lg p-2 mx-5 cursor-pointer items-center">
        <div className="flex" onClick={handleToggle}>
          <span
            className={`ml-2 transform transition-transform ${
              isVisible ? "rotate-0" : "-rotate-90"
            }`}
          >
            &darr;
          </span>
          <p className="font-semibold ml-2">Details</p>
        </div>
        {isVisible && (
          <div className="mt-2 text-xs w-full px-5 rounded-full">
            <ReactJson
              src={data}
              theme="monokai" // Thème (tu peux tester d'autres thèmes comme "rjv-default", "ocean", etc.)
              collapsed={false} // false = affiché par défaut, true = replié
              displayDataTypes={false} // Affiche ou non les types des valeurs
              enableClipboard={true} // Copie JSON en un clic
              displayObjectSize
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsShow;
