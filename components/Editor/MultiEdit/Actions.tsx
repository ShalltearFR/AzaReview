"use client";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface ActionsProps {
  action: string;
  setAction: React.Dispatch<React.SetStateAction<"add" | "delete">>;
}

const Actions: React.FC<ActionsProps> = ({ action, setAction }) => {
  const [openActionMenu, setOpenActionMenu] = useState(false);

  return (
    <div className="bg-black/50 select-none">
      <div className="bg-gray-800 p-4 text-white">
        {/* Barre supérieure du menu avec le bouton */}
        <button
          className="flex w-full justify-between items-center border-b border-gray-600 pb-2"
          onClick={() => setOpenActionMenu(!openActionMenu)}
        >
          <h2 className="text-xl font-bold">Action</h2>
          <p className="text-lg focus:outline-none">
            {openActionMenu ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5" />
            )}
          </p>
        </button>

        {/* Contenu du menu déroulant */}
        <div
          className={`${
            openActionMenu ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          <label
            className="flex gap-x-2 mt-5 ml-1"
            onClick={() => setAction("add")}
          >
            <input
              type="radio"
              checked={action === "add"}
              onChange={() => setAction("add")}
            />
            Ajouter
          </label>

          <label
            className="flex gap-x-2 mt-2 ml-1"
            onClick={() => setAction("delete")}
          >
            <input
              type="radio"
              checked={action === "delete"}
              onChange={() => setAction("delete")}
            />
            Supprimer
          </label>
        </div>
      </div>
    </div>
  );
};

export default Actions;
