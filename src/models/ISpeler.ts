export interface ISpeler {
  id: string
  naam: string
  ploeg: string
  positie: 'Doelman' | 'Verdediger' | 'Middenvelder' | 'Aanvaller'
  rugnummer: number
  isActief: boolean
  isKapitein: boolean
  volgendeMatch: string
  logo?: string
}
