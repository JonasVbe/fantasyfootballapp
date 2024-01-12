import {Component, inject, Input, OnInit} from '@angular/core'
import {ISpeler} from '../../../../models/ISpeler'
import {SpelersService} from '../../../services/spelers.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-transfer-speler-in',
  templateUrl: './transfer-speler-in.component.html',
  styleUrls: ['./transfer-speler-in.component.scss'],
})
export class TransferSpelerInComponent  implements OnInit {
  @Input({required: true}) speler!: ISpeler
  spelersService = inject(SpelersService)
  router = inject(Router)

  constructor() { }


  transferSpelerIn() {
// Stel dat nieuweSpeler de speler is die je wilt toevoegen aan spelersVoorTransfers
  let nieuweSpeler = this.speler
  this.spelersService.voerTransferUit(nieuweSpeler);


    this.router.navigate(['/tabs/ploeg'])
  }
  isTransferDisabled(speler: ISpeler): boolean {
    const ploegCount = this.spelersService.spelersVoorTransfers.filter(s => s.ploeg === speler.ploeg).length;
    return ploegCount >= 3;
  }

  ngOnInit() {}

}
