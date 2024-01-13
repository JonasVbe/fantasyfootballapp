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
import {ISpeeldag} from '../../models/ISpeeldag'

@Component({
  selector: 'app-ploeg',
  templateUrl: './ploeg.page.html',
  styleUrls: ['./ploeg.page.scss'],
})
export class PloegPage implements OnInit {
  #gebruikerService = inject(GebruikerService)
  #gebruikerSub: Subscription | null = null
  gebruiker: IGebruiker | null = null
  activeTab = 'mijnploeg'
  spelerService = inject(SpelersService)
  ploegnaamForm: FormGroup = new FormGroup({})

  #firestoreService = inject(FirestoreService)
  #AuthService = inject(AuthService)

  get tabNaam() {
    return this.spelerService.spelers.length === 0 ? 'Koop Spelers' : 'Transfers'
  }


  constructor() {
  }

  annuleerWijzigingen() {
    // Zet de spelersVoorTransfers terug naar de originele staat
    this.spelerService.spelersVoorTransfers = [...this.spelerService.origineleSpelersVoorTransfers]
  }

  async slaWijzigingenOp() {
    // Update de originele staat naar de huidige staat
    this.spelerService.origineleSpelersVoorTransfers = [...this.spelerService.spelersVoorTransfers]
    // Update het huidige team naar de huidige staat
    this.spelerService.spelers = [...this.spelerService.spelersVoorTransfers]
    const utcTimestamp = this.spelerService.createTimestamp()
    const speeldag: ISpeeldag = {
      timestamp: utcTimestamp,
      spelers: [...this.spelerService.spelers]
    }
    this.gebruiker?.ploeg.speeldagen.push(speeldag)
   await this.#firestoreService.updateGebruikerZonderControle(this.gebruiker!)



  }

  ngOnInit() {
    console.log('ngOnInit ploeg')

  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter ploeg')

    this.setSpelersData().then(() => {console.log('spelersdata set')})
    this.ploegnaamForm = new FormGroup({
      ploegnaam: new FormControl('', Validators.required)
    })

    if (this.gebruiker && this.gebruiker.ploeg) {
      this.ploegnaamForm.patchValue({
        ploegnaam: this.gebruiker.ploeg.naam
      })
    }
    this.spelerService.initialSetSpelersVoorTransfers()
  }

  async setSpelersData(): Promise<void> {
    let data: IGebruiker | null = null
    this.#gebruikerSub = this.#gebruikerService.gebruiker.subscribe(
      (gebruikerData: IGebruiker | null) => {
        data = gebruikerData
        this.gebruiker = data
      }
    )
    if(this.gebruiker == null){
      await this.#firestoreService.haalGebruikerOp(this.#AuthService.getUserUID()!)
      this.gebruiker = data
    }

    if (this.gebruiker !== null && this.gebruiker.ploeg.speeldagen.length > 0) {
      this.spelerService.spelers = this.gebruiker.ploeg.speeldagen[this.gebruiker.ploeg.speeldagen.length - 1].spelers
    }






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
  }

}
