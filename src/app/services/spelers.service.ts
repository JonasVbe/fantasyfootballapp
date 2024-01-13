import {inject, Injectable} from '@angular/core'
import {ISpeler} from '../../models/ISpeler'
import {ApiFootballService} from './api-football.service'
import {ISpelerData} from '../../models/ISpelerApiResponse'
import {firstValueFrom} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class SpelersService {
  apiService = inject(ApiFootballService)

  spelers: ISpeler[] = []

  geselecteerdeSpelerVoorWissel: ISpeler | null = null
  beschikbareWisselspelers: ISpeler[] = []


  spelersVoorTransfers: ISpeler[] = []
  geselecteerdeSpelerVoorTransfer: ISpeler | undefined = undefined
  origineleSpelersVoorTransfers: ISpeler[] = []

  #spelersData: ISpelerData[] = []
  #dataLoaded = false


  constructor() {


    /*this.spelers = [
      {
        id: 'blabla1',
        naam: 'Simon Mignolet',
        ploeg: 'Club Brugge',
        positie: 'Doelman',
        rugnummer: 1,
        isActief: true,
        isKapitein: false,
        volgendeMatch: 'Speelt uit tegen Mechelen'
      },
      {
        id: 'blabla2',
        naam: 'Hervé Koffi',
        ploeg: 'Charleroi',
        positie: 'Doelman',
        rugnummer: 1,
        isActief: false,
        isKapitein: false,
        volgendeMatch: 'Speelt thuis tegen Union SG'
      },
      {
        id: 'bla1',
        naam: 'Toby Alderweireld',
        ploeg: 'Royal Antwerp FC',
        positie: 'Verdediger',
        rugnummer: 1,
        isActief: true,
        isKapitein: true,
        volgendeMatch: 'Speelt uit tegen Cercle Brugge'
      },
      {
        id: 'bla2',
        naam: 'Jesper Daland',
        ploeg: 'Cercle Brugge',
        positie: 'Verdediger',
        rugnummer: 5,
        isActief: true,
        isKapitein: false,
        volgendeMatch: 'Speelt thuis tegen Antwerp'
      },
      {
        id: 'bla3',
        naam: 'Christian Burgess',
        ploeg: 'Union SG',
        positie: 'Verdediger',
        rugnummer: 5,
        isActief: false,
        isKapitein: false,
        volgendeMatch: 'Speelt uit tegen Charleroi'
      },
      {
        id: 'bla4',
        naam: 'Maxim De Cuyper',
        ploeg: 'Club Brugge',
        positie: 'Verdediger',
        rugnummer: 7,
        isActief: true,
        isKapitein: false,
        volgendeMatch: 'Speelt uit tegen Mechelen'
      },
      {
        id: 'bla5',
        naam: 'Daniel Munoz',
        ploeg: 'Genk',
        positie: 'Verdediger',
        rugnummer: 3,
        isActief: true,
        isKapitein: false,
        volgendeMatch: 'Speelt uit tegen Eupen'
      },
      {
        id: 'bl1',
        naam: 'William Balikwisha',
        ploeg: 'Royal Antwerp FC',
        positie: 'Middenvelder',
        rugnummer: 8,
        isActief: true,
        isKapitein: false,
        volgendeMatch: 'Speelt uit tegen Cercle Brugge'
      },
      {
        id: 'bl2',
        naam: 'Thorgan Hazard',
        ploeg: 'Anderlecht',
        positie: 'Middenvelder',
        rugnummer: 8,
        isActief: true,
        isKapitein: false,
        volgendeMatch: 'Speelt thuis tegen Standard'
      },
      {
        id: 'bl3',
        naam: 'Patrik Hrosovsky',
        ploeg: 'Genk',
        positie: 'Middenvelder',
        rugnummer: 8,
        isActief: true,
        isKapitein: false,
        volgendeMatch: 'Speelt uit tegen Eupen'
      },
      {
        id: 'bl4',
        naam: 'Sven Kums',
        ploeg: 'Gent',
        positie: 'Middenvelder',
        rugnummer: 8,
        isActief: false,
        isKapitein: false,
        volgendeMatch: 'Speelt uit tegen Cercle Brugge'
      },
      {
        id: 'bl5',
        naam: 'Hans Vanaken',
        ploeg: 'Club Brugge',
        positie: 'Middenvelder',
        rugnummer: 8,
        isActief: true,
        isKapitein: false,
        volgendeMatch: 'Speelt uit tegen Mechelen'
      },
      {
        id: 'b1',
        naam: 'Gift Orban',
        ploeg: 'Gent',
        positie: 'Aanvaller',
        isActief: true,
        rugnummer: 8,
        isKapitein: false,
        volgendeMatch: 'Speelt thuis tegen RWDM'
      },
      {
        id: 'b2',
        naam: 'Vincent Janssen',
        ploeg: 'Royal Antwerp FC',
        positie: 'Aanvaller',
        rugnummer: 8,
        isActief: true,
        isKapitein: false,
        volgendeMatch: 'Speelt uit tegen Cercle Brugge'
      },
      {
        id: 'b3',
        naam: 'Noah Ohio',
        ploeg: 'Standard',
        positie: 'Aanvaller',
        rugnummer: 8,
        isActief: false,
        isKapitein: false,
        volgendeMatch: 'Speelt uit tegen Anderlecht'
      },
    ]*/
  }

  initialSetSpelersVoorTransfers() {

    if(this.spelersVoorTransfers.length === 0)
      if (this.spelers.length === 0 ) {
        this.spelersVoorTransfers = this.getPlaceholderSpelers()
      } else {
        this.spelersVoorTransfers = this.spelers
      }
    this.origineleSpelersVoorTransfers = [...this.spelersVoorTransfers];
  }
  voerTransferUit(nieuweSpeler: ISpeler) {

    if(this.geselecteerdeSpelerVoorTransfer?.isKapitein){
      nieuweSpeler.isKapitein = true
    }
    if(this.geselecteerdeSpelerVoorTransfer?.isActief){
      nieuweSpeler.isActief = true
    }

    const index = this.spelersVoorTransfers.findIndex(speler => speler.id === this.geselecteerdeSpelerVoorTransfer?.id);
    if (index !== -1) {
      this.spelersVoorTransfers[index] = nieuweSpeler
    }
  }

  zijnSpelersGewijzigd(): boolean {
    return !this.spelersVoorTransfers.every((speler, index) =>
      speler.id === this.origineleSpelersVoorTransfers[index]?.id)
  }


  getInkomendeSpelersVoorPositie(positie: string | undefined): ISpeler[] {
    if (!positie) {
      console.warn('Geen positie meegegeven')
      return []
    }


    //statement voor test doeleinden, later wegdoen.
    if (positie === 'any') {
      return this.#spelersData.map(this.transformToISpeler.bind(this))

    }

    const positieEngels = this.getEngelsePosities(positie)

    return this.#spelersData.filter(sd => sd.statistics[0].games.position === positieEngels)
      .map(this.transformToISpeler.bind(this))


  }
  heeftPlaceholderSpeler(): boolean {
    return this.spelersVoorTransfers.some(speler => speler.ploeg === 'placeholder');
  }

  get doelmannen(): ISpeler[] {
    return this.spelersVoorTransfers.filter(speler => speler.positie === 'Doelman')
  }

  get verdedigers(): ISpeler[] {
    return this.spelersVoorTransfers.filter(speler => speler.positie === 'Verdediger')
  }

  get middenvelders(): ISpeler[] {
    return this.spelersVoorTransfers.filter(speler => speler.positie === 'Middenvelder')
  }

  get aanvallers(): ISpeler[] {
    return this.spelersVoorTransfers.filter(speler => speler.positie === 'Aanvaller')
  }

  get actieveDoelman(): ISpeler | undefined {
    return this.spelers.find(speler => speler.positie === 'Doelman' && speler.isActief)
  }

  get actieveVerdedigers(): ISpeler[] {
    return this.spelers.filter(speler => speler.positie === 'Verdediger' && speler.isActief)
  }

  get actieveMiddenvelders(): ISpeler[] {
    return this.spelers.filter(speler => speler.positie === 'Middenvelder' && speler.isActief)
  }

  get actieveAanvallers(): ISpeler[] {
    return this.spelers.filter(speler => speler.positie === 'Aanvaller' && speler.isActief)
  }

  get reserveDoelman(): ISpeler | undefined {
    return this.spelers.find(speler => speler.positie === 'Doelman' && !speler.isActief)
  }

  getSpelerForTransfer(id: string): ISpeler | undefined {
    return this.spelersVoorTransfers.find(speler => speler.id === id)

  }

  get reserveSpelers(): ISpeler[] {
    return this.spelers.filter(speler => speler.positie !== 'Doelman' && !speler.isActief)
  }

  selecteerSpelerVoorWissel(speler: ISpeler) {
    this.geselecteerdeSpelerVoorWissel = speler
    this.beschikbareWisselspelers = this.getBeschikbareSpelersOmTeWisselen(speler)

  }

  isSpelerBeschikbaarVoorWissel(speler: ISpeler): boolean {
    return this.beschikbareWisselspelers.includes(speler)
  }

  getBeschikbareSpelersOmTeWisselen(gewisseldeSpeler: ISpeler): ISpeler[] {

    if (!gewisseldeSpeler) {
      console.log('geen speler geselecteerd om te wisselen.')
      return []
    }

    if (gewisseldeSpeler.positie === 'Doelman') {
      const wisselDoelman = gewisseldeSpeler.isActief ? this.reserveDoelman : this.actieveDoelman
      return [wisselDoelman!]
    }
    if (gewisseldeSpeler.isActief) {
      return this.bepaalWisseloptiesVoorActieveVeldspeler(gewisseldeSpeler)
    }

    // Wisselen van reserve veldspelers
    return this.bepaalWisseloptiesVoorReserveVeldspeler(gewisseldeSpeler)
  }

  private bepaalWisseloptiesVoorActieveVeldspeler(speler: ISpeler): ISpeler[] {
    const minAantalVerdedigers = 3
    const minAantalAanvallers = 1

    if (speler.positie === 'Verdediger' && this.actieveVerdedigers.length <= minAantalVerdedigers) {
      return this.reserveSpelers.filter(reserveSpeler => reserveSpeler.positie === 'Verdediger')
    }

    if (speler.positie === 'Aanvaller' && this.actieveAanvallers.length <= minAantalAanvallers) {
      return this.reserveSpelers.filter(reserveSpeler => reserveSpeler.positie === 'Aanvaller')
    }

    return this.reserveSpelers
  }

  private bepaalWisseloptiesVoorReserveVeldspeler(speler: ISpeler): ISpeler[] {
    let wisselopties: ISpeler[] = []
    wisselopties = wisselopties.concat(this.actieveVerdedigers, this.actieveMiddenvelders, this.actieveAanvallers)

    if (speler.positie !== 'Verdediger') {
      wisselopties = wisselopties.filter(actieveSpeler => actieveSpeler.positie !== 'Verdediger' || this.actieveVerdedigers.length > 3)
    }

    if (speler.positie !== 'Aanvaller') {
      wisselopties = wisselopties.filter(actieveSpeler => actieveSpeler.positie !== 'Aanvaller' || this.actieveAanvallers.length > 1)
    }

    return wisselopties
  }


  wisselSpeler(spelerUit: ISpeler, spelerIn: ISpeler) {
    if (!spelerUit || !spelerIn) {
      console.log('Geen spelers geselecteerd')
      return
    }

    if (spelerUit.isKapitein) {
      spelerUit.isKapitein = false
      spelerIn.isKapitein = true
    }

    spelerUit.isActief = !spelerUit.isActief
    spelerIn.isActief = !spelerIn.isActief

  }

  maakKapitein(geselecteerdeSpeler: ISpeler) {
    if (!geselecteerdeSpeler) {
      console.log('Geen speler geselecteerd')
      return
    }

    this.spelers.forEach(speler => speler.isKapitein = false)
    const spelerOmKapiteinTeMaken = this.spelers.find(speler => speler.id === geselecteerdeSpeler.id)
    if (spelerOmKapiteinTeMaken) {
      spelerOmKapiteinTeMaken.isKapitein = true
    }
  }


  public isDataLoaded(): boolean {
    return this.#dataLoaded
  }

  getPlaceholderSpelers() {
    const placeholders: ISpeler[] = []
    const posities = ['Doelman', 'Verdediger', 'Middenvelder', 'Aanvaller']
    const aantallen = [2, 5, 5, 3] // Aantal voor elke positie
    const actieveAantallen = [1, 4, 4, 2]; // Aantal actieve spelers voor elke positie zodat standaard een 442 opstelling wordt gemaakt

    posities.forEach((positie, index) => {
      for (let i = 0; i < aantallen[index]; i++) {
        const isActief = i < actieveAantallen[index]; // Eerste x spelers zijn actief, gebaseerd op actieveAantallen
        const kapiteinBool = `${positie} ${i + 1}` === 'Aanvaller 1'

        placeholders.push({
          id: `ph${i + 1}${index}`,
          naam: `${positie} ${i + 1}`,
          ploeg: 'placeholder',
          logo: 'nee',
          positie: positie,
          isActief: isActief,
          rugnummer: 0,
          isKapitein: kapiteinBool,
          volgendeMatch: ''
        })
      }
    })

    return placeholders
  }

  async loadSpelersData(): Promise<void> {
    if (!this.#dataLoaded) {
      this.#spelersData = await firstValueFrom(this.apiService.getSpelers())
      this.#dataLoaded = true
    }
  }

  getSpelersData(): ISpelerData[] {
    return this.#spelersData
  }

  private transformToISpeler = (spelerData: ISpelerData): ISpeler => {
    const statisticsindex: number = /*spelerData.statistics.length - 1*/ 0
    let ratingsnumber: string | number | null = spelerData.statistics[statisticsindex].games.rating
    if (ratingsnumber !== null) {
      const num = parseFloat(ratingsnumber)
      if (!Number.isInteger(num)) {
        ratingsnumber = parseFloat(num.toFixed(1))
      } else {
        ratingsnumber = num
      }

    } else {
      ratingsnumber = 4
    }


    return {
      // Map properties from ISpelerData to ISpeler
      id: spelerData.player.id.toString(),
      naam: spelerData.player.name,
      voornaam: spelerData.player.firstname,
      achternaam: spelerData.player.lastname,
      ploeg: spelerData.statistics[statisticsindex].team.name,
      ploegId: spelerData.statistics[statisticsindex].team.id,
      positie: this.getNederlandsePosities(spelerData.statistics[statisticsindex].games.position),
      rugnummer: spelerData.statistics[statisticsindex].games.number,
      isActief: false,
      isKapitein: false,
      volgendeMatch: 'nog doen',
      rating: ratingsnumber,
      logo: spelerData.statistics[statisticsindex].team.logo
    }
  }

  getNederlandsePosities(posities: string): string {
    switch (posities) {
      case 'Goalkeeper':
        return 'Doelman'
      case 'Defender':
        return 'Verdediger'
      case 'Midfielder':
        return 'Middenvelder'
      case 'Attacker':
        return 'Aanvaller'
      default:
        return ''
    }
  }

  getEngelsePosities(posities: string): string {
    switch (posities) {
      case 'Doelman':
        return 'Goalkeeper'
      case 'Verdediger':
        return 'Defender'
      case 'Middenvelder':
        return 'Midfielder'
      case 'Aanvaller':
        return 'Attacker'
      default:
        return ''
    }
  }

  createTimestamp():number {
    const nowUtc = new Date(Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      new Date().getUTCHours(),
      new Date().getUTCMinutes(),
      new Date().getUTCSeconds()
    ))
    return nowUtc.getTime()
  }


}
