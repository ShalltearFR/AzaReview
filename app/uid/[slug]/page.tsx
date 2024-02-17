"use client";
import { useState, useEffect } from "react";

async function Getdata(uid: number) {
  const res = await fetch(`/api/uid/700643513`);
  return res.json();
}

export default function Page({ params }: { params: { slug: number } }) {
  const [uidData, setUidData] = useState<Object | string>("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      const data = await Getdata(params.slug);
      setUidData(data);
      console.log(data);
    };

    fetchData();
  }, [params]);

  return <div>{uidData.toString()}</div>;
}
