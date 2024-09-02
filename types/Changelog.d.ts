interface Changelog {
  version: number;
  desc: string;
  createdAt: Date;
}

interface ChangelogType {
  data: Changelog[];
}

export type { ChangelogType };
