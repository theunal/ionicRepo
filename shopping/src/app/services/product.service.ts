import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = []

  url: string = this.api + 'products/'

  constructor(@Inject('api') private api: string, private httpClient: HttpClient) { }

  // getProducts(): Observable<ListResponseModel<Product>> {
  //   let url = this.url + 'getlist'
  //   return this.httpClient.get<ListResponseModel<Product>>(url)
  // }

  getProducts(): Observable<ListResponseModel<Product>> {
    let url = this.url + 'getlist'
    this.httpClient.get<ListResponseModel<Product>>(url).subscribe(res => {
      this.products = res.data
    }, err => {
      console.log('product service getProducts error')
    })
    return this.httpClient.get<ListResponseModel<Product>>(url)
  }


}
