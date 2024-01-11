import {Component, inject, OnInit} from '@angular/core'
import {IWedstrijd} from '../../models/IWedstrijd'
import {ISpeler} from '../../models/ISpeler'


import {SpelersService} from '../services/spelers.service'

@Component({
    selector: 'app-ploeg',
    templateUrl: './ploeg.page.html',
    styleUrls: ['./ploeg.page.scss'],
})
export class PloegPage implements OnInit {
    activeTab = 'mijnploeg'

  get tabNaam() {
    return this.spelerService.spelers.length === 0 ? 'Koop Spelers' : 'Transfers';
  }


    spelerService = inject(SpelersService)

    constructor() {}









    ngOnInit() {
      this.setSpelersData()
    }

    setSpelersData(): void {

      //hier nog spelersarray ophalen

      if(this.spelerService.spelers.length === 0){
        this.spelerService.spelersVoorTransfers = this.spelerService.getPlaceholderSpelers()
      }
      else{
        this.spelerService.spelersVoorTransfers = this.spelerService.spelers
      }

    }

}
