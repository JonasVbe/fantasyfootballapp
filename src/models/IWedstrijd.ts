export interface IWedstrijd {
  id: string
  thuisploeg: string
  uitploeg: string
  thuisscore: number
  uitScore: number
  finished: boolean
  datum?: string
  uur?: string
}
