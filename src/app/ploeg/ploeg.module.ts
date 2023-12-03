import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PloegPageRoutingModule } from './ploeg-routing.module';

import { PloegPage } from './ploeg.page';
import {SharedModule} from '../shared/shared.module'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PloegPageRoutingModule,
    SharedModule
  ],
  declarations: [PloegPage]
})
export class PloegPageModule {}
