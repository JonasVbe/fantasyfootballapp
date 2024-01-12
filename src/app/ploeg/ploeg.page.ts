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
    return this.spelerService.spelers.length === 0 ? 'Koop Spelers' : 'Transfers'
  }


  spelerService = inject(SpelersService)

  constructor() {
  }

  annuleerWijzigingen() {
    // Zet de spelersVoorTransfers terug naar de originele staat
    this.spelerService.spelersVoorTransfers = [...this.spelerService.origineleSpelersVoorTransfers]
  }

  slaWijzigingenOp() {
    // Update de originele staat naar de huidige staat
    this.spelerService.origineleSpelersVoorTransfers = [...this.spelerService.spelersVoorTransfers]
    // Update het huidige team naar de huidige staat
    this.spelerService.spelers = [...this.spelerService.spelersVoorTransfers]

  }


  ngOnInit() {
    this.setSpelersData()
  }

  setSpelersData(): void {

    //hier nog spelersarray ophalen
    this.spelerService.initialSetSpelersVoorTransfers()

  }

}
