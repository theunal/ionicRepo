import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ErrorServiceService } from './errorService/error-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: Product[]

  searchText : string = ''

  constructor(private productService: ProductService, private errorService: ErrorServiceService) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res.data
    }, (err: any) => {
      this.errorService.presentToastWithOptions(err)
    })
  }

  productTitle(name: string) { //product card daki ürün adı ilk 35 karakterden olusuyor ve son kelimenin tamamı alındı
    let text = name.substring(0, 35)
    let newArray = text.split(' ').filter(x => !x.includes(text.split(' ')[text.split(' ').length - 1]))
    newArray.push(name.split(' ')[text.split(' ').length - 1])
    let result = ''
    newArray.map(item => result += item + ' ')
    result.trim()
    return result
  }

}
