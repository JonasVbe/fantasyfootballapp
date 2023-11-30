import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatistiekenPageRoutingModule } from './statistieken-routing.module';

import { StatistiekenPage } from './statistieken.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatistiekenPageRoutingModule
  ],
  declarations: [StatistiekenPage]
})
export class StatistiekenPageModule {}
