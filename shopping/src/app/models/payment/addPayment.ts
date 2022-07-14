import { Basket } from './../basket/basket';
import { Payment } from "./payment";


export interface AddPayment {
    payment: Payment
    baskets: Basket[]
}