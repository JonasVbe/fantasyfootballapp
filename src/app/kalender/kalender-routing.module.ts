import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KalenderPage } from './kalender.page';

const routes: Routes = [
  {
    path: '',
    component: KalenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KalenderPageRoutingModule {}
