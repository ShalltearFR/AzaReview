"use client";

import { RoleIconsOptions } from "./RoleIconsOptions";

type TeamsEditorProps = {
  id: number;
};

export const TeamsEditor = ({ id }: TeamsEditorProps) => {
  return (
    <div className="flex flex-col mt-28 mx-5 p-5 text-white border border-white">
      <h3 className="text-center text-3xl font-bold">Teams</h3>
      <input
        className="p-2 mx-24 justify-center text-black rounded-xl mt-5"
        placeholder="Nom de la team"
      />
      <div className="grid grid-cols-4 justify-center items-center">
        <div className="border border-white text-center">
          <div>fgf</div>
          <div className="flex gap-5 justify-center">
            <select className="p-2 justify-center text-black rounded-xl mb-2">
              <RoleIconsOptions />
            </select>
            <input
              className="p-2 justify-center text-black rounded-xl mb-2"
              placeholder="Role 1"
            />
          </div>
        </div>
        <div className="border border-white text-center">
          <div>fgf</div>
          <input
            className="p-2 mx-24 justify-center text-black rounded-xl mb-2"
            placeholder="Role 2"
          />
        </div>
        <div className="border border-white text-center">
          <div>fgf</div>
          <input
            className="p-2 mx-24 justify-center text-black rounded-xl mb-2"
            placeholder="Role 3"
          />
        </div>
        <div className="border border-white text-center">
          <div>fgf</div>
          <input
            className="p-2 mx-24 justify-center text-black rounded-xl mb-2"
            placeholder="Role 4"
          />
        </div>
      </div>
    </div>
  );
};
