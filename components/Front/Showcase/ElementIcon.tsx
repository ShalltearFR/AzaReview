import { Icon } from "@/types/Icon";
import { CDN2 } from "@/utils/cdn";
interface ElementIconProps {
  type: Icon["Element"];
}
export const ElementIcon: React.FC<ElementIconProps> = ({ type }) => {
  return (
    <img src={`${CDN2}/img/guides/icon/element/${type}.webp`} width={32} />
  );
};
