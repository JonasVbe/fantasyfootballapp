import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'ploeg',
        loadChildren: () => import('../ploeg/ploeg.module').then(m => m.PloegPageModule)
      },
      {
        path: 'kalender',
        loadChildren: () => import('../kalender/kalender.module').then(m => m.KalenderPageModule)
      },
      {
        path: 'statistieken',
        loadChildren: () => import('../statistieken/statistieken.module').then(m => m.StatistiekenPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/ploeg',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/ploeg',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
