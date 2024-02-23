import Link from "next/link";

const NavBarEditor: React.FC = () => {
  return (
    <nav className="bg-[#030303] h-16 text-xl text-white">
      <ul className="flex px-7 items-center h-full">
        <span className="font-bold">Espace Editeur</span>
        <span className="ml-auto font-medium">
          <Link href={"/hsr-editor/logout"}>Deconnexion</Link>
        </span>
      </ul>
    </nav>
  );
};

export default NavBarEditor;
