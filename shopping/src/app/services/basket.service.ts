import { Observable } from 'rxjs';
import { Basket } from './../models/basket/basket';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { BasketAddUpdateDeleteDto } from '../models/basket/basketAddUpdateDeleteDto';


@Injectable({
    providedIn: "root"
})
export class BasketService {

    url: string = this.api + 'baskets/'

    baskets: Basket[] = []
    total: number = 0


    constructor(@Inject('api') private api: string, private httpClient: HttpClient) { }

    // getBaskets(): Observable<ListResponseModel<Basket>> {
    //     let url = this.url + 'getlist'
    //     return this.httpClient.get<ListResponseModel<Basket>>(url)
    // }

    getBaskets() {
        let url = this.url + 'getlist'
        this.httpClient.get<ListResponseModel<Basket>>(url).subscribe(res => {
            this.baskets = res.data
        })
    }

    add(basket: BasketAddUpdateDeleteDto): Observable<ResponseModel> {
        let url = this.url + 'add'
        return this.httpClient.post<ResponseModel>(url, basket)
    }

    update(basket: BasketAddUpdateDeleteDto): Observable<ResponseModel> {
        let url = this.url + 'update'
        return this.httpClient.post<ResponseModel>(url, basket)
    }

    totalPrice() {
        this.total = 0
        this.baskets.forEach(element => {
            this.total += element.product.price * element.quantity
        })
        return this.total
    }

}