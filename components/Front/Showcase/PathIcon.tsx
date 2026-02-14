import { Icon } from "@/types/Icon";
import { CDN2 } from "@/utils/cdn";
interface PathIconProps {
  type: Icon["Path"];
}
export const PathIcon: React.FC<PathIconProps> = ({ type }) => {
  return <img src={`/img/guides/icon/path/${type}.webp`} width={32} />;
};
