import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WedstrijdComponent} from './wedstrijd/wedstrijd.component'
import {IonicModule} from '@ionic/angular'
import {RouterModule} from '@angular/router'
import {SpelerComponent} from './speler/speler.component'



@NgModule({
  declarations: [WedstrijdComponent, SpelerComponent],
  exports: [WedstrijdComponent, SpelerComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule

  ]
})
export class SharedModule { }
