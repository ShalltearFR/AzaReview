import ReactSelect from "react-select";

interface Option {
  value: string;
  label: string;
}

interface CharacterBuildProps {
  characterOptions: Option[];
  characterBuild: number;
  setCharacterBuild: (build: number) => void;
}

const CharacterBuild: React.FC<CharacterBuildProps> = ({
  characterOptions,
  characterBuild,
  setCharacterBuild,
}) => {
  return (
    <label className="flex items-center gap-2 ml-5 px-2">
      <span className="text-xl w-20">Build :</span>
      <ReactSelect
        options={characterOptions}
        isSearchable={false}
        styles={{
          menu: (base) => ({
            ...base,
            color: "black",
          }),
        }}
        onChange={(e) => setCharacterBuild(Number(e?.value))}
        value={characterOptions[characterBuild]}
        className="w-full xl:w-72 z-30"
      />
    </label>
  );
};

export default CharacterBuild;
