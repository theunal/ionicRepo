import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordersDatePipe'
})
export class OrdersDatePipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
