import { Order } from './../../models/order/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { SortOrdersByDatePipePipe } from 'src/app/pipes/sort-orders-by-date-pipe.pipe';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orders: Order[] = []

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders()

  }

  getOrders() {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res.data
      this.createDateButton(res.data)
    }, err => {
      console.log('order page get orders error')
    })
  }



  createDateButton(orders: Order[]) {
    let mainView = document.getElementById('mainView')
    let orderPipe = new SortOrdersByDatePipePipe()
    var result = orderPipe.transform(orders)

    for (let date of result) {
      let guid: string = '_' + Guid.newGuid().toString()
      var contentView = document.createElement('div')

      var button = document.createElement('ion-button')
      button.setAttribute('color', 'light')
      button.setAttribute('expand', 'block')
      button.setAttribute('data-bs-toggle', 'collapse')
      button.setAttribute('data-bs-target', `#${guid}`)
      button.classList.add('mt-3')
      button.style.width = '90%'
      button.style.margin = 'auto'
      button.innerHTML = date
      contentView.classList.add('mb-3')
      contentView.appendChild(button)

      var collapse = document.createElement('div')
      collapse.classList.add('collapse')
      collapse.id = guid
      collapse.innerHTML = ''
      contentView.appendChild(collapse)

      mainView.appendChild(contentView)


      orders.map(x => {
        if (x.payment.date.includes(date)) {
          console.log(date)
        }
      })
      
      console.log(date)

    }
  }



}
