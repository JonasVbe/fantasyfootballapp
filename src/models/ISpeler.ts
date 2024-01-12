export interface ISpelerOLD {
  id: string
  naam: string
  voornaam?: string | null
  achternaam?: string | null
  ploeg: string
  ploegId?: number | null
  positie: string
  rugnummer?: number | null
  isActief: boolean
  isKapitein: boolean
  volgendeMatch: string
  logo?: string
  rating?: number | null
}
