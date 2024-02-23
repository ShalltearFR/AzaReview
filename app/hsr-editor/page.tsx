import { Metadata } from "next";
import CharacterList from "@/components/Editor/CharacterList";

export const metadata: Metadata = {
  title: "Liste des personnages",
};

export default function Page() {
  return <CharacterList />;
}
