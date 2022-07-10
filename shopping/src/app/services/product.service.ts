import { Product } from './../models/product';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = this.api + 'products/'

  constructor(@Inject('api') private api: string, private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {
    let url = this.url + 'getlist'
    return this.httpClient.get<ListResponseModel<Product>>(url)
  }


}
