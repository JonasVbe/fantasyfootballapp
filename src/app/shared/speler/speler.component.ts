import {Component, inject, Input, OnInit} from '@angular/core'
import {SpelersService} from '../../services/spelers.service'
import {ISpeler} from '../../../models/ISpeler'
import {IWedstrijd} from '../../../models/IWedstrijd'


@Component({
  selector: 'app-speler',
  templateUrl: './speler.component.html',
  styleUrls: ['./speler.component.scss'],
})
export class SpelerComponent implements OnInit {

  @Input({required: true}) speler!: ISpeler
  @Input({required: true}) wedstrijden!: IWedstrijd[]
  spelersService: SpelersService = inject(SpelersService)
  transferActief: boolean = false

  constructor() {
  }
  get volgendeWedstrijdInfo(): string {
    const wedstrijd = this.wedstrijden.find(w =>
      w.thuisploegId === this.speler.ploegId || w.uitploegId === this.speler.ploegId
    )

    if (!wedstrijd) return 'Geen wedstrijd gevonden'

    const speeltThuis = wedstrijd.thuisploegId === this.speler.ploegId;
    const tegenstander = speeltThuis ? wedstrijd.uitploeg : wedstrijd.thuisploeg

    return speeltThuis ? `Thuis tegen ${tegenstander}` : `Uit tegen ${tegenstander}`
  }
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
    if (!this.transferActief) {
      this.transferActief = true
      this.spelersService.selecteerSpelerVoorWissel(this.speler)
      return
    }
    if (this.transferActief) {
      this.transferActief = false
      this.spelersService.resetSpelersVoorWissel()
      return
    }

  }

  ngOnInit() {


  }

}


