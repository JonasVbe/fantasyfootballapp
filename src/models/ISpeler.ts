export interface ISpeler {
  id: string
  naam: string
  ploeg: string
  positie: string
  rugnummer: number
  isActief: boolean
  isKapitein: boolean
  volgendeMatch: string
  logo?: string
}
