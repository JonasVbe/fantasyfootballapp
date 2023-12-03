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



  ngOnInit() {

    this.spelersService.setLogo()
  }

}


