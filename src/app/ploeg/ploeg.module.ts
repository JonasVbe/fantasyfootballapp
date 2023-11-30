import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PloegPageRoutingModule } from './ploeg-routing.module';

import { PloegPage } from './ploeg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PloegPageRoutingModule
  ],
  declarations: [PloegPage]
})
export class PloegPageModule {}
