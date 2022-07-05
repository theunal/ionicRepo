import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab1DetailPage } from './tab1-detail.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1DetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1DetailPageRoutingModule {}
