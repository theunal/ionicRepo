import { Platform } from '@ionic/angular';
import { Order } from './../../models/order/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { SortOrdersByDatePipePipe } from 'src/app/pipes/sort-orders-by-date-pipe.pipe';
import { OrdersDatePipePipe } from 'src/app/pipes/orders-date-pipe.pipe';
import { OrderDateButtonCollapseModel } from 'src/app/models/order/orderDateButtonCollapseModel';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orders: Order[] = []

  sortedDates: OrderDateButtonCollapseModel[] = []
  orderDate: Order[] = []

  constructor(private orderService: OrderService, private toast: ToastService, private platform: Platform) { }

  platformDetect() {
    return this.platform.is('ios') ? 'ios' : 'other'
  }

  doRefresh(event: any) {
    this.getOrders()
    setTimeout(() => {
      event.target.complete()
    }, 100)
  }

  ngOnInit() {
    this.getOrders()
  }

  getOrders() {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res.data
      this.sortedDates = new SortOrdersByDatePipePipe().transform(res.data)
      this.orderDate = new OrdersDatePipePipe().transform(this.orders)
    }, err => {
      console.log('order page get orders error')
    })
  }

  getOrdersByDate(date: string) {
    return this.orderDate.filter(x => x.payment.date == date)
  }

  showProductName(productName: string) {
    this.toast.presentToastWithOptions(productName, 'tertiary')
  }
}
