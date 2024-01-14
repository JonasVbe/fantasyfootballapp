import {Component, inject, OnInit} from '@angular/core'
import {WedstrijdenService} from '../services/wedstrijden.service'
import {IWedstrijd} from '../../models/IWedstrijd'
import {ApiFootballService} from '../services/api-football.service'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-kalender',
  templateUrl: './kalender.page.html',
  styleUrls: ['./kalender.page.scss'],
})
export class KalenderPage implements OnInit {

  #wedstrijdenService = inject(WedstrijdenService)
  #apiFootballService = inject(ApiFootballService)
  #WedstrijdSub: Subscription | null = null
  wedstrijden: IWedstrijd[] = []
  isLoading = true
  huidigeSpeeldag:number = 0

  constructor() {
   /* this.wedstrijden = [
      {
        id: '1',
        thuisploeg: 'Westerlo',
        uitploeg: 'Anderlecht',
        thuisscore: 2,
        uitScore: 1,
        finished: true,
        datum: '2023-01-12',
        uur: '20:45'
      },
      {
        id: '2',
        thuisploeg: 'RWDM',
        uitploeg: 'Charleroi',
        thuisscore: 0,
        uitScore: 0,
        finished: false,
        datum: '2023-02-12',
        uur: '16:00'
      },
      {
        id: '3',
        thuisploeg: 'Eupen',
        uitploeg: 'Kortrijk',
        thuisscore: 0,
        uitScore: 0,
        finished: false,
        datum: '2023-02-12',
        uur: '18:15'
      },
      {
        id: '4',
        thuisploeg: 'Antwerp',
        uitploeg: 'OH Leuven',
        thuisscore: 0,
        uitScore: 0,
        finished: false,
        datum: '2023-02-12',
        uur: '20:45'
      },
      {
        id: '5',
        thuisploeg: 'Genk',
        uitploeg: 'Gent',
        thuisscore: 0,
        uitScore: 0,
        finished: false,
        datum: '2023-03-12',
        uur: '13:30'
      },
      {
        id: '6',
        thuisploeg: 'Mechelen',
        uitploeg: 'STVV',
        thuisscore: 0,
        uitScore: 0,
        finished: false,
        datum: '2023-03-12',
        uur: '16:00'
      },
      {
        id: '7',
        thuisploeg: 'Club Brugge',
        uitploeg: 'Standard',
        thuisscore: 0,
        uitScore: 0,
        finished: false,
        datum: '2023-03-12',
        uur: '18:30'
      },
      {
        id: '8',
        thuisploeg: 'Union SG',
        uitploeg: 'Cercle Brugge',
        thuisscore: 0,
        uitScore: 0,
        finished: false,
        datum: '2023-03-12',
        uur: '19:15'
      },

    ]*/
  }
  veranderSpeeldag(richting: number): void {

    this.huidigeSpeeldag += richting

    // Controleer grenzen
    if (this.huidigeSpeeldag < 1) {
      this.huidigeSpeeldag = 1
    } else if (this.huidigeSpeeldag > this.#wedstrijdenService.speeldagen.length) {
      this.huidigeSpeeldag = this.#wedstrijdenService.speeldagen.length
    }

    this.laadWedstrijden(this.huidigeSpeeldag)
  }


  ngOnInit() {
    this.huidigeSpeeldag = this.#wedstrijdenService.huidigeSpeeldag
    this.laadWedstrijden(this.huidigeSpeeldag)
  }
  ionViewWillEnter(){
    this.huidigeSpeeldag = this.#wedstrijdenService.huidigeSpeeldag
    this.laadWedstrijden(this.huidigeSpeeldag)
  }
  ionViewDidLeave(){
    this.isLoading = true
    if (this.#WedstrijdSub) {
      this.#WedstrijdSub.unsubscribe()
    }
  }

  laadWedstrijden(speeldag: number): void {
    // Unsubscribe van de vorige subscription indien deze bestaat
    if (this.#WedstrijdSub) {
      this.#WedstrijdSub.unsubscribe()
    }

    this.isLoading = true;
    this.#WedstrijdSub = this.#apiFootballService.haalWedstrijdenOp(speeldag).subscribe({
      next: (data) => {
        this.wedstrijden = data
        this.isLoading = false
      },
      error: (error) => {
        console.error('Fout bij het laden van wedstrijden', error)
        this.isLoading = false;
      }
    })
  }




}
