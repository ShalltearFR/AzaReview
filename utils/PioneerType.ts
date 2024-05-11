interface PioneerTypeProps {
  id: string;
  nameFR: string;
  nameEN: string;
}

const PioneerType: PioneerTypeProps[] = [
  {
    id: "8001",
    nameFR: "Pionnier Physique",
    nameEN: "Pioneer Physical",
  },
  {
    id: "8003",
    nameFR: "Pionnier Feu",
    nameEN: "Pioneer Fire",
  },
  {
    id: "8005",
    nameFR: "Pionnier Imaginaire",
    nameEN: "Pioneer Imaginary",
  },
];

const PioneerToRemove: Array<String> = ["8002", "8004", "8006"];

export { PioneerType, PioneerToRemove };
export type { PioneerTypeProps };
