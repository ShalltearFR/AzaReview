import { CDN } from "@/utils/cdn";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface CharacterCardProps {
  id: string;
  preview: string;
  del: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ id, preview, del }) => {
  return (
    <div className="w-[211px] h-[265px] relative border bg-black rounded-xl overflow-hidden">
      <button
        className="rounded-full absolute bottom-0 right-0 p-2 border bg-red"
        onClick={(e) => del(e, id)}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
      <Link href={`/hsr-editor/edit/${id}`}>
        <img src={`${CDN}/${preview}`} className="object-cover" />
      </Link>
    </div>
  );
};

export default CharacterCard;
