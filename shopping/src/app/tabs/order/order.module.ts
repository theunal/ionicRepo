import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { SortOrdersByDatePipePipe } from 'src/app/pipes/sort-orders-by-date-pipe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,

  ],
  declarations: [OrderPage, SortOrdersByDatePipePipe]
})
export class OrderPageModule {}
