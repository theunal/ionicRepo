import { Product } from '../models/product/product';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/response/listResponseModel';
import { ResponseModel } from '../models/response/responseModel';

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

  productAdd(product: Product): Observable<ResponseModel> {
    let url = this.url + 'add'
    return this.httpClient.post<ResponseModel>(url, product)
  }

  // getProductById(codeGuid: string): Observable<SingleResponseModel<ProductModel>> {
  //   let url = this.api + 'products/getById?guid=' + codeGuid
  //   return this.httpClient.get<SingleResponseModel<ProductModel>>(url)
  // }
  // productUpdate(product: ProductModel): Observable<ResponseModel> {
  //   let url = this.api + 'products/update'
  //   return this.httpClient.post<ResponseModel>(url, product)
  // }
  // productDelete(product: ProductModel): Observable<ResponseModel> {
  //   let url = this.api + 'products/delete'
  //   return this.httpClient.post<ResponseModel>(url, product)
  // }


}
