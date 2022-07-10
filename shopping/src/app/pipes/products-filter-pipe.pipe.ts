import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'productsFilterPipe'
})
export class ProductsFilterPipePipe implements PipeTransform {

  transform(products: Product[], searchText: string): Product[] {
    if (searchText == '' || searchText == null || searchText == undefined)
      return products

    let productName = products.filter(x => x.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
    let price = products.filter(x => x.price.toString().includes(searchText))
    let stock = products.filter(x => x.inventoryQuantity.toString().includes(searchText))

    return [...productName, ...price, ...stock]
  }

}
