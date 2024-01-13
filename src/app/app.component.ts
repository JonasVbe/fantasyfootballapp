import {Component, inject, OnInit} from '@angular/core'
import {SpelersService} from './services/spelers.service'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  #spelerService = inject(SpelersService)


  constructor() {
  }

   ngOnInit() {

    //api call
    console.time('DataLoadTime')
    this.#spelerService.loadSpelersData().then(() => {
      console.log('Spelers data loaded')
      console.timeEnd('DataLoadTime')

    }).catch(error => {
      console.error('Error loading spelers data:', error)
    })
  }
}
