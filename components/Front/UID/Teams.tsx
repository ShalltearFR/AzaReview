import { CDN, CDN2 } from "@/utils/cdn";
import type { TeamsData, Team } from "@/types/Teams";

export const Teams = (json: TeamsData) => {
  return (
    <div className="flex flex-col gap-y-10 justify-center bg-light-blue/75 w-full max-w-[1450px] mx-auto xl:gap-x-5 py-5 rounded-b-xl text-white">
      {json.data.map((team: Team) => (
        <div key={team.teamName}>
          <h3 className="text-center border border-l-light-blue/75 border-r-light-blue/75 bg-brown2 py-2 font-bold text-lg">
            {team.teamName}
          </h3>

          <div className="xl:grid xl:grid-cols-4 xl:justify-center xl:items-center text-center">
            {team.roles.map((role, rolesIndex) => (
              <div
                key={`${team.teamName}+${rolesIndex}`}
                className={`
                  border border-t-0
                  ${rolesIndex > 0 ? "border-l-0" : "border-l-light-blue/75"}
                  ${rolesIndex === team.roles.length - 1 ? "border-r-light-blue/75" : ""}
                `}
              >
                <div className="flex h-[96px] items-center justify-center gap-3">
                  {role.id.map((characterId) => (
                    <img
                      key={`roleID+${rolesIndex}+${characterId}`}
                      src={`${CDN}/icon/character/${characterId}.png`}
                      width={64}
                      height={64}
                      className="rounded-2xl bg-background"
                      alt=""
                    />
                  ))}
                </div>

                <p className="flex justify-center items-center py-2 border-t bg-background font-bold gap-2">
                  <img
                    src={`${CDN2}/img/roles/${role.icon}.png`}
                    width={32}
                    height={32}
                    alt=""
                  />
                  {role.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
