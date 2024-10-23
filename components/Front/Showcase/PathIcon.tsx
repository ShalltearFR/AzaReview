// Warlock = nihilité    Thunder = foudre
// Warrior = destruction
// Shaman = harmonie
// Rogue = chasse
// Mage = erudition
// Knight = preservation
// Priest = abondance

import { PathType } from "@/types/path";
import { CDN2 } from "@/utils/cdn";
interface PathIconProps {
  type: PathType["type"];
}
export const PathIcon: React.FC<PathIconProps> = ({ type }) => {
  return <img src={`${CDN2}/img/guides/icon/path/${type}.webp`} width={32} />;
};
