export interface ICurrentRoundResponse {
  get: string;
  parameters: {
    league: string;
    current: string;
    season: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: string[];
}
