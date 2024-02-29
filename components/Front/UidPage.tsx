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
}

const UidPage: React.FC<UidPageProps> = ({ jsonUid }) => {
  const [uidData, setUidData] = useState<{ status: number } | jsonUID>({
    status: 206,
  });
  const [characterIndex, setCharacterIndex] = useState<number>(0);
  const [reviewData, setReviewData] = useState<ReviewData | undefined>(
    undefined
  );

  useEffect(() => {
    setUidData(jsonUid);
    //Recupère les characters ID du joueur
    const charactersIds = jsonUid.characters
      .map((character) => character.id)
      .join(",");

    //Recupère les infos de review
    fetch(`/api/characters?ids=${charactersIds}`, {
      next: { revalidate: 300 },
    })
      .then((res) => res.json())
      .then((json) => {
        setReviewData(json);
        console.log(json);
      });
  }, [jsonUid]);

  return (
    <div className="overflow-hidden min-h-[calc(100vh-178px)]">
      <NavBar setData={setUidData} />
      {uidData.status === 200 && reviewData && (
        <section>
          <CharacterList
            uidData={uidData as jsonUID}
            setIndex={setCharacterIndex}
            index={characterIndex}
          />
          <CharacterDetails
            uidData={uidData as jsonUID}
            reviewData={reviewData as ReviewData}
            index={characterIndex}
          />
        </section>
      )}
    </div>
  );
};

export default UidPage;
