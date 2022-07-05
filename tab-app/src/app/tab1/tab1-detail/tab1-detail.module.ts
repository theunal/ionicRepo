import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1DetailPageRoutingModule } from './tab1-detail-routing.module';

import { Tab1DetailPage } from './tab1-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab1DetailPageRoutingModule
  ],
  declarations: [Tab1DetailPage]
})
export class Tab1DetailPageModule {}
