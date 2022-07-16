import { Observable } from 'rxjs';
import { Order } from './../models/order/order';
import { ListResponseModel } from '../models/response/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})
export class OrderService {

    url: string = this.api + 'Orders/'

    constructor(@Inject('api') private api: string, private httpClient: HttpClient) { }

    getOrders(): Observable<ListResponseModel<Order>> {
        let url = this.url + 'getList'
        return this.httpClient.get<ListResponseModel<Order>>(url)
    }

}