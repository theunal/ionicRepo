import { Observable } from 'rxjs';
import { Basket } from './../models/basket/basket';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
    providedIn: "root"
})
export class BasketService {

    url: string = this.api + 'baskets/'

    constructor(@Inject('api') private api: string, private httpClient: HttpClient) { }

    getBaskets(): Observable<ListResponseModel<Basket>> {
        let url = this.url + 'getlist'
        return this.httpClient.get<ListResponseModel<Basket>>(url)
    }


}