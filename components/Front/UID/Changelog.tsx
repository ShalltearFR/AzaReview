import { ChangelogType } from "@/types/Changelog";
import { FR_Month } from "@/utils/month";

interface ChangelogBuildProps {
  changelog: ChangelogType;
}

const Changelog: React.FC<ChangelogBuildProps> = ({ changelog }) => {
  return (
    <div className="flex flex-col gap-y-7 max-h-[calc(100vh-270px)] overflow-y-auto bg-black text-white">
      <p className="text-3xl font-bold text-orange text-center">
        Changements apportés au site
      </p>
      {changelog.data.map((patch) => {
        const date = new Date(patch.createdAt);
        const day = date.getDate();
        const mounth = FR_Month[date.getMonth()];
        const year = date.getFullYear();
        const patchDate = `${day} ${mounth} ${year}`;

        return (
          <div key={`${patch.version}+${patchDate}`}>
            <p>
              <span className="text-xl font-bold">
                Version {patch.version.toFixed(2)}
              </span>
              <span> - {patchDate}</span>
            </p>
            <ul className="ml-5 list-disc">
              {patch.desc.split("\n").map((line) => (
                <li>{line.trim()}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Changelog;
