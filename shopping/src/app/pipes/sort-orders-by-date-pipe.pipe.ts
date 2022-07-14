import { OrderDateButtonCollapseModel } from 'src/app/models/order/orderDateButtonCollapseModel';
import { Pipe, PipeTransform } from '@angular/core';
import { Guid } from 'js-guid';
import { Order } from '../models/order/order';

@Pipe({
  name: 'sortOrdersByDatePipe'
})
export class SortOrdersByDatePipePipe implements PipeTransform {

  orderDatesModel: OrderDateButtonCollapseModel[] = []

  transform(value: Order[]): OrderDateButtonCollapseModel[] {

    value.map(x => {
      let date = x.payment.date.split('.')
      let day = (date[0].length == 1 ? `0${date[0]}.` : `${date[0]}.`) + (date[1].length == 1 ? `0${date[1]}.` : `${date[1]}.`) + (date[2].substring(0, 4))

      let model: OrderDateButtonCollapseModel = {
        date: day,
        id: '_' + Guid.newGuid().toString()
      }
      this.orderDatesModel.find(x => x.date == day) == null ? this.orderDatesModel.push(model) : ''
    })

    return this.orderDatesModel
  }


}
