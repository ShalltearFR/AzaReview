type Role = {
    name: string;
    icon: string;
    id: string[];
};

type Team = {
    teamName: string;
    roles: Role[];
};

type TeamsData = {
    data: Team[];
    characterID: string;
};

export type { Role, Team, TeamsData };