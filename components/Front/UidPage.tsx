"use client";
import CharacterDetails from "@/components/Front/Character/CharacterDetails";
import CharacterList from "@/components/Front/CharactersList";
import NavBar from "@/components/Front/NavBar";
import { CharacterType } from "@/types/CharacterModel";
import type { jsonUID } from "@/types/jsonUid";
import { useState, useEffect } from "react";

interface ReviewData {
  data: CharacterType[];
}

interface UidPageProps {
  jsonUid: jsonUID;
  jsonReview: ReviewData;
}

const UidPage: React.FC<UidPageProps> = ({ jsonUid, jsonReview }) => {
  const [uidData, setUidData] = useState<{ status: number } | jsonUID>({
    status: 206,
  });
  const [characterIndex, setCharacterIndex] = useState<number>(0);

  useEffect(() => {
    setUidData(jsonUid);
  }, [jsonUid]);

  return (
    <div className="overflow-hidden min-h-[calc(100vh-178px)]">
      <NavBar setData={setUidData} />
      {uidData.status === 200 && jsonReview && (
        <section>
          <CharacterList
            uidData={uidData as jsonUID}
            setIndex={setCharacterIndex}
            index={characterIndex}
          />
          <CharacterDetails
            uidData={uidData as jsonUID}
            reviewData={jsonReview}
            index={characterIndex}
          />
        </section>
      )}
    </div>
  );
};

export default UidPage;
