"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface NavBarProps {
  setData: any;
}

const NavBar: React.FC<NavBarProps> = ({ setData }) => {
  const { push } = useRouter();
  const [uidInput, setUidInput] = useState<string>("");

  return (
    <nav className="flex justify-center items-center bg-[#030303]/40 w-screen h-20 gap-7 mb-5">
      <input
        className="rounded-full w-40 h-10 pl-5 text-lg"
        maxLength={9}
        placeholder="UID"
        value={uidInput}
        onChange={(e) => setUidInput(e.target.value)}
      />
      <button
        className="bg-[#3E7032] h-10 px-4 rounded-full text-white"
        onClick={() => {
          if (isNaN(Number(uidInput))) {
            setData({ status: 400 });
          } else {
            push(`/uid/${uidInput}`);
          }
        }}
      >
        Rechercher
      </button>
    </nav>
  );
};

export default NavBar;
