import { Component, OnInit } from '@angular/core';
import {IWedstrijd} from '../../models/IWedstrijd'

@Component({
  selector: 'app-kalender',
  templateUrl: './kalender.page.html',
  styleUrls: ['./kalender.page.scss'],
})
export class KalenderPage implements OnInit {

  wedstrijden: IWedstrijd[] = []


  constructor() {
    this.wedstrijden = [
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

    ]
  }

  ngOnInit() {
  }

}
