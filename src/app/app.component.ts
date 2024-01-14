import {Component, inject, OnInit} from '@angular/core'
import {SpelersService} from './services/spelers.service'
import {WedstrijdenService} from './services/wedstrijden.service'
import {ApiFootballService} from './services/api-football.service'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  #spelerService = inject(SpelersService)
  #wedstrijdenService = inject(WedstrijdenService)
  #apiFootballService = inject(ApiFootballService)


  constructor() {
  }

   async ngOnInit() {

    //api call
    console.time('DataLoadTime')
    this.#spelerService.loadSpelersData().then(() => {
      console.log('Spelers data loaded')
      console.timeEnd('DataLoadTime')

    }).catch(error => {
      console.error('Error loading spelers data:', error)
    })

     this.#wedstrijdenService.huidigeSpeeldag = await this.#apiFootballService.haalSpeeldagNummerOp()
     console.log(this.#wedstrijdenService.huidigeSpeeldag)

  }
}
