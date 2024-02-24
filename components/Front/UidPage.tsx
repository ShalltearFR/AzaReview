"use client";
import CharacterDetails from "@/components/Front/Character/CharacterDetails";
import CharacterList from "@/components/Front/CharactersList";
import NavBar from "@/components/Front/NavBar";
import type { jsonUID } from "@/types/jsonUid";
import { useState, useEffect } from "react";

interface UidPageProps {
  json: jsonUID;
}

const UidPage: React.FC<UidPageProps> = ({ json }) => {
  const [uidData, setUidData] = useState<{ status: number } | jsonUID>({
    status: 206,
  });
  const [characterIndex, setCharacterIndex] = useState<number>(0);

  useEffect(() => {
    setUidData(json);
  }, [json]);

  return (
    <div className="overflow-hidden min-h-[calc(100vh-178px)]">
      <NavBar setData={setUidData} />
      {uidData.status === 200 && (
        <section>
          <CharacterList
            uidData={uidData as jsonUID}
            setIndex={setCharacterIndex}
            index={characterIndex}
          />
          <CharacterDetails
            uidData={uidData as jsonUID}
            index={characterIndex}
          />
        </section>
      )}
    </div>
  );
};

export default UidPage;
