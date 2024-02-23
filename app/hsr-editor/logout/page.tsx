"use client";
import NavBarEditor from "@/components/Editor/NavBarEditor";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/logout`)
      .then((res) => res.json())
      .then(() => {
        router.push("/");
      });
  }, [router]);

  return <NavBarEditor />;
}

export default Page;
