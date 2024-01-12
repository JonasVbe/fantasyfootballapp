import {Component, inject, OnInit} from '@angular/core'
import {NavController} from '@ionic/angular'
import {SpelersService} from '../../services/spelers.service'
import {ActivatedRoute} from '@angular/router'
import {ISpeler} from '../../../models/ISpeler'

@Component({
  selector: 'app-speler-transfers',
  templateUrl: './speler-transfers.page.html',
  styleUrls: ['./speler-transfers.page.scss'],
})
export class SpelerTransfersPage implements OnInit {

  navController = inject(NavController)
  spelerService = inject(SpelersService)
  activatedRoute = inject(ActivatedRoute)

  id?: string = undefined
  wisselSpeler: ISpeler | undefined = undefined
  toonZoekveld: boolean = false
  positieLabel: string  = "foutje"


  inkomendeSpelers: ISpeler[] = [];


  constructor() { }


  ngOnInit() {
    this.setSpelerData()
  }

   setSpelerData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id === null) {
      return
    }

    this.id = id

    this.wisselSpeler = this.spelerService.getSpelerForTransfer(this.id)
    this.positieLabel = this.getPositieLabel()

    this.inkomendeSpelers =  this.spelerService.getInkomendeSpelersVoorPositie(this.wisselSpeler?.positie)
     console.log(this.inkomendeSpelers)


  }

  getPositieLabel(): string {

      switch (this.wisselSpeler?.positie) {
         case "Doelman":
            return "Doelmannen"
          case "Verdediger":
            return "Verdedigers"
          case "Middenvelder":
            return "Middenvelders"
          case "Aanvaller":
            return "Aanvallers"
          default:
            return "Foutje"
    }
  }

}
