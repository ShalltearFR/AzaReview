"use client";
import CharacterDetails from "@/components/Character/CharacterDetails";
import CharacterList from "@/components/CharactersList";
import NavBar from "@/components/NavBar";
import type { jsonUID } from "@/utils/jsonUid";
import { useState, useEffect } from "react";

interface UidPageProps {
  uid: number;
}

async function Getdata(uid: number) {
  const res = await fetch(`/api/uid/${uid}`);
  return res.json();
}

const UidPage: React.FC<UidPageProps> = ({ uid }) => {
  const [uidData, setUidData] = useState<{ status: number } | jsonUID>({
    status: 206,
  });
  const [characterIndex, setCharacterIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Getdata(uid);
      console.log(data);
      setUidData(data);
    };

    fetchData();
  }, [uid]);

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
