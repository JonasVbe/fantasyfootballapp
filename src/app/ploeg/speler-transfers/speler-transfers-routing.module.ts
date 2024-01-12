import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpelerTransfersPage } from './speler-transfers.page';

const routes: Routes = [
  {
    path: '',
    component: SpelerTransfersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpelerTransfersPageRoutingModule {}
