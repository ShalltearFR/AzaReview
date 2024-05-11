interface PioneerTypeProps {
  id: string;
  nameFR: string;
  nameEN: string;
}

const PioneerType: PioneerTypeProps[] = [
  {
    id: "8001",
    nameFR: "Caelius Destruction",
    nameEN: "Caelius Destruction",
  },
  {
    id: "8003",
    nameFR: "Caelius Preservation",
    nameEN: "Caelius Preservation",
  },
  {
    id: "8005",
    nameFR: "Caelius Harmonie",
    nameEN: "Caelius Harmony",
  },
];

const PioneerToRemove: Array<String> = ["8002", "8004", "8006"];

export { PioneerType, PioneerToRemove };
export type { PioneerTypeProps };
