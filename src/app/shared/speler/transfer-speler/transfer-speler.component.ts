import {Component, inject, Input, OnInit} from '@angular/core'
import {ISpeler} from '../../../../models/ISpeler'
import {SpelersService} from '../../../services/spelers.service'

@Component({
  selector: 'app-transfer-speler',
  templateUrl: './transfer-speler.component.html',
  styleUrls: ['./transfer-speler.component.scss'],
})
export class TransferSpelerComponent  implements OnInit {
  @Input({required: true}) speler!: ISpeler
  spelersService = inject(SpelersService)
  constructor() { }



  ngOnInit() {}

}
