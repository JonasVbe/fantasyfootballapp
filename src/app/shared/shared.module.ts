import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WedstrijdComponent} from './wedstrijd/wedstrijd.component'
import {IonicModule} from '@ionic/angular'
import {RouterModule} from '@angular/router'



@NgModule({
  declarations: [WedstrijdComponent],
  exports: [WedstrijdComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule

  ]
})
export class SharedModule { }
