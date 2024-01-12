import {Component, inject, OnInit} from '@angular/core'
import {SpelersService} from './services/spelers.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  spelerService = inject(SpelersService)
  constructor() {}

  ngOnInit() {
    console.time("DataLoadTime")
    this.spelerService.loadSpelersData().then(() => {
      console.log('Spelers data loaded');
      const spelerdata = this.spelerService.getSpelersData()
      console.log(spelerdata.length)
      console.log(spelerdata[0])
      console.log(spelerdata[2])
      console.timeEnd("DataLoadTime");

    }).catch(error => {
      console.error('Error loading spelers data:', error);

    });

  }
}
