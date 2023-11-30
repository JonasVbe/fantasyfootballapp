import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatistiekenPage } from './statistieken.page';

const routes: Routes = [
  {
    path: '',
    component: StatistiekenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatistiekenPageRoutingModule {}
