import { Product } from '../models/product/product';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';
import { SingleResponseModel } from '../models/response/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = []

  url: string = this.api + 'products/'

  constructor(@Inject('api') private api: string, private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Product>> {
    let url = this.url + 'getlist'
    this.httpClient.get<ListResponseModel<Product>>(url).subscribe(res => {
      this.products = res.data
    }, err => {
      console.log('product service getProducts error')
    })
    return this.httpClient.get<ListResponseModel<Product>>(url)
  }

  getProductById(codeGuid: string): Observable<SingleResponseModel<Product>> {
    let url = this.url + 'getById?guid=' + codeGuid
    return this.httpClient.get<SingleResponseModel<Product>>(url)
  }

  productAdd(product: Product): Observable<ResponseModel> {
    let url = this.url + 'add'
    return this.httpClient.post<ResponseModel>(url, product)
  }

  productUpdate(product: Product): Observable<ResponseModel> {
    let url = this.url + 'update'
    return this.httpClient.post<ResponseModel>(url, product)
  }

  productDelete(product: Product): Observable<ResponseModel> {
    let url = this.url + 'delete'
    return this.httpClient.post<ResponseModel>(url, product)
  }


}
