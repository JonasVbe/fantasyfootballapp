import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PloegPage } from './ploeg.page';

const routes: Routes = [
  {
    path: '',
    component: PloegPage
  },
  {
    path: 'speler-transfers/:id',
    loadChildren: () => import('./speler-transfers/speler-transfers.module').then( m => m.SpelerTransfersPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PloegPageRoutingModule {}
