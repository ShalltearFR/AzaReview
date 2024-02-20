"use client";
import CharacterDetails from "@/components/Character/CharacterDetails";
import CharacterList from "@/components/CharactersList";
import NavBar from "@/components/NavBar";
import type { jsonUID } from "@/utils/jsonUid";
import { useState, useEffect } from "react";

interface statusProps {
  status: number;
}

async function Getdata(uid: number) {
  const res = await fetch(`/api/uid/${uid}`);
  return res.json();
}

export default function Page({ params }: { params: { slug: number } }) {
  const [uidData, setUidData] = useState<statusProps | jsonUID>({
    status: 206,
  });
  const [characterIndex, setCharacterIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Getdata(params.slug);
      setUidData(data);
    };

    fetchData();
  }, [params]);

  return (
    <div className="overflow-hidden">
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
}
