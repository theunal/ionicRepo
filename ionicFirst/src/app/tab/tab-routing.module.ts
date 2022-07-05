import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'detail',
            loadChildren: () => import('./card-detail/card-detail.module').then(m => m.CardDetailPageModule)
          }
        ]
      },
      {
        path: 'speakers',
        loadChildren: () => import('./speakers/speakers.module').then(m => m.SpeakersPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./map/map.module').then(m => m.MapPageModule)
      }
    ]
  },
  {
    path: 'card-detail',
    loadChildren: () => import('./card-detail/card-detail.module').then(m => m.CardDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule { }
