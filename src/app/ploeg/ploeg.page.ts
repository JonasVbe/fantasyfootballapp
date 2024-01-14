import {Component, inject, OnInit} from '@angular/core'
import {IWedstrijd} from '../../models/IWedstrijd'
import {ISpeler} from '../../models/ISpeler'
import {SpelersService} from '../services/spelers.service'
import {GebruikerService} from '../services/gebruiker.service'
import {FirestoreService} from '../services/firestore.service'
import {Subscription} from 'rxjs'
import {IGebruiker} from '../../models/IGebruiker'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../services/auth.service'
import {ITeamSelectie} from '../../models/ITeamSelectie'
import {ApiFootballService} from '../services/api-football.service'
import {WedstrijdenService} from '../services/wedstrijden.service'

@Component({
  selector: 'app-ploeg',
  templateUrl: './ploeg.page.html',
  styleUrls: ['./ploeg.page.scss'],
})
export class PloegPage {
  #gebruikerService: GebruikerService = inject(GebruikerService)
  #apiFootballService = inject(ApiFootballService)
  #wedstrijdService = inject(WedstrijdenService)
  #gebruikerSub: Subscription | null = null
  #WedstrijdSub: Subscription | null = null
  #spelerInfoGewijzigdSub: Subscription | null = null
  spelerInfoIsGewijzigd: boolean = false
  gebruiker: IGebruiker | null = null
  activeTab: string = 'mijnploeg'
  spelerService: SpelersService = inject(SpelersService)
  ploegnaamForm: FormGroup = new FormGroup({})
  wedstrijdenVanSpeeldag: IWedstrijd[] = []


  #firestoreService: FirestoreService = inject(FirestoreService)
  #AuthService: AuthService = inject(AuthService)


  get tabNaam() {
    return this.spelerService.spelers.length === 0 ? 'Koop Spelers' : 'Transfers'
  }


  constructor() {
  }

  annuleerWijzigingen() {
    // Zet de spelersVoorTransfers terug naar de originele staat
    console.log(this.spelerService.spelersVoorTransfers)
    console.log(this.spelerService.origineleSpelersVoorTransfers)
    this.spelerService.spelersVoorTransfers = [...this.spelerService.origineleSpelersVoorTransfers]
  }

  async slaWijzigingenOp() {
    // Update de originele staat naar de huidige staat
    this.spelerService.origineleSpelersVoorTransfers = [...this.spelerService.spelersVoorTransfers]
    // Update het huidige team naar de huidige staat
    this.spelerService.spelers = [...this.spelerService.spelersVoorTransfers]
    const utcTimestamp = this.spelerService.createTimestamp()
    const speeldag: ITeamSelectie = {
      timestampTransfer: utcTimestamp,
      timestampChange: utcTimestamp,
      spelers: [...this.spelerService.spelers]
    }
    this.gebruiker?.ploeg.teamSelecties.push(speeldag)
    await this.#firestoreService.updateGebruikerZonderControle(this.gebruiker!)
  }

  bevestigPloegwijziging() {
    if (this.gebruiker) {
      const utcTimestampTransfer = this.gebruiker?.ploeg.teamSelecties[this.gebruiker.ploeg.teamSelecties.length - 1].timestampTransfer
      const utcTimestamp = this.spelerService.createTimestamp()
      const speeldag: ITeamSelectie = {
        timestampTransfer: utcTimestampTransfer,
        timestampChange: utcTimestamp,
        spelers: [...this.spelerService.spelers]
      }
      this.gebruiker?.ploeg.teamSelecties.push(speeldag)
    }

    this.#firestoreService.updateGebruikerZonderControle(this.gebruiker!).then(() => {
      console.log('gebruiker geupdate')
      this.spelerService.resetSpelerInfoGewijzigd()
    })
  }

  laadWedstrijden(speeldag: number): void {
    this.#WedstrijdSub = this.#apiFootballService.haalWedstrijdenOp(speeldag).subscribe({
      next: (data) => {
        this.wedstrijdenVanSpeeldag = data
      },
      error: (error) => {
        console.error('Fout bij het laden van wedstrijden van speeldag in ploegpage', error)
      }
    })
  }


  ionViewWillEnter() {
    console.log('ionViewWillEnter ploeg')

    this.setSpelersData().then(() => {
      console.log('spelersdata set')
    })
    this.ploegnaamForm = new FormGroup({
      ploegnaam: new FormControl('', Validators.required)
    })

    if (this.gebruiker && this.gebruiker.ploeg) {
      this.ploegnaamForm.patchValue({
        ploegnaam: this.gebruiker.ploeg.naam
      })
    }
    this.#spelerInfoGewijzigdSub = this.spelerService.spelerInfoGewijzigd.subscribe((isGewijzigd) => {
      this.spelerInfoIsGewijzigd = isGewijzigd
    })

    this.laadWedstrijden(this.#wedstrijdService.huidigeSpeeldag)

  }

  async setSpelersData(): Promise<void> {
    let data: IGebruiker | null = null
    this.#gebruikerSub = this.#gebruikerService.gebruiker.subscribe(
      (gebruikerData: IGebruiker | null) => {
        data = gebruikerData
        this.gebruiker = data
      }
    )
    if (this.gebruiker == null) {
      await this.#firestoreService.haalGebruikerOp(this.#AuthService.getUserUID()!)
      this.gebruiker = data
    }

    if (this.gebruiker !== null && this.gebruiker.ploeg.teamSelecties.length > 0) {
      this.spelerService.spelers = this.gebruiker.ploeg.teamSelecties[this.gebruiker.ploeg.teamSelecties.length - 1].spelers
    }


    this.spelerService.initialSetSpelersVoorTransfers()


  }

  updatePloegnaam() {
    if (this.ploegnaamForm.valid) {
      if (this.ploegnaamForm.get('ploegnaam')?.value !== this.gebruiker?.ploeg?.naam && this.ploegnaamForm.get('ploegnaam') !== null) {

        // @ts-ignore
        const nieuwePloegnaam = this.ploegnaamForm.get('ploegnaam').value

        // Update ploegnaam in de gebruiker en database
        if (this.gebruiker && this.gebruiker.ploeg) {
          this.gebruiker.ploeg.naam = nieuwePloegnaam
          this.#firestoreService.updateGebruikerZonderControle(this.gebruiker)
            .then(() => console.log('Ploegnaam bijgewerkt volgens then'))
            .catch(error => console.error('Fout bij het bijwerken van de ploegnaam:', error))
        }
      }
    }
  }


  ionViewDidLeave() {
    if (this.#gebruikerSub) {
      this.#gebruikerSub.unsubscribe()
    }
    if (this.#spelerInfoGewijzigdSub) {
      this.#spelerInfoGewijzigdSub.unsubscribe()
    }

    if(this.#gebruikerSub){
      this.#gebruikerSub.unsubscribe()
    }

  }


}
