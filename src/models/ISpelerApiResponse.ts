export interface ISpelerApiResponse {
  get: string;
  parameters: {
    league: string;
    page: string;
    season: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: ISpelerData[];
}

export interface ISpelerData {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      date: string;
      place: string | null;
      country: string;
      nationality: string;
      height: string;
      weight: string;
      injured: boolean;
      photo: string;
    }
  }
  statistics: IStatistics[];
}

export interface IStatistics {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  games: IGames;
  shots: IShots;
  goals: IGoals;
  passes: IPasses;
  tackles: ITackles;
  duels: IDuels;
  dribbles: IDribbles;
  fouls: IFouls;
  cards: ICards;
  penalty: IPenalty;
}

export interface IGames {
  appearances: number | null;
  lineups: number | null;
  minutes: number | null;
  number: number | null;
  position: string;
  rating: string | null;
  captain: boolean;
  substitutes: {
    in: number | null;
    out: number | null;
    bench: number | null;
  };
}

export interface IShots {
  total: number | null;
  on: number | null;
}

export interface IGoals {
  total: number | null;
  conceded: number | null;
  assists: number | null;
  saves: number | null;
}

export interface IPasses {
  total: number | null;
  key: number | null;
  accuracy: number | null;
}

export interface ITackles {
  total: number | null;
  blocks: number | null;
  interceptions: number | null;
}

export interface IDuels {
  total: number | null;
  won: number | null;
}

export interface IDribbles {
  attempts: number | null;
  success: number | null;
  past: number | null;
}

export interface IFouls {
  drawn: number | null;
  committed: number | null;
}

export interface ICards {
  yellow: number | null;
  yellowred: number | null;
  red: number | null;
}

export interface IPenalty {
  won: number | null;
  commited: number | null;
  scored: number | null;
  missed: number | null;
  saved: number | null;
}
