import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpelerTransfersPageRoutingModule } from './speler-transfers-routing.module';

import { SpelerTransfersPage } from './speler-transfers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpelerTransfersPageRoutingModule
  ],
  declarations: [SpelerTransfersPage]
})
export class SpelerTransfersPageModule {}
