import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order/order';

@Pipe({
  name: 'ordersDatePipe'
})
export class OrdersDatePipePipe implements PipeTransform {

  transform(value: Order[]): Order[] {

    let orders: Order[] = []

    value.map(x => {
      let date = x.payment.date.split('.')
      let day = (date[0].length == 1 ? `0${date[0]}.` : `${date[0]}.`) + (date[1].length == 1 ? `0${date[1]}.` : `${date[1]}.`) + (date[2].substring(0, 4))

      x.payment.date = day
      orders.push(x)
    })

    return orders
  }

}
