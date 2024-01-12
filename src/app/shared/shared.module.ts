import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WedstrijdComponent} from './wedstrijd/wedstrijd.component'
import {IonicModule} from '@ionic/angular'
import {RouterModule} from '@angular/router'
import {SpelerComponent} from './speler/speler.component'
import {TransferSpelerComponent} from './speler/transfer-speler/transfer-speler.component'
import {PloegSpelerComponent} from './speler/ploeg-speler/ploeg-speler.component'
import {PuntenSpelerComponent} from './speler/punten-speler/punten-speler.component'
import {TransferSpelerInComponent} from './speler/transfer-speler-in/transfer-speler-in.component'


@NgModule({
  declarations: [WedstrijdComponent, SpelerComponent, TransferSpelerComponent, PuntenSpelerComponent, PloegSpelerComponent, TransferSpelerInComponent],
  exports: [WedstrijdComponent, SpelerComponent, TransferSpelerComponent, PuntenSpelerComponent, PloegSpelerComponent, TransferSpelerInComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule

  ]
})
export class SharedModule { }
