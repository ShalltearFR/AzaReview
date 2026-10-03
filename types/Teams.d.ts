type Role = {
    id: string[];
    name: string;
    icon: string;
};

type Team = {
    teamName: string;
    roles: Role[];
};

type TeamsData = {
    data: Team[];
    characterID: string | number;
};

export type { Role, Team, TeamsData };