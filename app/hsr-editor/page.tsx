import { Metadata } from "next";
import CharacterList from "@/components/Editor/CharacterList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Liste des personnages",
};

export default function Page() {
  return (
    <>
      <CharacterList />
      <ToastContainer position="bottom-right" />
    </>
  );
}
