import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AddPayment } from '../models/payment/addPayment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url: string = this.api + 'Orders/'

  constructor(@Inject('api') private api: string, private httpClient: HttpClient) { }

  payment(payment: AddPayment) {
    let url = this.url + 'addPayment'
    return this.httpClient.post(url, payment)
  }
}
