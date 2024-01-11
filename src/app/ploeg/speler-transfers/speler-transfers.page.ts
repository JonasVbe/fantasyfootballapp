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
  toonZoekveld: boolean = false;
  geselecteerdeSpelerNaam: string = "";


  constructor() { }


  ngOnInit() {
    this.setSpelerData()
  }

  setSpelerData(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    // No need to continue with the function if no parameter was specified.
    if (id === null) {
      return
    }

    //setlist
    if(this.spelerService.spelers.length === 0){
      this.spelerService.spelersVoorTransfers = this.spelerService.getPlaceholderSpelers()
    }
    else{
      this.spelerService.spelersVoorTransfers = this.spelerService.spelers
    }


    this.id = id

    this.wisselSpeler = this.spelerService.getSpelerForTransfer(this.id)



  }

}
