export interface IWedstrijd {
  id: number
  thuisploeg: string
  thuisploegId: number
  thuisploegLogo: string
  uitploeg: string
  uitploegId: number
  uitploegLogo: string
  thuisscore: number
  uitScore: number
  finished: boolean
  status: string
  elapsed: number
  datum?: string
  uur?: string
}
