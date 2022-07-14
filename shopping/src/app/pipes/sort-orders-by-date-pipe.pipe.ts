import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../models/order/order';

@Pipe({
  name: 'sortOrdersByDatePipe'
})
export class SortOrdersByDatePipePipe implements PipeTransform {

  dateList: string[] = []

  transform(value: Order[]): string[] {
    value.map(x => {
      let date = x.payment.date.split('.')
      let day = (date[0].length == 1 ? `0${date[0]}.` : `${date[0]}.`) + (date[1].length == 1 ? `0${date[1]}.` : `${date[1]}.`) + (date[2].substring(0, 4))

      !this.dateList.includes(day) ? this.dateList.push(day) : ''
    })
    return this.dateList
  }

}
