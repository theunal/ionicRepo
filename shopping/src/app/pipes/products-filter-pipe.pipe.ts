import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product/product';

@Pipe({
  name: 'productsFilterPipe'
})
export class ProductsFilterPipePipe implements PipeTransform {

  transform(products: any[], searchText: string): Product[] {
    if (searchText == '' || searchText == null || searchText == undefined)
      return products


    return products.filter(x => {
      let productName = x.name.toLocaleLowerCase().toString().includes(searchText.toLocaleLowerCase())
      let price = x.price.toString().toLocaleLowerCase().toString().includes(searchText.toLocaleLowerCase())
      let stock = x.inventoryQuantity.toString().toLocaleLowerCase().toString().includes(searchText.toLocaleLowerCase())

      return (productName + price + stock)
    })

  }

}
