import { Injectable } from '@angular/core'
import {ISpeler} from '../../models/ISpeler'


@Injectable({
  providedIn: 'root'
})
export class SpelersService {

  spelers: ISpeler[] = []
  geselecteerdeSpelerVoorWissel: ISpeler | null = null
  beschikbareWisselspelers: ISpeler[] = []

  constructor() {
    this.spelers = [
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
    ]
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

    if(!gewisseldeSpeler) {
      console.log('geen speler geselecteerd om te wisselen.')
      return []
    }

    if(gewisseldeSpeler.positie === 'Doelman') {
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




  wisselSpeler(spelerUit:ISpeler, spelerIn: ISpeler){
    if(!spelerUit || !spelerIn){
      console.log('Geen spelers geselecteerd')
      return
    }

    if(spelerUit.isKapitein){
      spelerUit.isKapitein = false
      spelerIn.isKapitein = true
    }

    spelerUit.isActief = !spelerUit.isActief
    spelerIn.isActief = !spelerIn.isActief

  }

  maakKapitein(geselecteerdeSpeler: ISpeler) {
    if(!geselecteerdeSpeler){
      console.log('Geen speler geselecteerd')
      return
    }

    this.spelers.forEach(speler => speler.isKapitein = false)
    const spelerOmKapiteinTeMaken = this.spelers.find(speler => speler.id === geselecteerdeSpeler.id)
    if (spelerOmKapiteinTeMaken) {
      spelerOmKapiteinTeMaken.isKapitein = true
    }
  }

  setLogo(){
    this.spelers.forEach(speler => {
      if (!speler.logo) {
        speler.logo = this.getLogoNaam(speler.ploeg)
      }

    })
  }

  getLogoNaam(ploeg: string): string {
    switch (ploeg) {
      case 'Anderlecht':
        return 'anderlecht.png'
      case 'Royal Antwerp FC':
        return 'antwerp.png'
      case 'Charleroi':
        return 'charleroi.png'
      case 'Club Brugge':
        return 'club.png'
      case 'Cercle Brugge':
        return 'cercle.png'
      case 'Eupen':
        return 'eupen.png'
      case 'Genk':
        return 'genk.png'
      case 'Gent':
        return 'gent.png'
      case 'Mechelen':
        return 'mechelen.png'
      case 'OH Leuven':
        return 'ohleuven.png'
      case 'Oostende':
        return 'oostende.png'
      case 'Standard':
        return 'standard.png'
      case 'STVV':
        return 'stvv.png'
      case 'Union SG':
        return 'union.png'
      case 'Waregem':
        return 'waregem.png'
      default:
        return ''
    }
  }



}
