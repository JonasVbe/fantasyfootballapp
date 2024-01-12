import {Component, inject, Input, OnInit} from '@angular/core'
import {SpelersService} from '../../services/spelers.service'
import {ISpeler} from '../../../models/ISpeler'




@Component({
  selector: 'app-speler',
  templateUrl: './speler.component.html',
  styleUrls: ['./speler.component.scss'],
})
export class SpelerComponent  implements OnInit {

  @Input({required: true}) speler!: ISpeler
  spelersService = inject(SpelersService)

  constructor() { }

  get isBeschikbaarVoorWissel(): boolean {
    return this.spelersService.isSpelerBeschikbaarVoorWissel(this.speler)
  }

  wisselSpeler() {
    if (this.isBeschikbaarVoorWissel && this.spelersService.geselecteerdeSpelerVoorWissel) {
      this.spelersService.wisselSpeler(this.spelersService.geselecteerdeSpelerVoorWissel, this.speler)
      this.spelersService.beschikbareWisselspelers = []
    }
  }

  wisselKnopGeklikt() {
    console.log("wisselknop")
    this.spelersService.selecteerSpelerVoorWissel(this.speler)
  }

   ngOnInit() {


  }

}


