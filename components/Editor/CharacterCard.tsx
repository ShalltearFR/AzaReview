import { CDN } from "@/utils/cdn";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import LoadingSpin from "../LoadingSpin";

interface CharacterCardProps {
  id: string;
  preview: string;
  del: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ id, preview, del }) => {
  const [enableLoading, setEnableLoading] = useState<boolean>(false);

  return (
    <div className="w-[211px] h-[265px] relative border bg-black rounded-xl overflow-hidden">
      <button
        className="rounded-full absolute bottom-0 right-0 p-2 border bg-red"
        onClick={(e) => del(e, id)}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
      {enableLoading && (
        <div className="flex justify-center items-center bg-white/25 h-full w-full z-50 absolute">
          <LoadingSpin width="w-12" height="h-12" />
        </div>
      )}

      <Link href={`/hsr-editor/edit/${id}`}>
        <img
          src={`${CDN}/${preview}`}
          className="object-cover"
          onClick={() => setEnableLoading(true)}
        />
      </Link>
    </div>
  );
};

export default CharacterCard;
