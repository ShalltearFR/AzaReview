import { CDN2 } from "@/utils/cdn";

const NavBar: React.FC = () => {
  return (
    <div className="flex w-full h-24 bg-[#030303]">
      <img
        src={`${CDN2}/img/homepage/logo_min.png`}
        className="absolute h-24 smd:h-24 left-2 top-2 z-50 smd:mt-2 xl:mt-0"
        alt="Logo"
      />
      <div className="grid grid-cols-5 ml-[160px] w-full text-center items-center text-white text-xl font-medium">
        <span>Accueil</span>
        <span>Explications</span>
        <span>Analyses/Notes</span>
        <span>Codes</span>
        <span>Personnages</span>
      </div>
    </div>
  );
};

export default NavBar;
